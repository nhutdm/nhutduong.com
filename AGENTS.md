# AGENTS.md - Project Documentation Guide

This document serves as a comprehensive guide for AI agents working on the nhutduong.com project. It provides essential information about the project structure, technologies, patterns, and best practices.

## Project Overview

**nhutduong.com** is a personal portfolio website built as a modern static site blog. It showcases the work and thoughts of Nhut Duong, a full-stack developer and consultant based in Ho Chi Minh City, Vietnam.

### Key Features

- Personal portfolio with blog functionality
- Responsive design with dark/light theme support
- SEO-optimized with proper meta tags and structured data
- RSS feed for blog posts
- Tag-based content organization
- Table of contents for blog posts
- Social media integration
- Comments via Giscus

## Technology Stack

### Core Framework

- **Astro 5.16.5** - Modern static site generator with island architecture
- **TypeScript** - Type-safe development
- **React 19.2.3** - For interactive components

### Styling & UI

- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Tailwind Typography** - Beautiful typography for content
- **shadcn/ui** - Component library built on Radix UI
- **CSS Variables** - Theme system with dark/light support

### Content Management

- **MDX Support** - Rich content with React components
- **Content Collections** - Type-safe content management
- **File-based routing** - Intuitive page structure

### Development Tools

- **ESLint** - Code linting with TypeScript and Astro support
- **Prettier** - Code formatting with Tailwind class sorting
- **pnpm** - Package manager

### Deployment & Integration

- **Cloudflare Pages** - Hosting and deployment
- **RSS Feed** - Blog syndication
- **Sitemap** - SEO optimization
- **OG Image Generation** - Social media previews

## Project Structure

```
nhutduong.com/
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   └── *.astro        # Astro components
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog posts
│   │   └── pages/         # Static pages
│   ├── data/              # Site configuration
│   ├── icons/             # Icon components
│   ├── layouts/           # Page layouts
│   ├── lib/               # Utility libraries
│   ├── pages/             # File-based routing
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── astro.config.mjs       # Astro configuration
├── components.json         # shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies
├── tailwind.config.mjs    # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── .prettierrc.mjs        # Prettier configuration
```

## Development Commands

### Core Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (includes type checking)
- `pnpm preview` - Preview production build
- `pnpm astro` - Run Astro CLI commands

### Code Quality

- `pnpm check` - Run all checks (Astro, ESLint, Prettier)
- `pnpm check:astro` - Run Astro type checking
- `pnpm check:eslint` - Run ESLint
- `pnpm check:prettier` - Check Prettier formatting
- `pnpm fix` - Auto-fix code issues (ESLint + Prettier)
- `pnpm fix:eslint` - Auto-fix ESLint issues
- `pnpm fix:prettier` - Format code with Prettier

## Code Style & Standards

### TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` → `./src/*`
- React JSX support with `react-jsx` transform

### ESLint Rules

- TypeScript strict mode
- Astro-specific linting
- Unused variables with `_` prefix allowed
- No non-null assertion warnings disabled

### Prettier Configuration

- Print width: 120 characters
- Single quotes
- 2-space indentation
- Trailing commas: ES5
- Tailwind class sorting
- Import organization

### File Naming Conventions

- Components: PascalCase (e.g., `Header.astro`, `PostListItem.astro`)
- Utilities: kebab-case (e.g., `common-utils.ts`, `data-utils.ts`)
- Pages: kebab-case with brackets for dynamic routes (e.g., `[...page].astro`)
- Content: kebab-case (e.g., `blog-post-title.md`)

## Core Architecture

### Component Architecture

- **Astro Components** (`.astro`) - Server-side rendered with zero JS by default
- **React Components** (`.tsx`) - For interactive UI elements
- **UI Components** - shadcn/ui components in `src/components/ui/`
- **Layout Components** - Page structure and common elements

### Content Management

- **Content Collections** - Type-safe content in `src/content/`
- **Blog Posts** - Markdown/MDX with frontmatter validation
- **Static Pages** - MDX files for about pages, etc.
- **Data Validation** - Zod schemas for content validation

### Routing Structure

- **File-based Routing** - Pages in `src/pages/` become routes
- **Dynamic Routes** - Bracket notation for parameters
- **Pagination** - Built-in Astro pagination for blog listings
- **API Routes** - For RSS feed and OG image generation

### Styling System

- **CSS Variables** - Theme system with light/dark variants
- **Tailwind Utilities** - Consistent design system
- **Typography Plugin** - Beautiful content styling
- **Component Variants** - Using class-variance-authority

## Key Patterns & Utilities

### Utility Functions

- `slugify()` - URL-friendly string conversion
- `cn()` - Tailwind class merging (clsx + tailwind-merge)
- `sortItemsByDateDesc()` - Blog post sorting
- `getAllTags()` - Tag extraction and processing
- `getPostsByTag()` - Tag-based filtering
- `generateToc()` - Table of contents generation

