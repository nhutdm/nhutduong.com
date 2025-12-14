# AGENTS.code.md - Code Mode Development Guide

This document provides specific guidance for AI agents working in Code mode on the nhutduong.com project. It focuses on implementation, feature development, and code maintenance.

## Code Mode Development Principles

### Primary Focus

- Implementing new features and functionality
- Fixing bugs and resolving issues
- Refactoring existing code for better maintainability
- Adding new components and pages
- Integrating third-party services

### Development Workflow

1. **Understand Requirements**: Analyze the task and identify what needs to be built
2. **Explore Existing Code**: Use `codebase_search` to understand current implementations
3. **Plan Implementation**: Consider the project's architecture and patterns
4. **Write Code**: Follow established conventions and best practices
5. **Test Locally**: Use `pnpm dev` to verify changes work correctly
6. **Quality Check**: Run `pnpm check` before completing the task

## Component Development

### Creating New Astro Components

```astro
---
// Import statements at the top
import type { ComponentProps } from '@/types';
import { cn } from '@/lib/utils';

// Define props interface
export interface Props extends ComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'secondary';
}

// Destructure props with defaults
const { title, description, variant = 'default', class: className } = Astro.props;
---

<!-- Component markup with semantic HTML -->
<article class={cn('base-component-styles', className)}>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
  <slot />
</article>

<style>
  /* Component-specific styles if needed */
  .base-component-styles {
    /* Use CSS variables for theming */
    background-color: var(--color-card);
    border: 1px solid var(--color-border);
  }
</style>
```

### Creating React Components (Interactive)

```tsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface InteractiveComponentProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
  className?: string;
}

export function InteractiveComponent({ initialCount = 0, onCountChange, className }: InteractiveComponentProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <p>Count: {count}</p>
      <Button onClick={increment}>Increment</Button>
    </div>
  );
}
```

## Page Development

### Creating Static Pages

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import siteConfig from '@/data/site-config';

// SEO metadata
const title = 'Page Title';
const description = 'Page description for SEO';
---

<BaseLayout title={title} description={description}>
  <section>
    <h1>{title}</h1>
    <p>Page content goes here</p>
  </section>
</BaseLayout>
```

### Creating Dynamic Routes

```astro
---
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import BaseLayout from '@/layouts/BaseLayout.astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { id: post.slug },
    props: { post },
  }));
};

const { post } = Astro.props;
---

<BaseLayout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <time>{post.data.publishDate.toLocaleDateString()}</time>
    <div set:html={post.content} />
  </article>
</BaseLayout>
```

## Content Management

### Adding Blog Posts

1. Create new file in `src/content/blog/` with kebab-case naming
2. Include proper frontmatter with required fields:

```yaml
---
title: 'Your Blog Post Title'
publishDate: 2024-01-15
updatedDate: 2024-01-20 # optional
tags: ['tag1', 'tag2']
excerpt: 'Brief description for previews'
seo:
  title: 'Custom SEO title (optional)'
  description: 'Custom SEO description (optional)'
---
```

### Content Collection Schemas

When modifying content schemas in [`src/content/config.ts`](src/content/config.ts):

- Use Zod for validation
- Provide clear error messages
- Maintain backward compatibility
- Update TypeScript types accordingly

## Styling Guidelines

### Tailwind CSS Usage

- Use utility classes for most styling
- Leverage CSS variables for theme consistency
- Follow mobile-first responsive design
- Use semantic color variables: `var(--color-foreground)`, `var(--color-background)`, etc.

### Component Styling Patterns

```astro
<!-- Good: Using utility classes with CSS variables -->
<div class="bg-card text-card-foreground rounded-lg border p-4">
  <!-- Good: Using the cn utility for conditional classes -->
  <div class={cn('base-styles', isActive && 'active-styles', className)}>
    <!-- Avoid: Inline styles unless absolutely necessary -->
    <div style="color: red;"><!-- Don't do this --></div>
  </div>
</div>
```

## TypeScript Best Practices

### Type Definitions

- Define interfaces for all component props
- Use proper typing for content collections
- Leverage utility types when appropriate
- Export types from `src/types/index.ts` for reuse

### Example Type Patterns

```typescript
// Component props with inheritance
interface PostCardProps extends BaseProps {
  post: BlogPost;
  showExcerpt?: boolean;
}

