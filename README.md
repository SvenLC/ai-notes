# Open Case Memory

Open-source platform to document, publish, and serve reusable case precedents for AI agents.

A Git-friendly, schema-first, MCP-ready platform for turning conversations, workflows, and operational incidents into structured case files that both humans and agents can use.

## Status

**Scaffolding stage.** The repository currently contains only the monorepo skeleton, Docker configuration, and stub applications. Nothing runs end-to-end yet.

## Architecture

```
apps/
  web/     Next.js UI
  api/     Fastify REST API
  mcp/     MCP server
packages/
  schema/  Shared Zod schemas and types
  ui/      Shared UI components
  config/  Shared configuration
  prompts/ Canonical prompts
infra/
  docker/
  migrations/
docs/
  protocol.md
  template.md
  architecture.md
examples/
  seed-cases/
```

## Requirements

- Node.js 20+
- pnpm 10
- Docker + Docker Compose

## Quick start

```bash
cp .env.example .env
docker compose up --build
```

Once the stubs are fleshed out:

- Web: http://localhost:3000
- API: http://localhost:4000
- MCP: http://localhost:4100
- Postgres: localhost:5432

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT (see [LICENSE](./LICENSE)).
