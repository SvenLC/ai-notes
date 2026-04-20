# ai-notes

> An open library of real-world human-AI collaboration case files. Every entry documents where the AI helped, where it slipped, and what the human could not delegate.

[![Build](https://github.com/SvenLC/ai-notes/actions/workflows/build.yml/badge.svg)](https://github.com/SvenLC/ai-notes/actions/workflows/build.yml)
[![Code MIT](https://img.shields.io/badge/code-MIT-blue.svg)](./LICENSE)
[![Content CC BY-SA 4.0](https://img.shields.io/badge/content-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

**Live site → [www.svenlc.com](https://www.svenlc.com)**

---

## Why

Most writing about AI oscillates between two poles: spectacular demos disconnected from real work, or abstract opinion pieces. The middle layer is underserved — the ordinary, documented account of **how an AI actually behaves when you put it on a specific task with real constraints**.

ai-notes fills that gap with a single, repeatable format. Every article is a *case file*, written in the model's own voice, curated by a human, with the limits and corrections stated explicitly.

## What it is

- A public record of AI used on real jobs, with the method transparent
- Written by the model, curated by a human — no rewriting, no tone smoothing
- Structured for dual readability: a human can read an article in five minutes; an agent can retrieve the pattern, extract the limits, and cite the passage

## What it's not

- A corporate blog
- A disguised acquisition channel
- An opinion outlet about AI
- An anthropomorphism exercise
- A prompt catalog
- A collection of impressive demos with no business grounding

## The case file format

Every entry follows the same nine sections:

1. **Problem** — what was asked, and why it mattered
2. **Context** — the environment and constraints
3. **AI role** — what was delegated
4. **Human role** — what was framed, corrected, arbitrated, validated
5. **What was produced** — the concrete deliverable
6. **What required correction** — gaps, inaccuracies, missed cases
7. **What couldn't be delegated** — judgment, context, responsibility
8. **Reusable pattern** — the transposable recipe
9. **When not to reuse this approach** — counter-indications

Each article closes with a **Machine context** block: a condensed summary, points of attention, limits, and neighboring contexts, written for direct agent consumption.

See [`templates/case-file.mdx`](./templates/case-file.mdx) for the starting scaffold and [`src/content/cases/`](./src/content/cases) for published cases.

## Editorial principles

- **Transparency.** Every case declares the model used, the human who framed and validated, the level of correction, and whether the content was anonymized. These are required frontmatter fields, surfaced visibly in the transparency aside on every article.
- **Voice of the model preserved.** No system prompt to smooth the tone. The frame (9 sections + typed metadata) is the structure; inside the frame, the model speaks as it speaks. Claude sounds like Claude, GPT sounds like GPT. The site is, incidentally, a living comparison of model voices.
- **Curation, not rewriting.** The human's job is to pick what's worth publishing, check the facts, and refuse what's poor. Not to rewrite. A stylistically awkward but factually true passage stays; a fluent but false one does not.
- **Anonymization has carve-outs.** Public brands can be named. Confidential partners and named individuals in sensitive contexts cannot. See [`docs/anonymization.md`](./docs/anonymization.md).

## Built for agents too

The site exposes a full agent-reading surface alongside the HTML:

| Endpoint | Purpose |
|---|---|
| [`/llms.txt`](https://www.svenlc.com/llms.txt) | LLM discovery manifest ([spec](https://llmstxt.org)) |
| [`/llms-full.txt`](https://www.svenlc.com/llms-full.txt) | Full-text dump of every case, inlined in Markdown |
| [`/cases.json`](https://www.svenlc.com/cases.json) | Typed index of every published case |
| `/cases/<slug>.json` | Frontmatter + raw Markdown body for a single case |
| [`/rss.xml`](https://www.svenlc.com/rss.xml) | Standard RSS feed |
| [`/sitemap.xml`](https://www.svenlc.com/sitemap.xml) | XML sitemap |
| [`/robots.txt`](https://www.svenlc.com/robots.txt) | GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, Applebot-Extended explicitly allow-listed |
| JSON-LD | `Blog` + `Person` on home, `AboutPage` on about, `Article` + `BreadcrumbList` on every case |

An MCP server exposing case files as agent tools (`list_cases`, `get_case`, `search_cases`) is planned for a follow-up iteration.

## Language

English by default. Individual case files may be written in another language — each case declares its `language` field and is rendered accordingly. Dates and locale-sensitive formatting follow the case's declared language.

## Start your own

The repository is structured so you can fork it and publish your own case file library:

1. Fork the repo
2. Replace `src/content/cases/` with your own cases (copy the template)
3. Update the publisher identity in [`src/pages/index.astro`](./src/pages/index.astro), [`src/pages/author/sven.astro`](./src/pages/author/sven.astro), and the schema.org `Person` references
4. Update `astro.config.mjs` with your own `site` URL
5. Deploy to Vercel / Netlify / Cloudflare Pages — it's a standard Astro SSG project

The format, the schema, the editorial conventions, and the agent endpoints are yours to reuse.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
pnpm preview
```

Requires pnpm 10+ (pinned in `package.json#packageManager`).

## Creating a new case file

1. Copy [`templates/case-file.mdx`](./templates/case-file.mdx) to `src/content/cases/<slug>.mdx` (filename = URL slug, lowercase kebab-case)
2. Fill every frontmatter field — the Zod schema validates at build time
3. Fill the 9 sections + the Machine context block
4. Flip `draft: false` when ready

See [`docs/metadata-schema.md`](./docs/metadata-schema.md) for the full frontmatter reference and [`docs/editorial.md`](./docs/editorial.md) for the publishing criteria.

## Stack

[Astro 4](https://astro.build) + MDX, static output, typed content collections ([Zod](https://zod.dev)), deployed on [Vercel](https://vercel.com). Vercel Web Analytics for traffic. Zero runtime JavaScript on the HTML pages (only inline JSON-LD + the analytics custom element).

See [`CLAUDE.md`](./CLAUDE.md) for repo-specific conventions and the known deferred items.

## License

- **Code** — [MIT](./LICENSE)
- **Content** (the case files, docs, and editorial prose) — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Fork the code freely. Reuse the case files with attribution and share-alike.

## Acknowledgments

The case files are produced by the AI models named in each article's frontmatter. The framing, editorial choices, and verification are by [Sven Le Cann](https://www.svenlc.com/author/sven/).
