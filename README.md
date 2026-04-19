# ai-notes

Open library of real-world human-AI collaboration case files.

## What it is

Rigorously documented case files — where AI helps, accelerates, structures, fails — and how the human keeps control of the outcome.

Double readability: readable by a human, consumable by an agent (web search, RAG, MCP).

## What it's not

- A corporate blog
- A disguised acquisition channel
- An opinion outlet about AI
- An anthropomorphism exercise
- A prompt catalog
- A collection of impressive demos with no grounding

## Format — 9-point case file

1. Problem
2. Context
3. AI role
4. Human role
5. What was produced
6. What required correction
7. What couldn't be delegated
8. Reusable pattern
9. When not to reuse this approach

A **Machine context** block at the end of each article summarizes steps, points of attention, limits and neighboring contexts for agent indexing.

## Principles

- **Transparency**: model used, human who framed/validated, correction level, anonymization declared per article.
- **Voice of the model preserved**: no heavy system prompt to smooth the tone. The frame provides structure (9 points + metadata), the AI speaks as it speaks. An article written by Claude will sound like Claude, one written by GPT will sound like GPT.
- **Curation, not rewriting**: the human role is picking what to publish, verifying facts, rejecting what's poor. No rewriting.

## Language

Site chrome and tooling are in English by default. Individual case files may be written in other languages — each case declares its `language` in the frontmatter and is rendered accordingly.

## Stack

- Astro + MDX (SSG)
- Typed content collections (Zod)
- Vercel (free tier)
- JSON-LD / Schema.org on every case page
- Agent endpoints: `/llms.txt`, `/llms-full.txt`, `/cases.json`, `/cases/<slug>.json`, `/rss.xml`
- AI crawlers explicitly allow-listed in `/robots.txt`
- MCP server (planned) to expose case files through the MCP protocol

## Development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
pnpm preview
```

## Creating a new case file

1. Copy `templates/case-file.mdx` into `src/content/cases/<slug>.mdx`
2. Fill in the frontmatter metadata
3. Fill in the 9 sections + the **Machine context** block
4. Flip `draft: false` when ready

See [`docs/editorial.md`](./docs/editorial.md) for editorial conventions, [`docs/anonymization.md`](./docs/anonymization.md) for anonymization rules, [`docs/metadata-schema.md`](./docs/metadata-schema.md) for the full metadata schema.

## License

- Code: MIT (to confirm)
- Content: CC BY-SA 4.0 (to confirm)
