# Matching Notes

- Title matching is normalized by lowercasing, removing punctuation, and collapsing whitespace.
- Citation reconciliation is one-way: Scholar -> `citationCount` in CV objects.
- Scholar link reconciliation is additive: Scholar `href` fills missing CV `href` only; existing CV links are preserved.
- Keep manual review for new publications because project-specific fields (`id`, `topics`, `order`) require editorial intent.
