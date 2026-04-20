const port = Number(process.env.PORT ?? 4100);
const apiBaseUrl = process.env.API_BASE_URL ?? "http://api:4000";

console.log(`[mcp] stub server starting on port ${port}`);
console.log(`[mcp] api base url: ${apiBaseUrl}`);

setInterval(() => {}, 1 << 30);
