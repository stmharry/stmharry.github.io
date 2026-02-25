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
- Theme behavior: system default via `prefers-color-scheme` (no manual toggle)
- Resume pipeline: preserve LaTeX rendering for PDF fidelity, generated from canonical TS data
- Publication UI behavior: render all publications with topic filter buttons (no subset list)
- Publication media reuse: use `origin/master` assets selectively in `public/assets/publications/*`
- Publication thumbnail behavior: ratio-aware media frames with `object-contain`
- Publication citation data: store numeric `citationCount` values (format labels at render time)
- Publication asset naming: use `<year>--<publication-id>--<type>.<ext>` for internal media
- Publication URL fields: prefer explicit `paperUrl` and `scholarCitationUrl` over generic `href`
- Internal asset links in UI: resolve via `import.meta.env.BASE_URL`
- Experience web behavior: show highlighted entries first with expand-all toggle for full history
- Education web behavior: render standalone section between experience and publications

## Working agreement

- Use Bun as package manager and task runner
- Keep changes small and commit in understandable units
- Before each commit, run checks:
  - `bun test`
  - `bun run build`
  - `bun run resume:generate`
- Push after each successful commit
- Follow `.gitmessage.txt` gitmoji commit style

## Worktree merge strategy

- Implement changes on a feature worktree branch (for example, `opencode/*`)
- Keep `main` checked out in `/workspace/stmharry.github.io`
- Before commit and before integrating, run:
  - `bun test`
  - `bun run build`
  - `bun run resume:generate`
- Integrate feature work into `main` using this fallback order:
  - Fast-forward merge on main worktree (`git merge --ff-only <feature-branch>`)
  - Rebase feature branch onto `origin/main` when fast-forward is not possible
  - Manual merge only when both fast-forward and rebase cannot complete cleanly
- After integration, confirm `main` and feature branch point to the same commit

## Style guidance

- Keep layout minimal but intentional
- Prefer whitespace, restrained color, and clear hierarchy
- Preserve mobile and desktop readability
- Avoid carrying old Bootstrap-era styles into the new implementation

## Core features for current baseline

- Structured sections with predefined fields for profile, experience, and publications
- Structured sections with predefined fields for profile, experience, education, and publications
- Single-select topic filter for full publications list
- SEO baseline (meta tags + Open Graph + Twitter + JSON-LD Person)
- Theme system with automatic system light/dark behavior
- Dual output targets: minimal website + full resume PDF

## Local skills

- Project-local skills live in `./.agents/skills/`
- `google-scholar-cv-sync` (`./.agents/skills/google-scholar-cv-sync/SKILL.md`)
- Purpose (`google-scholar-cv-sync`): extract Google Scholar publications/citation counts and reconcile them with `src/data/cv/content.ts`
- Trigger (`google-scholar-cv-sync`): requests to sync/update Scholar citations, detect new Scholar publications, or merge Scholar publication metadata into CV source-of-truth
- `experience-narrative-distiller` (`./.agents/skills/experience-narrative-distiller/SKILL.md`)
- Purpose (`experience-narrative-distiller`): convert freeform role narratives into recruiter-facing summaries, optional bullets, and structured `experience[]` entries for `src/data/cv/content.ts`
- Trigger (`experience-narrative-distiller`): requests to talk through what the user did in a role and distill it into concise CV-ready content with metadata
