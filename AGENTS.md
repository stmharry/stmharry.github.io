# AGENTS

## Project memory

- Repository: `stmharry.github.io`
- Active branch: `main`
- Site direction: very minimal, editorial clean, serif + sans mix
- Stack: Vite + React + TypeScript + Tailwind CSS + Bun
- Scope for v1: one-page essentials (hero, short bio, links, selected publications)
- Legacy usage rule: use `origin/master` only as a source of content/assets
- `CNAME` is intentionally not included during scaffold stage

## Working agreement

- Use Bun as package manager and task runner
- Keep changes small and commit in understandable units
- Before each commit, run checks:
  - `bun test`
  - `bun run build`
- Push after each successful commit
- Follow `.gitmessage.txt` gitmoji commit style

## Style guidance

- Keep layout minimal but intentional
- Prefer whitespace, restrained color, and clear hierarchy
- Preserve mobile and desktop readability
- Avoid carrying old Bootstrap-era styles into the new implementation
