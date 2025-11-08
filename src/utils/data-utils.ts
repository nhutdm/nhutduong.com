import type { BlogPost, TagData } from '@/types';
import { slugify } from '@/utils/common-utils';

/**
 * Sorts blog items by publish date in descending order
 * @param itemA - First blog post
 * @param itemB - Second blog post
 * @returns Sorting result (negative if A should come after B)
 */
export function sortItemsByDateDesc(itemA: BlogPost, itemB: BlogPost): number {
  return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

/**
 * Extracts and processes all unique tags from blog posts
 * @param posts - Array of blog posts
 * @returns Array of unique tag data with name and slugged ID
 */
export function getAllTags(posts: BlogPost[]): TagData[] {
  const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];

  return tags
    .map((tag) => ({
      name: tag,
      id: slugify(tag),
    }))
    .filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
}

/**
 * Filters blog posts by a specific tag ID
 * @param posts - Array of blog posts
 * @param tagId - Tag ID to filter by (slugged)
 * @returns Array of posts matching the tag
 */
export function getPostsByTag(posts: BlogPost[], tagId: string): BlogPost[] {
  return posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
}
