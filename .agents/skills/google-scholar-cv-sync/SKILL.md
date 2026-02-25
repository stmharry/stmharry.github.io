---
name: google-scholar-cv-sync
description: Extract publications and citation counts from a public Google Scholar profile and merge them into the canonical CV source in src/data/cv/content.ts. Use when asked to sync Scholar citations, detect new Scholar articles, or update publication metadata in the website/resume source-of-truth file.
---

# Google Scholar CV Sync

Use `scripts/sync_google_scholar_cv.py` to fetch publication rows from Google Scholar and reconcile them with `src/data/cv/content.ts`.

## Workflow

1. Run a dry run first:
```bash
python3 .agents/skills/google-scholar-cv-sync/scripts/sync_google_scholar_cv.py \
  --scholar-user "https://scholar.google.com/citations?user=dLAxLwUAAAAJ" \
  --content-file src/data/cv/content.ts
```
2. Review the JSON report:
- `citation_count_changes`: counts of `added`/`updated`/`removed` numeric values.
- `scholar_url_changes`: counts of updates to `scholarCitationUrl`.
- `paper_url_changes`: counts of updates to `paperUrl`.
- `profile_summary_citation_bullet`: sync status for the profile summary bullet that includes `Google Scholar citations`, plus the recomputed total citation count.
- `new_scholar_entries`: items present on Scholar but not matched in CV by normalized title.
- `unmatched_cv_titles`: CV items not found on Scholar.
3. Apply updates after review:
```bash
python3 .agents/skills/google-scholar-cv-sync/scripts/sync_google_scholar_cv.py \
  --scholar-user "dLAxLwUAAAAJ" \
  --content-file src/data/cv/content.ts \
  --apply
```
4. For unmatched/new items, add or edit publication objects manually in `src/data/cv/content.ts`:
- Keep `id`, `kind`, `topics`, and `order` aligned with project conventions.
- Set `citationCount` using numeric values when citations are non-zero.

Link behavior during apply:

- Always set `scholarCitationUrl` from Scholar citation page links.
- Always set `paperUrl` from Scholar citation detail page title links (`gsc_oci_title_link`) when available.
- If Scholar detail page has no paper URL, `paperUrl` is removed and rendering falls back to `scholarCitationUrl`.

## Options

- `--max-pages`: limit Scholar pagination depth (default `5`).
- `--pagesize`: rows per page request (default `100`).
- `--report-json <path>`: persist report for review.
- `--input-html <file>`: parse a saved Scholar HTML file instead of network fetch.
- `--self-test`: run parser + merge sanity checks without touching repo files.

## Notes

- Matching uses normalized title strings (case/punctuation-insensitive).
- Script updates `citationCount`, `paperUrl`, and `scholarCitationUrl`; it does not auto-create new publication objects.
- Script also updates the numeric citation value inside the profile summary bullet sentence that explicitly contains `Google Scholar citations`.
- Google Scholar HTML can change; if parsing fails, inspect row selectors in the script and patch accordingly.
