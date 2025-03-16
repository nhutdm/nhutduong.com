import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');

const pages = Object.fromEntries(posts.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'id',
  pages,
  getImageOptions: (_, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      bgGradient: [[255, 255, 255]],
      border: { color: [113, 113, 122], width: 10 },
      padding: 60,
      logo: {
        path: './public/android-chrome-512x512.png',
        size: [80],
      },
      font: {
        title: {
          color: [9, 10, 11],
          size: 60,
          lineHeight: 1.25,
          families: ['Newsreader'],
          weight: 'SemiBold',
        },
      },
      fonts: ['https://cdn.jsdelivr.net/fontsource/fonts/newsreader@latest/latin-500-normal.ttf'],
    };
  },
});
