import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const contentDir = './src/content/blog';
const postDates = new Map();
for (const file of readdirSync(contentDir)) {
  if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
  const raw = readFileSync(join(contentDir, file), 'utf-8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  const id = file.replace(/\.(md|mdx)$/, '');
  const updated = fm[1].match(/^updatedDate:\s*(.+)$/m);
  const published = fm[1].match(/^publishDate:\s*(.+)$/m);
  const raw2 = (updated?.[1] ?? published?.[1] ?? '').trim().replace(/^['"]|['"]$/g, '');
  if (raw2) {
    const parsed = new Date(raw2);
    if (!Number.isNaN(parsed.getTime())) {
      postDates.set(id, parsed);
    }
  }
}

const blogLastmod = (urlOrPath) => {
  const path = urlOrPath.replace(/^https?:\/\/[^/]+/, '');
  const match = path.match(/^\/blog\/([^/]+)\/?$/);
  if (!match) return undefined;
  return postDates.get(match[1]);
};

// https://astro.build/config
export default defineConfig({
  site: 'https://nhutduong.com',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const lastmod = blogLastmod(item.url) ?? new Date();
        return { ...item, lastmod };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
