# CLAUDE.md

Guidance for Claude Code when working on the **ai-notes** repository.

## What this project is

An open library of real-world human-AI collaboration case files. Double readability: human (browser) + AI agent (web search, RAG, MCP via the JSON + llms.txt endpoints).

## Rules specific to this repo

### Language

**Everything is English by default.** Site chrome, docs, endpoints, templates, and new case files are written in English.

Individual case files may be authored in another language if the original collaboration happened in that language — declare via `language: "fr"` (or other supported code) in the frontmatter. `CaseLayout.astro` renders dates per the case's declared language (`data.date.toLocaleDateString(data.language, ...)`).

Currently supported language codes in the Zod schema: `"en"`, `"fr"`. Add another by extending the enum in `src/content/config.ts`.

When writing a new case file, **default to English** unless the user explicitly asks for another language.

### Case file workflow

1. Copy `templates/case-file.mdx` → `src/content/cases/<english-kebab-case-slug>.mdx`
2. Fill the frontmatter — every required field must be present (see `docs/metadata-schema.md`)
3. Fill all 9 sections + the trailing **Machine context** block (none can be empty)
4. Flip `draft: false` when ready to publish

The file slug (filename minus `.mdx`) is the public URL at `/cases/<slug>/` and the JSON endpoint at `/cases/<slug>.json`.

### Frontmatter discipline

All classification tags are **kebab-case slugs** validated by a Zod regex (`^[a-z0-9]+(-[a-z0-9]+)*$`). Invalid slugs (uppercase, underscores, spaces) break the build.

| Field class | Example | Format |
|---|---|---|
| Tags (`domain`, `problem_type`, `input_shape`, `desired_outcome`, `ai_role`, `human_role`, `constraints`, `validation_mode`, `common_failure_modes`, `when_not_to_use`) | `"price-reconciliation"` | kebab-case slugs |
| Prose (`title`, `summary`, `actionable_takeaways`) | `"141 discrepancies surfaced..."` | natural language |
| Proper names (`tools_used`, `model`, `human`) | `"Claude"`, `"Square POS"` | common names |

### Editorial principles (from `docs/editorial.md`)

- **Curation, not rewriting.** Pick what to publish, verify facts, reject what's poor. Do not rewrite the model's prose.
- **Preserve model voice.** No system prompt to smooth tone. The frame (9 points + metadata) is the structure; inside the frame, the model speaks as it speaks.
- **Transparency is mandatory.** `model`, `human`, `correction_level`, `anonymized` are required fields, surfaced in the Transparency aside on every case page.

### Anonymization (from `docs/anonymization.md`)

- **Public brands** (Stripe, Claude, Gmail, public publishers) can be named.
- **Confidential partners**, clients, and named individuals in sensitive contexts must be anonymized and `anonymized: true` set in the frontmatter.

### Draft safety

`draft` defaults to `true` in the schema — a case file with the field missing is **hidden** from the index, the detail route, and all agent endpoints. This is intentional fail-closed behavior, but it means forgetting to flip it when publishing is silent. Always explicitly set `draft: false` when publishing.

## Stack

- **Astro 4** + **MDX** (SSG)
- **Zod-typed content collections** (`src/content/config.ts`)
- Deployed on **Vercel** (free tier, to be wired)
- Package manager: **pnpm 10** (pinned in `package.json#packageManager`)

## Agent-facing endpoints (all statically built)

