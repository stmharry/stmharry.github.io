# AGENTS

## Project

- Repository: `stmharry.github.io`
- Primary branch: `main`
- Stack: Bun, Vite, React, TypeScript, Tailwind CSS, LaTeX
- Direction: minimal editorial personal site with a serif/sans mix
- Public scope: one-page essentials plus canonical resume link
- Legacy source rule: use `origin/master` only for selected old content/assets
- `CNAME` is intentionally absent during scaffold-stage work

## Source Of Truth

- Canonical CV content: `src/data/cv/content.ts`
- CV types and topic slugs: `src/data/cv/types.ts`
- Resume and publication selectors: `src/data/cv/selectors.ts`
- UI rendering: `src/components/*`

Keep one canonical dataset. Public website content and the generated resume
should derive from typed data rather than duplicated prose.

## Documentation Contract

- `README.md` owns human-facing project purpose, setup, checks, deployment, and
  the short source-of-truth map.
- `AGENTS.md` owns agent workflow, repository policy, validation, commit, and
  push rules.
- `.agents/skills/*/SKILL.md` owns task-specific operational workflows.
- Update the owning doc once instead of duplicating commands, current status,
  or interpretation across files.

## Product Rules

- Current search target: physical AI / embodied AI roles, US-first, senior IC.
- Keep public site copy recruiter-forward, evidence-led, and low on personal or philosophical framing.
- The website links to the single canonical resume PDF.
- Publication UI renders the full canonical publication list and filters that list by topic.
- Internal asset links in UI must resolve through `import.meta.env.BASE_URL`.
- Theme follows system preference by default and includes the current manual light/dark override.
- Use only quantified claims the user can defend tightly.

## Workflow

- Use Bun for package management and task execution.
- Preserve existing user or generated changes; do not reset or overwrite them.
- Before implementation work, fetch `origin/main`, compare it with local `main`,
  and fast-forward or reconcile before branching or editing.
- If there are uncommitted changes, reconcile or preserve them before any sync,
  merge, or rebase operation.
- Work in cohesive logical bundles. Do not split tiny doc or config fragments
  solely for commit count.
- Commit each validated bundle. Examples: root config consolidation as one
  commit; README and AGENTS cleanup as one commit; an inseparable feature plus
  its focused tests as one commit.
- Before committing a bundle, run:

```bash
bun test
bun run build
bun run resume:build
```

- Run `bun run lint` when touching TypeScript, React, config, or docs that describe checks.
- Do not stop at a local commit or local merge when network access and remote
  credentials are available.
- After work is committed on `main`, push `main` to `origin/main`, fetch, and
  verify local `main` equals `origin/main`.
- Final handoff must state whether `main` was pushed. If push was blocked,
  state the exact blocker and current git state.
- Follow `.gitmessage.txt` gitmoji commit style: `<gitmoji> (scope): <subject>`.

## Resume And Artifacts

- Preserve LaTeX rendering for PDF fidelity.
- Generate one public resume PDF from canonical data.
- Website resume links should point to `public/assets/resume/tzu-ming-harry-hsu-resume.pdf`.
- Publication media can reuse selected `origin/master` assets under `public/assets/publications/*`.
- Publication asset filenames should follow `<year>--<publication-id>--<type>.<ext>`.
- Store citation counts as numeric `citationCount` values.
- Prefer explicit `paperUrl` and `scholarCitationUrl` fields.

## Local Skills

- `./.agents/skills/google-scholar-cv-sync/SKILL.md`: use for Scholar citation/publication sync into `src/data/cv/content.ts`.
- `./.agents/skills/experience-narrative-distiller/SKILL.md`: use for converting role narratives into concise CV-ready experience entries.

Job-search operating docs live outside this repo at:

`/Users/stmharry/Library/CloudStorage/GoogleDrive-harry19930924@gmail.com/My Drive/10-Admin/202603-job-hunt`
