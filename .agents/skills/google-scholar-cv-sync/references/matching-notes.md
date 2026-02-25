# Matching Notes

- Title matching is normalized by lowercasing, removing punctuation, and collapsing whitespace.
- Citation reconciliation is one-way: Scholar -> `citationCount` in CV objects.
- Scholar link reconciliation is authoritative: `scholarCitationUrl` and `paperUrl` are updated from Scholar parsing results.
- Keep manual review for new publications because project-specific fields (`id`, `topics`, `order`) require editorial intent.