// Utility types
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Content collection types
type BlogPostWithExcerpt = BlogPost & {
  data: BlogPost['data'] & {
    excerpt: string;
  };
};
```

## File Organization

### Component Structure

```
src/components/
├── ui/              # shadcn/ui components (don't modify directly)
├── Header.astro      # Layout components
├── Footer.astro
├── PostListItem.astro
└── FeatureComponent.astro  # Feature-specific components
```

### Utility Organization

```
src/utils/
├── common-utils.ts   # General utilities (slugify, etc.)
├── data-utils.ts     # Data processing utilities
└── toc-utils.ts      # Table of contents utilities
```

## Integration Patterns

### Using shadcn/ui Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Use components as designed, avoid overriding core styles
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default">Action</Button>
  </CardContent>
</Card>;
```

### Content Collection Integration

```astro
---
import { getCollection } from 'astro:content';
import { sortItemsByDateDesc, getAllTags } from '@/utils/data-utils';

// Always type the return values
const posts = await getCollection('blog');
const sortedPosts = posts.sort(sortItemsByDateDesc);
const tags = getAllTags(posts);
---
```

## Performance Considerations

### Astro Best Practices

- Use client directives sparingly (`client:load`, `client:idle`, etc.)
- Leverage static site generation
- Optimize images with Sharp
- Minimize JavaScript bundle size

### Component Optimization

```astro
<!-- Good: Static component, no JS shipped -->
<StaticComponent />

<!-- Good: Interactive component with minimal JS -->
<InteractiveComponent client:idle />

<!-- Avoid: Unnecessary client-side rendering -->
<SimpleDiv client:load> <!-- Don't do this for static content --></SimpleDiv>
```

## Error Handling

### Component Error Boundaries

```tsx
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### Content Validation

```typescript
// Validate content before rendering
export function validatePost(post: BlogPost): boolean {
  if (!post.data.title || !post.data.publishDate) {
    console.warn('Invalid post:', post.slug);
    return false;
  }
  return true;
}
```

## Testing Your Changes

### Development Server Testing

1. Start with `pnpm dev`
2. Navigate to the pages you've modified
3. Test responsive design with different viewport sizes
4. Check dark/light theme switching
5. Verify interactive elements work correctly

### Quality Assurance

```bash
# Run all checks before completing
pnpm check

# Individual checks
pnpm check:astro      # TypeScript checking
pnpm check:eslint     # Linting
pnpm check:prettier   # Formatting

# Auto-fix issues
pnpm fix
```

## Common Implementation Tasks

### Adding New Social Links

1. Update [`src/data/site-config.ts`](src/data/site-config.ts):

```typescript
socialLinks: [
  // ... existing links
  {
    text: 'Platform',
    href: 'https://platform.com/user',
    icon: 'platform' as const, // Add new icon type
  },
];
```

2. Create icon component in `src/icons/Platform.astro`
3. Update icon type in `src/data/site-config.ts`

### Implementing New Features

1. Plan the component hierarchy
2. Create reusable components first
3. Implement page-level components
4. Add content collections if needed
5. Update navigation and routing
6. Test thoroughly

### Modifying Layouts

- Be careful with changes to [`BaseLayout.astro`](src/layouts/BaseLayout.astro)
- Test all page types after modifications
- Ensure responsive design is maintained
- Check SEO metadata is properly passed through

## Code Quality Standards

### Before Submitting Changes

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Components are reusable and maintainable
- [ ] Responsive design is implemented
- [ ] Accessibility is considered
- [ ] Performance implications are evaluated
- [ ] `pnpm check` passes without errors
- [ ] Changes are tested in development server

### Code Review Checklist

- [ ] Component props are properly typed
- [ ] CSS variables are used for theming
- [ ] Utility classes follow Tailwind conventions
- [ ] Content schemas are validated
- [ ] Error handling is implemented
- [ ] SEO considerations are addressed
- [ ] Bundle size impact is minimal

This guide should help you implement features effectively while maintaining the project's high standards. Always prioritize code quality, performance, and user experience in your development work.
