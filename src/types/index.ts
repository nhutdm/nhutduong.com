import type { CollectionEntry } from 'astro:content';

// Re-export types from site-config for centralized access
export type { Giscus, Hero, Image as SiteImage, Link as SiteLink, SocialLink } from '@/data/site-config';

// Content collection types
export type BlogPost = CollectionEntry<'blog'>;

// Component props types
export interface BaseHeadProps extends Record<string, unknown> {
  title?: string;
  description?: string;
  author?: string;
  twitter?: string;
  image?: { src: string; alt?: string };
  pageType?: 'website' | 'article';
}

export interface PostListItemProps extends Record<string, unknown> {
  post: BlogPost;
  class?: string;
  hideDate?: boolean;
  hideTags?: boolean;
}

export interface TOCProps extends Record<string, unknown> {
  headings: readonly import('astro').MarkdownHeading[];
  class?: string;
  id?: string;
}

export interface TocItem extends Record<string, unknown> {
  depth: number;
  slug: string;
  text: string;
  subheadings: TocItem[];
}

// Utility types
export type TagData = {
  name: string;
  id: string;
};
