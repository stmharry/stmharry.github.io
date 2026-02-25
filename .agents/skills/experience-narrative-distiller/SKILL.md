---
name: experience-narrative-distiller
description: Convert freeform job narratives into structured, recruiter-facing experience entries for src/data/cv/content.ts. Use when the user wants to talk through work history in natural language and then produce concise summaries, optional bullets, and metadata such as highlighted flags, periods, locations, and role naming.
---

# Experience Narrative Distiller

Use this skill when the user describes what they did in a role and wants polished CV-ready output.

## Core Goals

1. Capture the true scope and outcomes of the role.
2. Distill long narratives into high-signal summaries.
3. Preserve optional detail bullets for richer contexts.
4. Output structured fields that can be pasted into `src/data/cv/content.ts`.

## Workflow

1. Ask for role context if missing.
2. Ask focused follow-ups to clarify outcomes and metrics.
3. Draft multiple summary variants.
4. Draft optional bullet highlights.
5. Produce structured JSON-like output for direct data entry.

## Clarifying Prompts

Ask only what is missing, prioritizing these fields:

- `organization`
- `role`
- `location`
- `period`
- `scope` (what was owned)
- `outcomes` (what changed)
- `metrics` (numbers, percentages, scale)
- `collaboration context` (teams, stakeholders)

## Output Contract

Return two versions:

1. **Readable draft**
   - 1-2 sentence summary
   - 3-7 optional bullets

2. **Structured payload** (ready for `experience[]` in `src/data/cv/content.ts`)

```ts
{
  id: "<kebab-id>",
  organization: "<Organization>",
  period: "<Mon YYYY -- Mon YYYY|Present>",
  role: "<Role>",
  location: "<Location>",
  summary: "<Recruiter-facing summary>",
  highlights: [
    { text: "<Outcome bullet 1>" },
    { text: "<Outcome bullet 2>" }
  ],
  highlighted: <true|false>
}
```

## Writing Rules

- Prefer outcomes over process.
- Keep summaries concise and skimmable.
- Include numbers only when they communicate clear impact.
- Avoid low-signal details (for example, weekly hour counts) unless user requests them.
- Use active verbs: built, led, launched, reduced, improved, scaled.

## Style Variants

When useful, provide both:

- **With numbers**: includes key metrics.
- **Without numbers**: cleaner narrative tone.

## Quality Gate Before Finalizing

Ensure each summary answers:

1. What did this person own?
2. What changed because of their work?
3. Why should a recruiter/partner care?

If any answer is weak, ask one targeted follow-up and refine.
