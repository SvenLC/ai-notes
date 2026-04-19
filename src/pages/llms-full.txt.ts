import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("`site` must be set in astro.config.mjs for /llms-full.txt");
  const entries = (await getCollection("cases", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const base = site.toString().replace(/\/$/, "");

  const header = [
    "# ai-notes — corpus intégral",
    "",
    "> Bibliothèque ouverte de cas réels de collaboration humain-IA. Tous les case files inlinés en Markdown pour consommation directe par un agent.",
    "",
    `Généré : ${new Date().toISOString()}. Source canonique : ${base}/cases.json`,
    "",
    "---",
    "",
  ];

  const sections = entries.map((entry) => {
    const meta = entry.data;
    const caseUrl = `${base}/cases/${entry.slug}/`;
    const jsonUrl = `${base}/cases/${entry.slug}.json`;
    const date = meta.date.toISOString().slice(0, 10);

    return [
      `## ${meta.title}`,
      "",
      `- **slug** : \`${entry.slug}\``,
      `- **date** : ${date}`,
      `- **model** : ${meta.model}`,
      `- **human** : ${meta.human}`,
      `- **correction_level** : ${meta.correction_level}`,
      `- **anonymized** : ${meta.anonymized ? "oui" : "non"}`,
      `- **domain** : ${meta.domain.join(", ")}`,
      `- **problem_type** : ${meta.problem_type}`,
      `- **transferability** : ${meta.transferability}`,
      `- **url** : ${caseUrl}`,
      `- **json** : ${jsonUrl}`,
      "",
      `> ${meta.summary}`,
      "",
      entry.body.trim(),
      "",
      "---",
      "",
    ].join("\n");
  });

  return new Response([...header, ...sections].join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
