import type { CollectionEntry } from 'astro:content';

// Re-export types from site-config for centralized access
export type { Giscus, Hero, Image as SiteImage, Link as SiteLink, SocialLink } from '@/data/site-config';

// Content collection types
export type BlogPost = CollectionEntry<'blog'>;
export type Page = CollectionEntry<'pages'>;

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

export interface ButtonProps extends Record<string, unknown> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
  href?: string;
  disabled?: boolean;
  class?: string;
}

export interface BadgeProps extends Record<string, unknown> {
  variant?: 'default';
  children?: unknown;
  class?: string;
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

export interface NavigationLink {
  text: string;
  href: string;
}

export interface ThemeToggleProps {
  class?: string;
}

export interface SocialIconProps {
  icon: 'github' | 'linkedin' | 'rss' | 'x';
  class?: string;
}

// Utility types
export type TagData = {
  name: string;
  id: string;
};

export interface HeadingProgress {
  inView: boolean;
  progress: number;
}

export interface TOCLink {
  element: HTMLAnchorElement;
  progressBar: HTMLElement;
  slug: string;
}
