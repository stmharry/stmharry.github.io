# stmharry.github.io

Minimal personal website scaffold built with React, TypeScript, Vite, Tailwind CSS, and Bun.

## Current status

- Fresh scaffold on branch `main`
- Editorial-minimal visual foundation in place
- Placeholder one-page layout in `src/App.tsx`
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
- Page scaffold: `src/App.tsx`
- Base styles and tokens: `src/index.css`
- Agent memory and workflow: `AGENTS.md`

## Commit message format

Commit messages follow the gitmoji template stored in `.gitmessage.txt`.
