import type { TocItem } from '@/types';
import type { MarkdownHeading } from 'astro';

/**
 * Recursively dives into nested headings to find the target level
 * @param item - Current TOC item
 * @param depth - Remaining depth to dive
 * @returns Array of subheadings at target depth
 */
function diveChildren(item: TocItem, depth: number): TocItem[] {
  if (depth === 1 || !item.subheadings.length) {
    return item.subheadings;
  }
  return diveChildren(item.subheadings[item.subheadings.length - 1] as TocItem, depth - 1);
}

/**
 * Generates a table of contents structure from markdown headings
 * @param headings - Array of markdown headings
 * @returns Nested TOC structure
 * @throws Error when orphan heading is detected
 */
export function generateToc(headings: readonly MarkdownHeading[]): TocItem[] {
  const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
  const toc: TocItem[] = [];

  bodyHeadings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] };

    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      const lastItemInToc = toc[toc.length - 1]!;
      if (heading.depth < lastItemInToc.depth) {
        throw new Error(`Orphan heading found: ${heading.text}.`);
      }

      const gap = heading.depth - lastItemInToc.depth;
      const target = diveChildren(lastItemInToc, gap);
      target.push(heading);
    }
  });

  return toc;
}
