import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const cases = (await getCollection("cases", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "ai-notes",
    description:
      "Open library of real-world human-AI collaboration case files. Every case documents where the AI helps, where it fails, and what can't be delegated.",
    site: context.site,
    items: cases.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary,
      link: `/cases/${entry.slug}/`,
      categories: entry.data.domain,
    })),
    customData: "<language>en-US</language>",
  });
}
