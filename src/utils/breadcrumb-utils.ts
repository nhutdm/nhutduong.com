import type { BreadcrumbItem } from '@/types';
import { slugify } from '@/utils/common-utils';
import { getCollection } from 'astro:content';

/**
 * Parse URL path and generate breadcrumb items with max 3 levels
 */
export async function generateBreadcrumbItems(path: string): Promise<BreadcrumbItem[]> {
  const items: BreadcrumbItem[] = [];

  // Remove trailing slash and split path
  const pathSegments = path.replace(/\/$/, '').split('/').filter(Boolean);

  // Always start with Home
  items.push({
    label: 'Home',
    href: '/',
    isCurrent: pathSegments.length === 0,
  });

  if (pathSegments.length === 0) {
    return items;
  }

  // Process path segments
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const isLast = i === pathSegments.length - 1;
    const prevSegment = pathSegments[i - 1];

    // Handle blog routes
    if (segment === 'blog') {
      items.push({
        label: 'Blog',
        href: isLast ? undefined : '/blog',
        isCurrent: isLast,
      });
    }
    // Handle blog post (last segment after blog)
    else if (prevSegment === 'blog' && isLast) {
      const postTitle = await getPostTitle(segment);
      items.push({
        label: postTitle || formatLabel(segment),
        href: undefined,
        isCurrent: true,
      });
    }
    // Handle tag routes
    else if (segment === 'tags') {
      items.push({
        label: 'Tags',
        href: isLast ? undefined : '/tags',
        isCurrent: isLast,
      });
    }
    // Handle specific tag (last segment after tags)
    else if (prevSegment === 'tags' && isLast) {
      const tagName = await getTagName(segment);
      items.push({
        label: tagName || formatLabel(segment),
        href: undefined,
        isCurrent: true,
      });
    }
    // Handle pagination
    else if (/^\d+$/.test(segment)) {
      items.push({
        label: `${segment}`,
        href: undefined,
        isCurrent: true,
      });
    }
    // Handle other static pages
    else {
      items.push({
        label: formatLabel(segment),
        href: isLast ? undefined : `/${pathSegments.slice(0, i + 1).join('/')}`,
        isCurrent: isLast,
      });
    }
  }

  // Limit to maximum 3 levels (Home + 2 more)
  if (items.length > 3) {
    return [
      items[0], // Home
      items[items.length - 2], // Second to last
      items[items.length - 1], // Last (current)
    ];
  }

  return items;
}

/**
 * Get post title from slug
 */
async function getPostTitle(slug: string): Promise<string | null> {
  try {
    const posts = await getCollection('blog');
    const post = posts.find((p) => p.id === slug);
    return post?.data.title || null;
  } catch {
    return null;
  }
}

/**
 * Get tag name from slug
 */
async function getTagName(slug: string): Promise<string | null> {
  try {
    const posts = await getCollection('blog');
    const tags = posts.flatMap((post) => post.data.tags || []).map((tag) => ({ id: slugify(tag), name: tag }));

    const tag = tags.find((t) => t.id === slug);
    return tag?.name || null;
  } catch {
    return null;
  }
}

/**
 * Format URL segment into human-readable label
 */
function formatLabel(segment: string): string {
  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if breadcrumbs should be shown for a given path
 */
export function shouldShowBreadcrumbs(path: string): boolean {
  // Don't show on homepage
  if (path === '/' || path === '') {
    return false;
  }

  // Show on all other pages
  return true;
}

/**
 * Generate structured data for SEO
 */
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href || undefined,
    })),
  };
}
