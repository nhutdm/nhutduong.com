import siteConfig from '@/data/site-config';
import type { BlogPost } from '@/types';
import type { BlogPosting, Person, SearchAction, WebPage, WebSite, WithContext } from 'schema-dts';

/**
 * Creates a WebSite schema for the global site information
 */
export function createWebSiteSchema(url: string): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: url,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    } as SearchAction,
  };
}

/**
 * Creates a Person schema for the author information
 */
export function createPersonSchema(): WithContext<Person> {
  const socialLinks = siteConfig.socialLinks || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    jobTitle: 'Full Stack Developer and Consultant',
    worksFor: {
      '@type': 'Organization',
      name: 'Bosch Digital',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'Vietnam',
    },
    url:
      siteConfig.primaryNavLinks?.find((link) => link.href === '/about')?.href ||
      `${new URL('/', import.meta.env.origin).toString()}about`,
    sameAs: socialLinks.map((link) => link.href),
    description:
      "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, obsessed with crafting seamless, impactful digital solutions.",
    knowsAbout: [
      'Full Stack Development',
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Software Engineering',
      'Technical Consulting',
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Astro',
    ],
  };
}

/**
 * Creates a WebPage schema for generic pages
 */
export function createWebPageSchema(
  url: string,
  title: string,
  description: string,
  dateModified?: Date
): WithContext<WebPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    dateModified: dateModified?.toISOString(),
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.title,
      url: import.meta.env.site?.toString() || url,
    },
  };
}

/**
 * Creates an Article/BlogPosting schema for blog posts
 */
export function createBlogPostingSchema(
  post: BlogPost,
  url: string,
  authorSchema: WithContext<Person>
): WithContext<BlogPosting> {
  const { title, excerpt, publishDate, updatedDate, tags = [] } = post.data;

  // Ensure URL is properly formed
  const blogUrl = url.startsWith('http')
    ? url
    : new URL(url, import.meta.env.SITE_URL || 'https://nhutduong.com').toString();
  const blogBaseUrl = new URL('/blog', import.meta.env.SITE_URL || 'https://nhutduong.com').toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    url: blogUrl,
    datePublished: publishDate.toISOString(),
    dateModified: (updatedDate || publishDate).toISOString(),
    author: authorSchema,
    publisher: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    isPartOf: {
      '@type': 'Blog',
      name: `${siteConfig.title} Blog`,
      url: blogBaseUrl,
    },
    keywords: tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
  };
}
