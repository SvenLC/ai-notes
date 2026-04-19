import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("cases", ({ data }) => !data.draft);
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
};

type Props = { entry: CollectionEntry<"cases"> };

export const GET: APIRoute<Props> = async ({ props, site }) => {
  const { entry } = props;

  return new Response(
    JSON.stringify(
      {
        slug: entry.slug,
        url: new URL(`/cases/${entry.slug}/`, site).toString(),
        ...entry.data,
        date: entry.data.date.toISOString().slice(0, 10),
        body: entry.body,
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
