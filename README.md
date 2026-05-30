# stmharry.github.io

Minimal personal website and resume pipeline for Tzu-Ming Harry Hsu.

The site is a one-page React app focused on essentials: hero, links, experience,
education, and curated publications. The resume pipeline generates public
applied/research PDFs plus non-public targeted application artifacts from the
same typed CV data.

## Stack

- Bun
- Vite
- React
- TypeScript
- Tailwind CSS
- LaTeX resume generation

## Quick Start

```bash
bun install
bun dev
```

Open the local URL printed by Vite.

## Quality Checks

Run the full gate before committing:

```bash
bun run check
```

That expands to:

```bash
bun test
bun run build
bun run resume:build
```

Optional lint check:

```bash
bun run lint
```

## Content Model

- Canonical CV content lives in `src/data/cv/content.ts`.
- Typed CV contracts live in `src/data/cv/types.ts`.
- Variant and target selection logic lives in `src/data/cv/selectors.ts`.
- Company and role overlays live in `src/data/cv/targets.ts`.
- UI rendering lives in `src/components/*`.

The public site uses the `applied` variant. It links to the applied PDF by
default, while the research PDF remains available for targeted applications.
Company-specific resumes are generated into the resume workspace and are not
published under `public/`.

## Resume Pipeline

Generate LaTeX:

```bash
bun run resume:generate
```

Build PDFs:

```bash
bun run resume:build
```

Build one targeted LaTeX source:

```bash
bun run resume:generate -- --target figure-data-infra
```

Public PDFs:

- `public/assets/resume/tzu-ming-harry-hsu-resume-applied.pdf`
- `public/assets/resume/tzu-ming-harry-hsu-resume-research.pdf`

Targeted PDFs:

- `resume/output/targets/resume-<target-id>.pdf`

## Deployment

Deploy the built site to GitHub Pages:

```bash
bun run deploy
```

`CNAME` is intentionally absent during the scaffold stage. Legacy content or
assets should be sourced from `origin/master` only when explicitly needed.
