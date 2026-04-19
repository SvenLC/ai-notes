import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection("cases", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const cases = entries.map((entry) => ({
    slug: entry.slug,
    url: new URL(`/cases/${entry.slug}/`, site).toString(),
    json_url: new URL(`/cases/${entry.slug}.json`, site).toString(),
    ...entry.data,
    date: entry.data.date.toISOString().slice(0, 10),
  }));

  return new Response(
    JSON.stringify(
      {
        site: site?.toString(),
        generated_at: new Date().toISOString(),
        count: cases.length,
        cases,
      },
      null,
      2,
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    },
  );
};
