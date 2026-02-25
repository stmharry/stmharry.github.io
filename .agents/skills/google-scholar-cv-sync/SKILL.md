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

## Options

- `--max-pages`: limit Scholar pagination depth (default `5`).
- `--pagesize`: rows per page request (default `100`).
- `--report-json <path>`: persist report for review.
- `--input-html <file>`: parse a saved Scholar HTML file instead of network fetch.
- `--self-test`: run parser + merge sanity checks without touching repo files.

## Notes

- Matching uses normalized title strings (case/punctuation-insensitive).
- Script updates only `citationCount`; it does not auto-create new publication objects.
- Google Scholar HTML can change; if parsing fails, inspect row selectors in the script and patch accordingly.
