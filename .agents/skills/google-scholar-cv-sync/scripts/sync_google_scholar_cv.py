#!/usr/bin/env python3
"""Sync Google Scholar citation counts into src/data/cv/content.ts.

Default behavior is dry-run. Pass --apply to write updates.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Iterable


USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0.0.0 Safari/537.36"
)


@dataclass
class ScholarEntry:
    title: str
    authors: str
    venue: str
    year: int | None
    citations: int
    scholar_url: str | None
    paper_url: str | None


@dataclass
class PublicationBlock:
    start: int
    end: int
    text: str
    title: str
    citation_count: int | None
    paper_url: str | None
    scholar_citation_url: str | None


def normalize_title(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def strip_tags(value: str) -> str:
    value = re.sub(r"<[^>]+>", "", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def fetch_scholar_page(user_id: str, cstart: int, pagesize: int, timeout: int) -> str:
    params = urllib.parse.urlencode(
        {
            "user": user_id,
            "hl": "en",
            "cstart": cstart,
            "pagesize": pagesize,
            "view_op": "list_works",
            "sortby": "pubdate",
        }
    )
    url = f"https://scholar.google.com/citations?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:  # nosec B310
        return resp.read().decode("utf-8", errors="replace")


def parse_scholar_rows(page_html: str) -> list[ScholarEntry]:
    row_pattern = re.compile(r"<tr class=\"gsc_a_tr\".*?</tr>", re.S)
    title_pattern = re.compile(r'(<a[^>]*class=\"gsc_a_at\"[^>]*>)(.*?)</a>', re.S)
    gray_pattern = re.compile(r'<div[^>]*class=\"gs_gray\"[^>]*>(.*?)</div>', re.S)
    year_pattern = re.compile(r'<span[^>]*class=\"gsc_a_h gsc_a_hc gs_ibl\"[^>]*>(\d{4})</span>')
    cit_pattern = re.compile(r'<a[^>]*class=\"gsc_a_ac[^\"]*\"[^>]*>(\d+)?</a>')

    rows: list[ScholarEntry] = []
    for row in row_pattern.findall(page_html):
        title_match = title_pattern.search(row)
        if not title_match:
            continue

        anchor_tag = title_match.group(1)
        title = strip_tags(title_match.group(2))
        href_match = re.search(r'href=\"([^\"]+)\"', anchor_tag)
        scholar_url = None
        if href_match:
            scholar_url = html.unescape(urllib.parse.urljoin("https://scholar.google.com", href_match.group(1)))
        gray = gray_pattern.findall(row)
        authors = strip_tags(gray[0]) if len(gray) > 0 else ""
        venue = strip_tags(gray[1]) if len(gray) > 1 else ""

        year_match = year_pattern.search(row)
        year = int(year_match.group(1)) if year_match else None

        cit_match = cit_pattern.search(row)
        citations = int(cit_match.group(1)) if cit_match and cit_match.group(1) else 0

        rows.append(
            ScholarEntry(
                title=title,
                authors=authors,
                venue=venue,
                year=year,
                citations=citations,
                scholar_url=scholar_url,
                paper_url=None,
            )
        )
    return rows


def fetch_scholar_entries(user_id: str, max_pages: int, pagesize: int, timeout: int) -> list[ScholarEntry]:
    entries: list[ScholarEntry] = []
    for page in range(max_pages):
        cstart = page * pagesize
        page_html = fetch_scholar_page(user_id=user_id, cstart=cstart, pagesize=pagesize, timeout=timeout)
        rows = parse_scholar_rows(page_html)
        if not rows:
            break
        entries.extend(rows)
        if len(rows) < pagesize:
            break

    for entry in entries:
        if not entry.scholar_url:
            continue
        entry.paper_url = fetch_paper_url_from_scholar_citation(entry.scholar_url, timeout)

    return entries


def fetch_paper_url_from_scholar_citation(citation_url: str, timeout: int) -> str | None:
    req = urllib.request.Request(citation_url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:  # nosec B310
            page_html = resp.read().decode("utf-8", errors="replace")
    except Exception:
        return None

    match = re.search(r'<a[^>]*class="gsc_oci_title_link"[^>]*href="([^"]+)"', page_html, re.S)
    if not match:
        return None

    return html.unescape(match.group(1))


def extract_user_id(value: str) -> str:
    if re.fullmatch(r"[A-Za-z0-9_-]{6,}", value):
        return value
    parsed = urllib.parse.urlparse(value)
    query = urllib.parse.parse_qs(parsed.query)
    user_values = query.get("user", [])
    if not user_values:
        raise ValueError("Could not find user=... in provided Google Scholar URL.")
    return user_values[0]


def find_publications_slice(content: str) -> tuple[int, int]:
    key = "publications: ["
    start = content.find(key)
    if start == -1:
        raise ValueError("Could not find publications array in content.ts")
    arr_start = content.find("[", start)
    depth = 0
    for i in range(arr_start, len(content)):
        ch = content[i]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return arr_start, i
    raise ValueError("Could not find end of publications array")


def parse_publication_blocks(content: str) -> list[PublicationBlock]:
    arr_start, arr_end = find_publications_slice(content)
    body = content[arr_start + 1 : arr_end]

    blocks: list[PublicationBlock] = []
    i = 0
    while i < len(body):
        if body[i] != "{":
            i += 1
            continue

        start = i
        depth = 0
        for j in range(i, len(body)):
            if body[j] == "{":
                depth += 1
            elif body[j] == "}":
                depth -= 1
                if depth == 0:
                    end = j + 1
                    raw = body[start:end]
                    title_match = re.search(r'title:\s*"([^"]+)"', raw)
                    if title_match:
                        citation_match = re.search(r"citationCount:\s*(\d+)", raw)
                        paper_match = re.search(r'\n\s*paperUrl:\s*"([^"]+)"', raw)
                        scholar_match = re.search(r'\n\s*scholarCitationUrl:\s*"([^"]+)"', raw)
                        blocks.append(
                            PublicationBlock(
                                start=arr_start + 1 + start,
                                end=arr_start + 1 + end,
                                text=raw,
                                title=title_match.group(1),
                                citation_count=int(citation_match.group(1)) if citation_match else None,
                                paper_url=paper_match.group(1) if paper_match else None,
                                scholar_citation_url=scholar_match.group(1) if scholar_match else None,
                            )
                        )
                    i = end
                    break
        else:
            raise ValueError("Unbalanced braces while parsing publications array")
    return blocks


def set_or_remove_string_field(block_text: str, field_name: str, value: str | None, anchor_fields: list[str]) -> tuple[str, str]:
    existing = re.search(rf'(\n\s*{field_name}:\s*")([^"]+)(",)', block_text)

    if value is None:
        if existing:
            return block_text[: existing.start()] + block_text[existing.end() :], "removed"
        return block_text, "unchanged"

    if existing:
        if existing.group(2) == value:
            return block_text, "unchanged"
        return block_text[: existing.start(2)] + value + block_text[existing.end(2) :], "updated"

    for anchor_field in anchor_fields:
        anchor_match = re.search(rf'(\n\s*{anchor_field}:\s*[^\n]+,)', block_text)
        if anchor_match:
            indent_match = re.search(rf"\n(\s*){anchor_field}:", anchor_match.group(1))
            indent = indent_match.group(1) if indent_match else "      "
            insertion = f'\n{indent}{field_name}: "{value}",'
            insert_at = anchor_match.end(1)
            return block_text[:insert_at] + insertion + block_text[insert_at:], "added"

    return block_text, "missing_anchor"


def update_publication_block(
    block_text: str,
    new_citations: int,
    scholar_url: str | None,
    paper_url: str | None,
) -> tuple[str, str, str, str]:
    desired_count = new_citations if new_citations > 0 else None
    existing = re.search(r"(\n\s*citationCount:\s*)(\d+)(,)", block_text)
    updated_block = block_text

    if desired_count is None:
        if existing:
            updated_block = block_text[: existing.start()] + block_text[existing.end() :]
            citation_state = "removed"
        else:
            citation_state = "unchanged"
    elif existing:
        current = int(existing.group(2))
        if current == desired_count:
            citation_state = "unchanged"
        else:
            updated_block = block_text[: existing.start(2)] + str(desired_count) + block_text[existing.end(2) :]
            citation_state = "updated"
    else:
        venue_line = re.search(r'(\n\s*venue:\s*"[^"]+",)', block_text)
        if not venue_line:
            citation_state = "unchanged"
        else:
            indent_match = re.search(r"\n(\s*)venue:", venue_line.group(1))
            indent = indent_match.group(1) if indent_match else "      "
            insertion = f"\n{indent}citationCount: {desired_count},"
            insert_at = venue_line.end(1)
            updated_block = block_text[:insert_at] + insertion + block_text[insert_at:]
            citation_state = "added"

    updated_block, scholar_state = set_or_remove_string_field(
        updated_block,
        "scholarCitationUrl",
        scholar_url,
        ["citationCount", "venue"],
    )
    updated_block, paper_state = set_or_remove_string_field(
        updated_block,
        "paperUrl",
        paper_url,
        ["scholarCitationUrl", "citationCount", "venue"],
    )

    return updated_block, citation_state, scholar_state, paper_state


def apply_updates(content: str, blocks: list[PublicationBlock], scholar_by_norm: dict[str, ScholarEntry]) -> tuple[str, dict]:
    replacements: list[tuple[int, int, str]] = []
    matched = 0
    updated = 0
    added = 0
    removed = 0
    unchanged = 0
    scholar_url_added = 0
    scholar_url_updated = 0
    scholar_url_unchanged = 0
    paper_url_added = 0
    paper_url_updated = 0
    paper_url_unchanged = 0
    paper_url_removed = 0

    cv_norm_titles: set[str] = set()
    unmatched_cv: list[str] = []

    for block in blocks:
        norm = normalize_title(block.title)
        cv_norm_titles.add(norm)
        scholar = scholar_by_norm.get(norm)
        if not scholar:
            unmatched_cv.append(block.title)
            continue

        matched += 1
        new_text, citation_state, scholar_state, paper_state = update_publication_block(
            block.text,
            scholar.citations,
            scholar.scholar_url,
            scholar.paper_url,
        )
        if citation_state == "updated":
            updated += 1
        elif citation_state == "added":
            added += 1
        elif citation_state == "removed":
            removed += 1
        else:
            unchanged += 1

        if scholar_state == "added":
            scholar_url_added += 1
        elif scholar_state == "updated":
            scholar_url_updated += 1
        elif scholar_state == "unchanged":
            scholar_url_unchanged += 1

        if paper_state == "added":
            paper_url_added += 1
        elif paper_state == "updated":
            paper_url_updated += 1
        elif paper_state == "unchanged":
            paper_url_unchanged += 1
        elif paper_state == "removed":
            paper_url_removed += 1

        replacements.append((block.start, block.end, new_text))

    new_entries = [
        {
            "title": entry.title,
            "authors": entry.authors,
            "venue": entry.venue,
            "year": entry.year,
            "citations": entry.citations,
            "scholar_url": entry.scholar_url,
            "paper_url": entry.paper_url,
        }
        for key, entry in scholar_by_norm.items()
        if key not in cv_norm_titles
    ]

    merged = content
    for start, end, new_block in sorted(replacements, key=lambda x: x[0], reverse=True):
        merged = merged[:start] + new_block + merged[end:]

    report = {
        "cv_publications": len(blocks),
        "scholar_publications": len(scholar_by_norm),
        "matched_by_normalized_title": matched,
        "citation_count_changes": {
            "updated": updated,
            "added": added,
            "removed": removed,
            "unchanged": unchanged,
        },
        "scholar_url_changes": {
            "added": scholar_url_added,
            "updated": scholar_url_updated,
            "unchanged": scholar_url_unchanged,
        },
        "paper_url_changes": {
            "added": paper_url_added,
            "updated": paper_url_updated,
            "removed": paper_url_removed,
            "unchanged": paper_url_unchanged,
        },
        "unmatched_cv_titles": unmatched_cv,
        "new_scholar_entries": sorted(new_entries, key=lambda x: (-(x["year"] or 0), x["title"])),
    }
    return merged, report


def update_profile_summary_citation_bullet(content: str, total_citations: int) -> tuple[str, str]:
    summary_match = re.search(r"(summaryBullets:\s*\[)(.*?)(\n\s*\],)", content, re.S)
    if not summary_match:
        return content, "not_found"

    bullets_body = summary_match.group(2)
    citation_pattern = re.compile(r'("[^"]*?with\s+)([0-9][0-9,]*)(\s+Google Scholar citations\.[^"]*")')
    citation_match = citation_pattern.search(bullets_body)
    if not citation_match:
        return content, "not_found"

    new_count = f"{total_citations:,}"
    if citation_match.group(2) == new_count:
        return content, "unchanged"

    updated_bullets_body = (
        bullets_body[: citation_match.start(2)]
        + new_count
        + bullets_body[citation_match.end(2) :]
    )
    updated_content = content[: summary_match.start(2)] + updated_bullets_body + content[summary_match.end(2) :]
    return updated_content, "updated"


def dedupe_entries(entries: Iterable[ScholarEntry]) -> dict[str, ScholarEntry]:
    by_norm: dict[str, ScholarEntry] = {}
    for entry in entries:
        norm = normalize_title(entry.title)
        if not norm:
            continue
        previous = by_norm.get(norm)
        if not previous:
            by_norm[norm] = entry
            continue
        if entry.citations > previous.citations:
            by_norm[norm] = entry
    return by_norm


def run_self_test() -> int:
    sample_html = '''
<tr class="gsc_a_tr">
  <td class="gsc_a_t">
    <a class="gsc_a_at" href="/citations?view_op=view_citation&hl=en&user=dLAxLwUAAAAJ&citation_for_view=dLAxLwUAAAAJ:u5HHmVD_uO8C">Paper A</a>
    <div class="gs_gray">Alice, Bob</div>
    <div class="gs_gray">Venue X</div>
  </td>
  <td class="gsc_a_c"><a class="gsc_a_ac gs_ibl">12</a></td>
  <td class="gsc_a_y"><span class="gsc_a_h gsc_a_hc gs_ibl">2024</span></td>
</tr>
<tr class="gsc_a_tr">
  <td class="gsc_a_t"><a class="gsc_a_at" href="/citations?view_op=view_citation&hl=en&user=dLAxLwUAAAAJ&citation_for_view=dLAxLwUAAAAJ:2osOgNQ5qMEC">Paper B</a><div class="gs_gray">A</div><div class="gs_gray">Venue Y</div></td>
  <td class="gsc_a_c"><a class="gsc_a_ac gs_ibl"></a></td>
  <td class="gsc_a_y"><span class="gsc_a_h gsc_a_hc gs_ibl">2021</span></td>
</tr>
'''
    rows = parse_scholar_rows(sample_html)
    assert len(rows) == 2
    assert rows[0].citations == 12
    assert rows[1].citations == 0
    rows[0].paper_url = "https://example.org/paper-a"
    rows[1].paper_url = "https://example.org/paper-b-from-scholar"

    sample_cv = '''export const cvContent = {
  publications: [
    {
      id: "a",
      title: "Paper A",
      year: 2024,
      venue: "Venue X",
      kind: "journal",
      topics: ["medical-ai"],
      order: 1,
    },
    {
      id: "b",
      title: "Paper B",
      year: 2021,
      venue: "Venue Y",
      citationCount: 5,
      paperUrl: "https://example.com/paper-b",
      kind: "journal",
      topics: ["medical-ai"],
      order: 2,
    },
  ],
};'''

    by_norm = dedupe_entries(rows)
    blocks = parse_publication_blocks(sample_cv)
    merged, report = apply_updates(sample_cv, blocks, by_norm)

    assert "citationCount: 12" in merged
    assert "citationCount: 5" not in merged
    assert "scholarCitationUrl: \"https://scholar.google.com/citations?view_op=view_citation&hl=en&user=dLAxLwUAAAAJ&citation_for_view=dLAxLwUAAAAJ:u5HHmVD_uO8C\"" in merged
    assert "paperUrl: \"https://example.org/paper-a\"" in merged
    assert "paperUrl: \"https://example.org/paper-b-from-scholar\"" in merged
    assert report["citation_count_changes"]["added"] == 1
    assert report["citation_count_changes"]["removed"] == 1
    assert report["scholar_url_changes"]["added"] == 2
    assert report["paper_url_changes"]["added"] == 1
    assert report["paper_url_changes"]["updated"] == 1

    profile_sample = '''export const cvContent = {
  profile: {
    summaryBullets: [
      "Entrepreneurial builder with experience leading cross-functional teams.",
      "AI and healthcare researcher with peer-reviewed work spanning medical imaging and federated learning, with 1,234 Google Scholar citations.",
    ],
  },
};'''
    profile_updated, profile_state = update_profile_summary_citation_bullet(profile_sample, 98765)
    assert profile_state == "updated"
    assert "with 98,765 Google Scholar citations." in profile_updated

    print("Self-test passed")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync Google Scholar citations into src/data/cv/content.ts")
    parser.add_argument("--scholar-user", help="Google Scholar user ID or full profile URL")
    parser.add_argument("--content-file", default="src/data/cv/content.ts")
    parser.add_argument("--max-pages", type=int, default=5)
    parser.add_argument("--pagesize", type=int, default=100)
    parser.add_argument("--timeout", type=int, default=20)
    parser.add_argument("--apply", action="store_true", help="Write updates to --content-file")
    parser.add_argument("--report-json", help="Write detailed JSON report to this path")
    parser.add_argument("--input-html", help="Load a local Scholar HTML file instead of fetching over network")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        return run_self_test()

    if not args.scholar_user:
        parser.error("--scholar-user is required unless --self-test is used")

    content_path = Path(args.content_file)
    if not content_path.exists():
        raise FileNotFoundError(f"content file not found: {content_path}")

    user_id = extract_user_id(args.scholar_user)

    if args.input_html:
        html_blob = Path(args.input_html).read_text(encoding="utf-8")
        entries = parse_scholar_rows(html_blob)
    else:
        entries = fetch_scholar_entries(
            user_id=user_id,
            max_pages=args.max_pages,
            pagesize=args.pagesize,
            timeout=args.timeout,
        )

    if not entries:
        print("No publications found from Google Scholar. Check profile visibility or parameters.", file=sys.stderr)
        return 2

    scholar_by_norm = dedupe_entries(entries)

    content = content_path.read_text(encoding="utf-8")
    blocks = parse_publication_blocks(content)
    merged, report = apply_updates(content, blocks, scholar_by_norm)
    total_citations = sum(entry.citations for entry in scholar_by_norm.values())
    merged, summary_bullet_state = update_profile_summary_citation_bullet(merged, total_citations)
    report["profile_summary_citation_bullet"] = {
        "status": summary_bullet_state,
        "total_google_scholar_citations": total_citations,
    }

    print(json.dumps(report, indent=2, ensure_ascii=False))

    if args.report_json:
        Path(args.report_json).write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if args.apply:
        content_path.write_text(merged, encoding="utf-8")
        print(f"Updated {content_path}")
    else:
        with NamedTemporaryFile("w", suffix=".ts", delete=False, encoding="utf-8") as fp:
            fp.write(merged)
            tmp = fp.name
        print(f"Dry-run only. Candidate merged file: {tmp}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
