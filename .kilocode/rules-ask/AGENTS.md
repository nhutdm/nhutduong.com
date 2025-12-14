# AGENTS.ask.md - Ask Mode Documentation Guide

This document provides specific guidance for AI agents working in Ask mode on the nhutduong.com project. It focuses on explaining technical concepts, providing documentation, and answering questions about the codebase.

## Ask Mode Communication Principles

### Primary Focus

- Explaining technical concepts clearly and accurately
- Providing comprehensive documentation about the project
- Answering questions about code implementation and architecture
- Teaching best practices and design patterns
- Contextualizing technical decisions

### Communication Approach

1. **Be Clear and Concise**: Use simple language without unnecessary jargon
2. **Provide Context**: Explain not just "what" but "why" and "how"
3. **Use Examples**: Include code snippets and practical illustrations
4. **Reference Specific Files**: Point to exact files and line numbers when relevant
5. **Structure Information**: Organize explanations logically with headings and lists

## Project Overview for Explanations

### Core Identity

When explaining the project, always start with this context:

- **nhutduong.com** is a personal portfolio and blog website
- Built for Nhut Duong, a full-stack developer and consultant in Ho Chi Minh City, Vietnam
- Serves as both a professional portfolio and technical blog
- Demonstrates modern web development practices and technologies

### Technical Philosophy

The project embodies these principles:

- **Performance First**: Static site generation with minimal JavaScript
- **Developer Experience**: Type-safe development with excellent tooling
- **Content Focused**: MDX support with rich content capabilities
- **Modern Standards**: Latest web technologies and best practices
- **Accessibility**: Semantic HTML and inclusive design

## Explaining the Technology Stack

### Astro Framework

When explaining Astro, emphasize:

- **Static Site Generation**: Pre-builds pages for optimal performance
- **Island Architecture**: Ships zero JavaScript by default, opt-in interactivity
- **Content Collections**: Type-safe content management with Zod validation
- **File-based Routing**: Intuitive URL structure based on file organization

```astro
---
const { title, date } = Astro.props;
---

<!-- Example: Astro component with zero JS by default -->
<article>
  <h1>{title}</h1>
  <time>{date}</time>
  <slot />
  <!-- Content rendered at build time -->
</article>
```

### TypeScript Integration

Explain TypeScript usage:

- **Type Safety**: Catches errors at development time
- **Content Validation**: Zod schemas ensure data integrity
- **Component Props**: Clear interfaces for all components
- **Path Aliases**: Clean imports with `@/*` mapping

```typescript
// Example: Type-safe content collection schema
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

### Tailwind CSS System

When explaining the styling approach:

- **Utility-First**: Rapid development with consistent design
- **CSS Variables**: Theme system with light/dark variants
- **Typography Plugin**: Beautiful content styling out of the box
- **Responsive Design**: Mobile-first approach with breakpoint utilities

```css
/* Example: Theme system with CSS variables */
:root {
  --color-foreground: oklch(0.145 0 0);
  --color-background: oklch(1 0 0);
}

