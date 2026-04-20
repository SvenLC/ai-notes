# Architecture

## Components

- **Web** (`apps/web`) — Next.js App Router UI.
- **API** (`apps/api`) — Fastify REST API.
- **MCP** (`apps/mcp`) — MCP server exposing the corpus to agents.
- **DB** — PostgreSQL 16. Canonical source of truth.

## Logical diagram

```text
[ Web ]
   |
   v
[ API ] ---> [ MCP ]
   |
   v
[ PostgreSQL ]
```

## Shared packages

- `@open-case-memory/schema` — Zod schemas, canonical types.
- `@open-case-memory/ui` — shared React components.
- `@open-case-memory/config` — shared runtime config.
- `@open-case-memory/prompts` — canonical prompts.

## Deployment

- Local: `docker compose up --build`.
- Production: out of scope for V1.
