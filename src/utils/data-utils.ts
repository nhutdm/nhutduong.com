import { type CollectionEntry } from "astro:content";

export function sortItemsByDateDesc(
  itemA: CollectionEntry<"blog">,
  itemB: CollectionEntry<"blog">,
) {
  return (
    new Date(itemB.data.publishDate).getTime() -
    new Date(itemA.data.publishDate).getTime()
  );
}
