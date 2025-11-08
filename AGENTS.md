# AI Agents Guide for nhutduong.com

This document provides comprehensive guidance for AI agents working with this personal portfolio website project.

## Project Overview

This is a personal portfolio website for Nhut Duong, built with Modern web technologies. The site serves as a professional showcase and blog platform.

### Tech Stack

- **Framework**: Astro 5.15.3 with MDX support
- **Styling**: Tailwind CSS v4.x with Typography plugin
- **Type Safety**: TypeScript 5.9.3
- **Code Quality**: ESLint 9.39.0, Prettier 3.6.2
- **Package Manager**: pnpm
- **Deployment**: Optimized for Cloudflare Pages

### Project Structure

```
nhutduong.com/
├── src/
│   ├── components/          # Astro components (reusable UI elements)
│   ├── content/            # MDX content collections (blog posts, pages)
│   │   ├── blog/          # Blog post content
│   │   ├── pages/         # Static page content
│   │   └── config.ts      # Content collection schemas
│   ├── data/              # Static data and configuration
│   ├── layouts/           # Page layout templates
│   ├── pages/             # Route-based pages
│   ├── styles/            # Global CSS and styling
│   └── utils/             # Utility functions
├── public/                # Static assets
└── dist/                  # Build output
```

## Key Components and Their Purposes

### Content Management

- **Content Collections**: Blog posts and pages managed through Astro's content layer
- **Schema Validation**: TypeScript schemas for content structure validation
- **MDX Support**: Rich content with React component embedding

### UI Components

- **Header.astro**: Navigation and site branding
- **Footer.astro**: Site footer with social links
- **BaseLayout.astro**: Main page layout wrapper
- **PostListItem.astro**: Blog post preview component
- **TOC.astro**: Table of Contents for long posts
- **ThemeToggle.astro**: Dark/light mode switching

### Utility Functions

- **data-utils.ts**: Content sorting and filtering
- **toc-utils.ts**: Table of Contents generation
- **common-utils.ts**: Shared helper functions
- **ui-utils.ts**: UI-specific utilities

## Development Workflow

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production (includes type checking)
pnpm preview      # Preview production build
pnpm check        # Run all quality checks
pnpm fix          # Auto-fix linting and formatting
```

### Code Quality Standards

- **ESLint**: Comprehensive linting for TypeScript and Astro
- **Prettier**: Consistent code formatting with Tailwind class sorting
- **Type Checking**: Strict TypeScript validation

### Content Management

- Blog posts go in `src/content/blog/`
- Use frontmatter with proper schema validation
- Support for tags, publish dates, and SEO metadata

## Customization Guidelines

### Adding New Blog Posts

1. Create MDX file in `src/content/blog/`
2. Include required frontmatter: title, publishDate
3. Optional fields: excerpt, tags, updatedDate, SEO metadata
4. Follow existing naming conventions

### Site Configuration

- Primary config in `src/data/site-config.ts`
- Update site metadata, social links, and giscus integration
- Hero section content customizable

### Styling Approach

- Tailwind CSS with custom configuration
- Component-based styling with utility classes
- Responsive design with mobile-first approach
- Dark mode support via CSS variables

### Adding New Components

1. Follow Astro component patterns
2. Use TypeScript for props definition
3. Implement responsive design
4. Include accessibility attributes
5. Add to appropriate directory (components/)

## Important Patterns

### Astro File Structure

- Frontmatter for data fetching and configuration
- HTML template with component composition
- Client-side scripts in `<script>` tags when needed

### Content Collection Usage

- Type-safe content access via `getCollection()`
- Schema validation for content integrity
- Automatic RSS feed generation

### Performance Considerations

- Astro's island architecture for minimal JavaScript
- Image optimization considerations
- SEO optimization built-in
- Sitemap generation included

## Deployment Notes

- Build target: `dist/` directory
- Static site generation
- Optimized for Cloudflare Pages deployment
- SEO features: sitemap, RSS, social meta tags

## Common Tasks for AI Agents

### Content Updates

- New blog post: Add to `src/content/blog/`
- Site metadata: Edit `src/data/site-config.ts`
- Add pages: Create in `src/content/pages/`

### Component Development

- Reusable UI: Add to `src/components/`
- Layout changes: Modify `src/layouts/BaseLayout.astro`
- Styling updates: Use Tailwind utility classes

### Code Quality

- Run `pnpm check` before commits
- Use `pnpm fix` for automatic formatting
- Follow ESLint configuration

## Dependencies Management

### Key Dependencies

- **Core**: Astro ecosystem with MDX and sitemap integrations
- **Styling**: Tailwind CSS with typography plugin
- **Fonts**: Inter and Newsreader variable fonts
- **Build Tools**: Vite, TypeScript, ESLint

### Adding Dependencies

- Use pnpm for package management
- Check compatibility with Astro ecosystem
- Update lock file after additions

## Authentication and Social

- Giscus integration for comments
- Social links in site configuration
- RSS feed automatically generated
- Social media meta tags for sharing

This guide should help AI agents understand the project structure, coding standards, and common patterns when working on this personal portfolio website.