.dark {
  --color-foreground: oklch(0.985 0 0);
  --color-background: oklch(0.145 0 0);
}
```

## Architecture Explanations

### Component Hierarchy

When explaining the component structure:

```
BaseLayout.astro (Root Layout)
├── Header.astro (Site Navigation)
├── <main> (Content Area)
│   ├── Hero.astro (Homepage Hero)
│   ├── PostListItem.astro (Blog Post Cards)
│   └── <slot> (Page Content)
└── Footer.astro (Site Footer)
```

**Key Points**:

- Layout components provide consistent structure
- Components are reusable and composable
- Props flow down through the component tree
- Slot system allows flexible content insertion

### Content Management System

Explain the content architecture:

**Content Collections** (`src/content/`):

- **Blog Posts**: Type-safe markdown with frontmatter validation
- **Static Pages**: MDX files for about pages and other content
- **Schema Validation**: Zod ensures data consistency
- **Type Generation**: Automatic TypeScript types from schemas

**Content Flow**:

1. Author creates content in markdown/MDX
2. Astro validates against Zod schemas
3. TypeScript types are generated
4. Components access content with type safety
5. Static site generation builds final HTML

### Routing System

When explaining the routing approach:

**File-Based Routing**:

- `src/pages/index.astro` → `/` (Homepage)
- `src/pages/blog/[...page].astro` → `/blog/2` (Paginated blog)
- `src/pages/blog/[id].astro` → `/blog/post-title` (Individual posts)
- `src/pages/tags/[id]/[...page].astro` → `/tags/javascript/2` (Tag pages)

**Dynamic Routes**:

- Bracket notation `[param]` for dynamic segments
- `getStaticPaths()` for pre-rendering dynamic routes
- Pagination built into Astro's data fetching

## Code Pattern Explanations

### Utility Functions

When explaining utility patterns:

**slugify() Function** (`src/utils/common-utils.ts`):

```typescript
export function slugify(input?: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-');
}
```

**Purpose**: Converts strings to URL-friendly slugs
**Use Cases**: Tag URLs, post slugs, SEO-friendly identifiers
**Features**: Handles Unicode, removes special characters, ensures consistency

**cn() Function** (`src/lib/utils.ts`):

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Purpose**: Merges Tailwind CSS classes intelligently
**Benefits**: Conditional classes, conflict resolution, cleaner component code
**Usage**: `cn('base-class', isActive && 'active-class', className)`

### Component Patterns

When explaining component design:

**Props Interface Pattern**:

```typescript
interface ComponentProps {
  required: string;
  optional?: string;
  callback?: () => void;
  className?: string;
}
```

**Benefits**: Type safety, IDE autocompletion, clear contracts, documentation

**Default Export Pattern**:

```astro
---
// Component logic here
---

<!-- Component template -->
```

**Benefits**: Consistent imports, tree shaking, clear module boundaries

## Styling System Explanations

### Theme Architecture

When explaining the theming system:

**CSS Variables Structure**:

- **Semantic Naming**: `--color-foreground`, `--color-background`
- **Theme Variants**: Light and dark mode definitions
- **Component Colors**: `--color-primary`, `--color-secondary`
- **Utility Colors**: `--color-border`, `--color-muted`

**Theme Switching**:

```javascript
// Dark mode implementation
document.documentElement.classList.toggle('dark');
```

**Benefits**: Consistent theming, easy customization, CSS-only solution

### Tailwind Integration

Explain the Tailwind setup:

**Configuration** (`tailwind.config.mjs`):

- **Typography Plugin**: Beautiful prose styling for content
- **CSS Variables Integration**: Theme colors mapped to Tailwind
- **Custom Fonts**: Inter and Newsreader variable fonts
- **Responsive Design**: Mobile-first breakpoint system

**Usage Patterns**:

- **Utility Classes**: `p-4`, `text-lg`, `hover:bg-gray-100`
- **Responsive Modifiers**: `md:text-xl`, `lg:hidden`
- **State Variants**: `dark:bg-gray-800`, `focus:ring-2`

## Performance Optimization Explanations

### Static Site Generation

When explaining performance benefits:

**Build Process**:

1. Content collected and validated
2. Components rendered to HTML
3. Assets optimized (images, CSS, JS)
4. Static files deployed to CDN

**Benefits**:

- **Fast Loading**: Pre-built HTML, no server processing
- **SEO Friendly**: Complete HTML for search engines
- **Low Cost**: Static hosting, minimal server resources
- **High Reliability**: No database or server dependencies

### Island Architecture

Explain the interactivity model:

**Zero JavaScript by Default**:

- Static components render to HTML only
- No client-side JavaScript shipped
- Fast initial page loads

**Opt-in Interactivity**:

```astro
<!-- Static component, no JS -->
<StaticContent />

<!-- Interactive component, minimal JS -->
<InteractiveComponent client:idle />

