import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("`site` must be set in astro.config.mjs for /llms.txt");
  const entries = (await getCollection("cases", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const base = site.toString().replace(/\/$/, "");

  const lines = [
    "# ai-notes",
    "",
    "> Open library of real-world human-AI collaboration case files. Every case documents where the AI helps, where it fails, and what can't be delegated, in a 9-point format.",
    "",
    "Double readability: the site is designed to be consumed by humans AND by agents. Useful endpoints below.",
    "",
    "## Case files",
    ...entries.map(
      (entry) => `- [${entry.data.title}](${base}/cases/${entry.slug}/): ${entry.data.summary}`,
    ),
    "",
    "## Agent endpoints",
    `- [JSON index of all cases](${base}/cases.json): full list with typed frontmatter`,
    `- [Full-text version](${base}/llms-full.txt): every case inlined in Markdown`,
    `- [RSS](${base}/rss.xml): standard feed`,
    "",
    "## Meta",
    `- [About](${base}/about/): editorial principle and machine readability`,
    "- [Metadata schema](https://github.com/SvenLC/ai-notes/blob/main/docs/metadata-schema.md): frontmatter structure",
    "- [Editorial conventions](https://github.com/SvenLC/ai-notes/blob/main/docs/editorial.md): publishing criteria and model voice",
    "- [Anonymization](https://github.com/SvenLC/ai-notes/blob/main/docs/anonymization.md): rules for masking third parties",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
