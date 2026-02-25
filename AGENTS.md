# AGENTS

## Project memory

- Repository: `stmharry.github.io`
- Active branch: `main`
- Site direction: very minimal, editorial clean, serif + sans mix
- Stack: Vite + React + TypeScript + Tailwind CSS + Bun
- Scope for v1: one-page essentials (hero, short bio, links, selected publications)
- Legacy usage rule: use `origin/master` only as a source of content/assets
- `CNAME` is intentionally not included during scaffold stage
- Canonical source of truth: latest long-form resume content in `src/data/cv/content.ts`
- Content architecture: typed data in `src/data/cv/*`, rendering in `src/components/*`
- Topics use internal slug + display label (`TopicSlug` + `Topic`)
- Theme behavior: manual light/dark toggle, system default, persisted preference
- Resume pipeline: preserve LaTeX rendering for PDF fidelity, generated from canonical TS data

## Working agreement

- Use Bun as package manager and task runner
- Keep changes small and commit in understandable units
- Before each commit, run checks:
  - `bun test`
  - `bun run build`
  - `bun run resume:generate`
- Push after each successful commit
- Follow `.gitmessage.txt` gitmoji commit style

## Style guidance

- Keep layout minimal but intentional
- Prefer whitespace, restrained color, and clear hierarchy
- Preserve mobile and desktop readability
- Avoid carrying old Bootstrap-era styles into the new implementation

## Core features for current baseline

- Structured sections with predefined fields for profile, experience, and publications
- Single-select topic filter for selected publications
- SEO baseline (meta tags + Open Graph + Twitter + JSON-LD Person)
- Theme system with light/dark mode and local persistence
- Dual output targets: minimal website + full resume PDF
