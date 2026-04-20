FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/mcp/package.json ./apps/mcp/
COPY packages/schema/package.json ./packages/schema/
COPY packages/ui/package.json ./packages/ui/
COPY packages/config/package.json ./packages/config/
COPY packages/prompts/package.json ./packages/prompts/
RUN pnpm install --frozen-lockfile || pnpm install

FROM deps AS build
COPY . .
RUN pnpm --filter @open-case-memory/schema build \
 && pnpm --filter @open-case-memory/prompts build \
 && pnpm --filter @open-case-memory/mcp build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app /app
WORKDIR /app/apps/mcp
EXPOSE 4100
CMD ["pnpm", "start"]
