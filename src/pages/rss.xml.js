import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const cases = (await getCollection("cases", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "ai-notes",
    description:
      "Bibliothèque ouverte de cas réels de collaboration humain-IA. Chaque case file documente où l'IA aide, se trompe, et ce qui n'est pas déléguable.",
    site: context.site,
    items: cases.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary,
      link: `/cases/${entry.slug}/`,
      categories: entry.data.domain,
    })),
    customData: "<language>fr-FR</language>",
  });
}