### Component Patterns

- **Props Interface** - TypeScript interfaces for all component props
- **Default Exports** - Consistent export patterns
- **Class Composition** - Using `cn()` for conditional classes
- **Responsive Design** - Mobile-first approach with Tailwind

### Content Patterns

- **Frontmatter Schema** - Zod validation for content metadata
- **SEO Metadata** - Structured data for search engines
- **Image Optimization** - Sharp for image processing
- **Content Collections** - Type-safe content access

## Mode-Specific Guidelines

### Code Mode Development

- Focus on implementing features and fixing bugs
- Follow established patterns and conventions
- Use TypeScript strictly
- Test in development server before committing
- Run `pnpm check` before creating pull requests

### Debug Mode Troubleshooting

- Check browser console for errors
- Verify Astro build output
- Test content collection schemas
- Validate Tailwind class usage
- Check network requests for API endpoints

### Ask Mode Documentation

- Explain technical concepts clearly
- Provide code examples when relevant
- Reference specific files and line numbers
- Include context for architectural decisions
- Use proper terminology

### Architect Mode Planning

- Consider performance implications
- Maintain SEO best practices
- Plan for content scalability
- Ensure responsive design
- Follow accessibility guidelines

## Important Files & Their Purposes

### Configuration Files

- [`astro.config.mjs`](astro.config.mjs) - Astro framework configuration
- [`tailwind.config.mjs`](tailwind.config.mjs) - Tailwind CSS configuration
- [`tsconfig.json`](tsconfig.json) - TypeScript configuration
- [`eslint.config.js`](eslint.config.js) - Linting rules
- [`.prettierrc.mjs`](.prettierrc.mjs) - Code formatting rules

### Core Application Files

- [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) - Main page layout
- [`src/data/site-config.ts`](src/data/site-config.ts) - Site configuration
- [`src/content/config.ts`](src/content/config.ts) - Content collection schemas
- [`src/types/index.ts`](src/types/index.ts) - TypeScript type definitions

### Utility Libraries

- [`src/lib/utils.ts`](src/lib/utils.ts) - Core utility functions
- [`src/utils/common-utils.ts`](src/utils/common-utils.ts) - Common utilities
- [`src/utils/data-utils.ts`](src/utils/data-utils.ts) - Data processing utilities
- [`src/utils/toc-utils.ts`](src/utils/toc-utils.ts) - Table of contents utilities

## Development Workflow

1. **Setup**: Run `pnpm install` to install dependencies
2. **Development**: Use `pnpm dev` to start the development server
3. **Content**: Add blog posts to `src/content/blog/`
4. **Components**: Create reusable components in `src/components/`
5. **Styling**: Use Tailwind classes and CSS variables
6. **Quality**: Run `pnpm check` before committing
7. **Build**: Use `pnpm build` to create production bundle
8. **Deploy**: Deploy to Cloudflare Pages

## Best Practices

### Performance

- Optimize images with Sharp
- Use Astro's island architecture for interactivity
- Minimize JavaScript bundle size
- Leverage static site generation

### SEO

- Use semantic HTML structure
- Include proper meta tags
- Generate XML sitemaps
- Implement structured data

### Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

### Security

- Validate all user inputs
- Use HTTPS in production
- Implement CSP headers
- Keep dependencies updated

## Common Tasks

### Adding a Blog Post

1. Create `.md` or `.mdx` file in `src/content/blog/`
2. Add frontmatter with title, date, and tags
3. Write content in Markdown/MDX
4. Test in development server

### Creating a Component

1. Create `.astro` or `.tsx` file in `src/components/`
2. Define TypeScript interface for props
3. Implement component logic
4. Export as default
5. Add to component library if reusable

### Updating Site Configuration

1. Edit `src/data/site-config.ts`
2. Update relevant properties
3. Test changes in development
4. Update related components if needed

### Adding New Routes

1. Create `.astro` file in `src/pages/`
2. Use bracket notation for dynamic routes
3. Implement `getStaticPaths()` if needed
4. Test routing functionality

## Troubleshooting Common Issues

### Build Errors

- Check TypeScript types in `tsconfig.json`
- Verify content collection schemas
- Ensure all imports are correct
- Run `pnpm check` for detailed errors

### Styling Issues

- Verify Tailwind class names
- Check CSS variable usage
- Ensure proper component structure
- Test in different viewport sizes

### Content Issues

- Validate frontmatter schema
- Check file naming conventions
- Verify content collection configuration
- Test content rendering

This documentation should serve as a comprehensive guide for any AI agent working on this project. For mode-specific guidance, refer to the individual AGENTS.md files in their respective contexts.
