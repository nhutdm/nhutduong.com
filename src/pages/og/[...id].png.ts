import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { renderOGCard } from "@/components/og-card";

type OGPage = { kicker: string; title: string; dot?: boolean };

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");

  for (const { id } of posts) {
    if (/[.A-Z]/.test(id)) {
      throw new Error(`Blog id is not URL-safe for OG route: ${id}`);
    }
  }

  const date = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const pages: Record<string, OGPage> = Object.fromEntries(
    posts.map(({ data, id }) => [
      id,
      { kicker: `Essay · ${date(data.publishDate)}`, title: data.title },
    ]),
  );

  pages.default = {
    kicker: "Full Stack Developer & Consultant",
    title: "Nhut Duong",
    dot: true,
  };

  return Object.keys(pages).map((id) => ({
    params: { id },
    props: { page: pages[id] },
  }));
};

export const GET: APIRoute<{ page: OGPage }> = async ({ props }) => {
  const png = await renderOGCard(props.page);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
