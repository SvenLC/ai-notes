import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/api/health", async () => ({ status: "ok" }));

const port = Number(process.env.PORT ?? 4000);
const host = "0.0.0.0";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
