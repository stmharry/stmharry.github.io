# stmharry.github.io

Minimal personal website scaffold built with React, TypeScript, Vite, Tailwind CSS, and Bun.

## Current status

- One-page, modular baseline implemented on `main`
- Canonical CV data source established at `src/data/cv/content.ts`
- Theme follows system preference (no manual toggle)
- Publications section with single-select topic filter over full list
- SEO baseline in place (meta tags + Open Graph + Twitter + JSON-LD)
- LaTeX resume pipeline generated from canonical TS data
- Legacy content and assets should be sourced only from `origin/master` as needed
- `CNAME` is intentionally excluded for now

## Tech stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Bun 1.x

## Getting started

```bash
bun install
bun dev
```

Open the local URL shown by Vite.

## Deploy to GitHub Pages

Publish the built site (`dist`) to the `gh-pages` branch:

```bash
bun run deploy
```

The deploy command automatically runs `bun run build` first.

## Quality checks

Run these before commits:

```bash
bun run check
```

Equivalent expanded commands:

```bash
bun test
bun run build
bun run resume:generate
```

Optional additional check:

```bash
bun run lint
```

## Project files

- App entry: `src/main.tsx`
- Page composition: `src/App.tsx`
- Base styles and tokens: `src/index.css`
- Canonical CV data and types: `src/data/cv/content.ts`, `src/data/cv/types.ts`
- CV selectors: `src/data/cv/selectors.ts`
- UI components: `src/components/*`
- Resume generation script: `scripts/generate-resume-tex.ts`
- Generated resume source: `resume/resume.tex`
- Publication media assets: `public/assets/publications/*`
- Agent memory and workflow: `AGENTS.md`

## Content architecture

The app keeps data and rendering separate with one source of truth:

- All canonical CV content is defined in `src/data/cv/content.ts`
- Data contracts are defined in `src/data/cv/types.ts`
- Website and resume are both derived from the same canonical data
- UI components read typed data and avoid embedded hardcoded content
- Publication records include optional media/action links (slides, poster, video, code, project, dataset)
- Publication thumbnails use ratio-aware media frames with `object-contain`
- Publication citations are stored as numeric `citationCount` values
- Internal asset links are resolved with `import.meta.env.BASE_URL` for subpath-safe deploys
- Publication asset filenames follow `<year>--<publication-id>--<type>.<ext>` for maintainability
- Publication links use explicit fields: `paperUrl` and `scholarCitationUrl`

### Topic model

Publications use internal slugs with user-facing labels:

- Slug type: `TopicSlug` (for stable internal references)
- Display object: `Topic` with `{ slug, label }`

This supports stable filtering logic while keeping readable UI labels.

## Core v1 features

- Structured sections with predefined fields:
  - profile
  - links
  - experience
  - education
  - publications
- Single-select topic filter for publications (`All` + one topic)
- All publications are rendered by default; filter buttons narrow the list
- Experience section uses summary-only cards, shows highlighted entries first, and uses a See more/See less control that reveals full history at once
- Education is rendered as a standalone section between experience and publications
- Light/dark theme follows system preference automatically
- SEO baseline:
  - title and description
  - Open Graph and Twitter metadata
  - JSON-LD `Person` schema

## Resume pipeline

Generate LaTeX from canonical CV data:

```bash
bun run resume:generate
```

Build PDF (requires local `latexmk`):

```bash
bun run resume:deps
bun run resume:build
```

Clean generated resume artifacts:

```bash
bun run resume:clean
```

Output PDF path:

- `public/assets/resume/tzu-ming-harry-hsu-resume.pdf`

## Commit message format

Commit messages follow the gitmoji template stored in `.gitmessage.txt`.