| Path | Purpose |
|---|---|
| `/robots.txt` | AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, Applebot-Extended) allow-listed + `Sitemap:` reference |
| `/sitemap.xml` | Custom XML sitemap (home + /about + every published case) |
| `/llms.txt` | LLM discovery manifest (https://llmstxt.org spec) |
| `/llms-full.txt` | Full-text dump of every published case for direct agent ingestion |
| `/cases.json` | Index of all cases with frontmatter |
| `/cases/<slug>.json` | Per-case frontmatter + raw Markdown body |
| `/rss.xml` | RSS feed |
| `/404` | Custom 404 page with `noindex` meta |
| JSON-LD | `Blog` + `Person` on `/`, `AboutPage` on `/about/`, `Article` + `BreadcrumbList` on case pages (all via `<Fragment slot="head">`) |

When adding a new case, none of these files need manual updates — all are generated from the content collection at build.

## CI

GitHub Actions runs `pnpm build` on every push and PR against `main` — this validates the Zod content schema against every case file's frontmatter and ensures pages/endpoints render. If a contributor adds an invalid slug or forgets a required field, CI fails.

Defined in `.github/workflows/build.yml`.

## IndexNow

A key file lives at `/78f7c85d69f48be7b41504f472fac02a.txt` (publicly served) — this validates our ownership for the IndexNow protocol, accepted by Bing, Yandex, and Seznam.

**Manual notification on publish** (until we wire it into CI) :
```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "www.svenlc.com",
    "key": "78f7c85d69f48be7b41504f472fac02a",
    "keyLocation": "https://www.svenlc.com/78f7c85d69f48be7b41504f472fac02a.txt",
    "urlList": [
      "https://www.svenlc.com/cases/<new-slug>/",
      "https://www.svenlc.com/",
      "https://www.svenlc.com/sitemap.xml"
    ]
  }'
```

## Author page

`/author/sven/` exposes a `ProfilePage` with a full `Person` JSON-LD node (jobTitle, worksFor, description, sameAs). The Transparency aside on every case page links the human curator name to this page, strengthening the E-E-A-T entity graph.

## Analytics

Vercel Web Analytics is wired via `@vercel/analytics/astro` — the `<Analytics />` component renders just before `</body>` in `BaseLayout.astro`. It's a no-op in dev (auto-detected by the package).

For analytics data to actually flow in production :
1. In Vercel dashboard → Project → Analytics → **Enable Web Analytics**
2. Next deploy will start collecting page views

Note on CSP : `script-src` includes `'unsafe-inline'` because the Analytics custom element injects an inline bootstrap script. This is a deliberate trade-off — the site has zero user input and all content is under git control, so the XSS surface is negligible. The meaningful security headers here are `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.

## Commands

```bash
pnpm install
pnpm dev        # Astro dev server, http://localhost:4321 (port 3000 was used historically)
pnpm build
pnpm preview
```

## Conventions Claude should follow

- **Do not create a draft case file inside `src/content/cases/` with placeholder slugs.** Fill the template first (in `/templates/` or a scratch location), then move to `src/content/cases/` with real values — otherwise the Zod regex rejects placeholders like `[tag-name]` and breaks the build.
- **Never re-add `@astrojs/sitemap` at its 3.7.x version** — it crashes on `astro:build:done` under Astro 4 (expects an Astro 5 hook signature). The sitemap is now generated by a custom endpoint (`src/pages/sitemap.xml.ts`). Revisit only if you genuinely need the features of `@astrojs/sitemap` (image/video sitemaps, i18n) and have upgraded to Astro 5.
- **Don't re-add `trailingSlash: "always"`** to `astro.config.mjs` — it makes the dev server 404 on file-extension endpoints (`/llms.txt`, `/cases.json`, `/rss.xml`). Production hosts handle trailing-slash normalization fine.
- **Prefer content edits over layout rewrites.** The scaffold is intentionally minimal and iterable.

## Deferred work (Phase 2+ / backlog)

- MCP server exposing case files (tools: `list_cases`, `get_case`, `search_cases`)
- **OpenGraph / Article `image` per case** (dynamic generation via Satori, Vercel OG, or pre-built static per case). Currently missing → site is not eligible for Google Article rich results until we add this.
- **TL;DR / 40-60-word answer** as a new section 0 at the top of each case. Improves pull-quote extraction by ChatGPT / Perplexity.
- **Author profile `sameAs` expansion** — the current page lists GitHub only. Add LinkedIn, X, YouTube, etc. as Sven's presences grow, to strengthen the entity graph further.
- Controlled vocabulary for `validation_mode` / `problem_type` (switch from free slug to enum once vocabulary stabilizes)
- **IndexNow notification automated on publish** — currently manual (see above). Wire into a GitHub Action post-deploy or a Vercel deploy hook.
- `astro check` in CI — requires adding `@astrojs/check` + `typescript` deps ; not critical since Zod covers content invariants.
