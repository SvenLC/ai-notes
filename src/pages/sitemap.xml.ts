import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("`site` must be set in astro.config.mjs for /sitemap.xml");

  const cases = (await getCollection("cases", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  // Omit lastmod for static pages without a real modification date — build time would mislead crawlers.
  const entries = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/about/", changefreq: "monthly", priority: "0.6" },
    ...cases.map((entry) => ({
      path: `/cases/${entry.slug}/`,
      lastmod: entry.data.date.toISOString(),
      changefreq: "monthly" as const,
      priority: "0.9",
    })),
  ];

  const urls = entries
    .map((u) => {
      const loc = xmlEscape(new URL(u.path, site).toString());
      const lastmodLine = "lastmod" in u && u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmodLine}\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
