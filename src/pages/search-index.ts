import { sortItemsByDateDesc } from '@/utils/data-utils';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);

  const index = posts.map((post) => {
    const plainBody = (post.body ?? '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]*`/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#*_>~|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      id: post.id,
      title: post.data.title,
      excerpt: post.data.excerpt ?? '',
      tags: post.data.tags ?? [],
      publishDate: post.data.publishDate.toISOString(),
      url: `/blog/${post.id}/`,
      body: plainBody.slice(0, 2000),
    };
  });

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
