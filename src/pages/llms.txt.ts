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
    "> Bibliothèque ouverte de cas réels de collaboration humain-IA. Chaque case file documente où l'IA aide, se trompe, et ce qui n'est pas déléguable, au format en 9 points.",
    "",
    "Double lisibilité : le site est conçu pour être consommé par des humains ET par des agents. Endpoints utiles ci-dessous.",
    "",
    "## Case files",
    ...entries.map(
      (entry) => `- [${entry.data.title}](${base}/cases/${entry.slug}/): ${entry.data.summary}`,
    ),
    "",
    "## Endpoints agents",
    `- [Index JSON de tous les cas](${base}/cases.json): liste complète avec frontmatter typé`,
    `- [Version full-text](${base}/llms-full.txt): tous les case files inlinés en Markdown`,
    `- [RSS](${base}/rss.xml): flux standard`,
    "",
    "## Méta",
    `- [À propos](${base}/about/): principe éditorial et lisibilité machine`,
    "- [Schéma des métadonnées](https://github.com/SvenLC/ai-notes/blob/main/docs/metadata-schema.md): structure du frontmatter",
    "- [Conventions éditoriales](https://github.com/SvenLC/ai-notes/blob/main/docs/editorial.md): critères de publication et voix du modèle",
    "- [Anonymisation](https://github.com/SvenLC/ai-notes/blob/main/docs/anonymization.md): règles de masquage des tierces parties",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