<!-- Critical component, immediate JS -->
<CriticalComponent client:load />
```

**Client Directives**:

- `client:load`: Load immediately
- `client:idle`: Load when browser is idle
- `client:visible`: Load when component enters viewport

## Development Workflow Explanations

### Content Creation Process

When explaining how to add content:

**Blog Post Creation**:

1. Create markdown file in `src/content/blog/`
2. Add frontmatter with metadata
3. Write content in markdown/MDX
4. Automatic type checking and validation
5. Build process generates static HTML

**Frontmatter Structure**:

```yaml
---
title: "Understanding Astro's Island Architecture"
publishDate: 2024-01-15
tags: ['astro', 'performance', 'javascript']
excerpt: 'Learn how Astro ships zero JavaScript by default'
seo:
  title: 'Astro Island Architecture Guide'
  description: "Comprehensive guide to Astro's performance model"
---
```

### Component Development

When explaining component creation:

**Astro Component Structure**:

```astro
---
// 1. Imports
import type { ComponentProps } from '@/types';
import { cn } from '@/lib/utils';

// 2. Props definition
export interface Props extends ComponentProps {
  title: string;
  description?: string;
}

// 3. Logic
const { title, description, class: className } = Astro.props;
---

<!-- 4. Template -->
<article class={cn('p-4 border rounded-lg', className)}>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
  <slot />
</article>

<!-- 5. Styles (optional) -->
<style>
  article {
    background-color: var(--color-card);
  }
</style>
```

## Best Practices Explanations

### Code Organization

When explaining project structure:

**Directory Purposes**:

- `src/components/`: Reusable UI components
- `src/layouts/`: Page layout templates
- `src/pages/`: File-based routing
- `src/content/`: Content collections
- `src/utils/`: Utility functions
- `src/types/`: TypeScript type definitions

**Naming Conventions**:

- **Components**: PascalCase (`Header.astro`, `PostListItem.astro`)
- **Utilities**: kebab-case (`common-utils.ts`, `data-utils.ts`)
- **Pages**: kebab-case with brackets (`[...page].astro`)
- **Content**: kebab-case (`blog-post-title.md`)

### TypeScript Usage

When explaining type safety benefits:

**Content Collection Types**:

```typescript
// Auto-generated from schema
type BlogPost = {
  id: string;
  slug: string;
  data: {
    title: string;
    publishDate: Date;
    tags: string[];
    excerpt?: string;
  };
  content: string;
  render(): Promise<{ Content: AstroComponent }>;
};
```

**Benefits**:

- **Compile-time Errors**: Catch issues before deployment
- **IDE Support**: Autocompletion and inline documentation
- **Refactoring Safety**: Rename with confidence
- **Documentation**: Types serve as living documentation

## Common Questions and Answers

### Why Astro instead of React/Vue/etc.?

**Answer**: Astro specializes in content-focused sites with optimal performance. It generates static HTML by default and only ships JavaScript when explicitly needed. This makes it ideal for blogs, portfolios, and documentation sites where content delivery speed is crucial.

### How does the theme system work?

**Answer**: The theme uses CSS custom properties (variables) defined in `src/styles/global.css`. Light and dark themes are defined with different color values, and theme switching is achieved by toggling a `.dark` class on the root element. Tailwind CSS is configured to use these variables for consistent theming.

### What's the purpose of content collections?

**Answer**: Content collections provide type-safe content management. They validate markdown frontmatter against Zod schemas, generate TypeScript types, and provide a structured way to query content. This prevents content errors and enables autocompletion when working with content data.

### How is performance optimized?

**Answer**: Performance is optimized through:

1. **Static Site Generation**: Pre-builds all pages as HTML
2. **Image Optimization**: Uses Sharp for responsive images
3. **Minimal JavaScript**: Only ships JS for interactive components
4. **CSS Optimization**: Tailwind purges unused styles
5. **CDN Deployment**: Static files served from edge locations

This guide should help you provide comprehensive, accurate explanations about the nhutduong.com project. Always tailor your explanations to the user's technical level and specific questions.
