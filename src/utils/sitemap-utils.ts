import { readFileSync } from "node:fs";

const blogDir = new URL("../content/blog/", import.meta.url);

function readBlogSource(slug: string): string | undefined {
  for (const ext of [".md", ".mdx"]) {
    try {
      return readFileSync(new URL(`${slug}${ext}`, blogDir), "utf-8");
    } catch {}
  }
  return undefined;
}

export function getBlogLastmod(url: string): Date | undefined {
  const match = url.match(/\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];
  if (!slug) return undefined;

  const content = readBlogSource(slug);
  if (!content) return undefined;

  const updated = content.match(/^updatedDate:\s*['"]?([\d-]{10})/m)?.[1];
  const published = content.match(/^publishDate:\s*['"]?([\d-]{10})/m)?.[1];
  const date = updated ?? published;
  return date ? new Date(date) : undefined;
}
