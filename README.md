# stmharry.github.io

Minimal personal website scaffold built with React, TypeScript, Vite, Tailwind CSS, and Bun.

## Current status

- One-page, modular baseline implemented on `main`
- Typed data layer separated from UI rendering
- Theme toggle with system default and persisted preference
- Selected publications section with single-select topic filter
- SEO baseline in place (meta tags + Open Graph + Twitter + JSON-LD)
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

## Quality checks

Run these before commits:

```bash
bun test
bun run build
```

Optional additional check:

```bash
bun run lint
```

## Project files

- App entry: `src/main.tsx`
- Page composition: `src/App.tsx`
- Base styles and tokens: `src/index.css`
- Content data and types: `src/data/content.ts`, `src/data/types.ts`
- Content selectors: `src/data/selectors.ts`
- UI components: `src/components/*`
- Theme helpers: `src/lib/theme.ts`
- Agent memory and workflow: `AGENTS.md`

## Content architecture

The app keeps data and rendering separate:

- All editable content is defined in `src/data/content.ts`
- Data contracts are defined in `src/data/types.ts`
- UI components read typed data and avoid embedded hardcoded content

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
  - selected publications
- Single-select topic filter for publications (`All` + one topic)
- Light/dark theme toggle:
  - defaults to system preference
  - persists user choice in `localStorage`
- SEO baseline:
  - title and description
  - Open Graph and Twitter metadata
  - JSON-LD `Person` schema

## Commit message format

Commit messages follow the gitmoji template stored in `.gitmessage.txt`.
