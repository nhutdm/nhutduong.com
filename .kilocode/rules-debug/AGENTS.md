# AGENTS.debug.md - Debug Mode Troubleshooting Guide

This document provides specific guidance for AI agents working in Debug mode on the nhutduong.com project. It focuses on systematic troubleshooting, error diagnosis, and issue resolution.

## Debug Mode Methodology

### Primary Focus

- Systematic error diagnosis and resolution
- Performance issue identification
- Build and deployment troubleshooting
- Content rendering problems
- Styling and layout issues

### Debugging Workflow

1. **Identify the Problem**: Clearly understand what's not working
2. **Gather Information**: Use appropriate tools to collect diagnostic data
3. **Analyze Root Cause**: Determine the underlying issue
4. **Form Hypothesis**: Create testable theories about the problem
5. **Test Hypotheses**: Verify or eliminate potential causes
6. **Implement Solution**: Apply the appropriate fix
7. **Verify Resolution**: Ensure the problem is fully resolved

## Common Error Categories

### Build Errors

#### TypeScript Compilation Errors

**Symptoms**: Build fails with TypeScript errors during `pnpm build`

**Diagnostic Steps**:

```bash
# Run TypeScript checking specifically
pnpm check:astro

# Check for type errors in specific files
npx tsc --noEmit --skipLibCheck
```

**Common Issues and Solutions**:

- Missing type imports → Add proper imports from `@/types`
- Incorrect prop types → Check component interfaces
- Content collection type mismatches → Verify schemas in `src/content/config.ts`
- Path alias issues → Ensure `@/*` paths are correctly configured in `tsconfig.json`

#### Astro Build Errors

**Symptoms**: Astro build process fails with framework-specific errors

**Diagnostic Steps**:

```bash
# Run Astro check with verbose output
pnpm astro check --verbose

# Check for specific Astro issues
pnpm astro build --verbose
```

**Common Issues and Solutions**:

- Invalid Astro syntax → Check component frontmatter and template syntax
- Missing imports → Verify all component imports are correct
- Content collection errors → Validate frontmatter against schemas
- Route conflicts → Check for duplicate file names in `src/pages/`

### Runtime Errors

#### Client-Side JavaScript Errors

**Symptoms**: Errors in browser console, interactive components not working

**Diagnostic Steps**:

1. Open browser developer tools
2. Check Console tab for JavaScript errors
3. Examine Network tab for failed requests
4. Use Elements tab to inspect DOM issues

**Common Issues and Solutions**:

- React hydration errors → Check `client:*` directives on components
- Missing imports → Verify all client-side imports are correct
- State management issues → Check React component state initialization
- Event handler problems → Verify event binding and handler functions

#### Server-Side Rendering Errors

**Symptoms**: Pages not rendering, 500 errors, missing content

**Diagnostic Steps**:

```bash
# Check build output for SSR issues
pnpm build
pnpm preview

# Look for specific error patterns in build logs
```

**Common Issues and Solutions**:

- Content collection access errors → Verify `getCollection()` usage
- Dynamic route parameter issues → Check `getStaticPaths()` implementation
- Props passing problems → Verify prop types and default values
- Import/export mismatches → Check component export statements

### Styling Issues

#### Tailwind CSS Problems

**Symptoms**: Styles not applying, inconsistent theming, responsive issues

**Diagnostic Steps**:

1. Use browser DevTools to inspect applied styles
2. Check if Tailwind classes are being generated
3. Verify CSS variables are properly defined
4. Test different viewport sizes

**Common Issues and Solutions**:

- Missing classes → Check Tailwind configuration and build process
- CSS variable issues → Verify theme variables in `src/styles/global.css`
- Responsive design problems → Check breakpoint usage and mobile-first approach
- Dark mode issues → Verify CSS custom properties for dark theme

#### Layout and Component Issues

**Symptoms**: Broken layouts, overlapping elements, alignment problems

**Diagnostic Steps**:

1. Use browser DevTools to inspect DOM structure
2. Check CSS Grid and Flexbox implementations
3. Verify component hierarchy and nesting
4. Test with different content lengths

**Common Issues and Solutions**:

- Flexbox/Grid issues → Review container and item properties
- Component spacing → Check Tailwind spacing utilities
- Overflow problems → Verify container constraints and content sizing
- Z-index conflicts → Check stacking context and layer management

## Specific Debugging Techniques

### Content Collection Debugging

#### Schema Validation Issues

**Problem**: Content not rendering due to schema validation failures

**Diagnostic Approach**:

```typescript
// Add temporary logging to content collection loading
import { getCollection } from 'astro:content';

export async function debugContentCollections() {
  try {
    const posts = await getCollection('blog');
    console.log('Loaded posts:', posts.length);
    posts.forEach((post, index) => {
      console.log(`Post ${index}:`, post.slug, post.data.title);
    });
    return posts;
  } catch (error) {
    console.error('Content collection error:', error);
    throw error;
  }
}
```

**Common Schema Issues**:

- Required fields missing in frontmatter
- Incorrect data types (string instead of date, etc.)
- Invalid enum values
- Missing optional fields with incorrect defaults

### Performance Debugging

#### Bundle Size Analysis

**Problem**: Slow page loads, large JavaScript bundles

**Diagnostic Steps**:

```bash
# Analyze bundle size
pnpm build
# Check dist/ directory for bundle analysis

# Use Lighthouse in browser DevTools
# Analyze Performance, Accessibility, and Best Practices scores
```

**Optimization Strategies**:

- Remove unused client-side components
- Optimize image loading with Sharp
- Implement code splitting for large components
- Use `client:idle` or `client:visible` directives appropriately

#### Image Optimization Issues

**Problem**: Slow-loading images, poor quality, format issues

**Diagnostic Steps**:

1. Check network tab for image loading times
2. Verify image formats and sizes
3. Test responsive image behavior
4. Check Sharp processing in build

**Solutions**:

- Use appropriate image formats (WebP, AVIF)
- Implement responsive images with proper sizing
- Optimize image compression settings
- Use lazy loading for below-the-fold images

### SEO and Metadata Debugging

#### Meta Tag Issues

**Problem**: Poor search engine optimization, missing metadata

**Diagnostic Steps**:

1. View page source to check meta tags
2. Use browser DevTools to examine head section
3. Test with SEO analysis tools
4. Check structured data with rich results test

**Common Issues**:

- Missing or incorrect meta descriptions
- Improper Open Graph tags
- Missing structured data
- Incorrect canonical URLs

#### Sitemap and RSS Issues

**Problem**: Search engine indexing problems, feed errors

**Diagnostic Steps**:

```bash
# Test sitemap accessibility
curl https://nhutduong.com/sitemap.xml

# Test RSS feed
curl https://nhutduong.com/rss.xml

# Validate XML structure
```

## Debugging Tools and Techniques

### Browser Developer Tools

#### Console Debugging

```javascript
// Add temporary debugging logs
console.log('Component props:', props);
console.log('State value:', state);
console.error('Error details:', error);

// Performance timing
console.time('component-render');
// ... component logic
console.timeEnd('component-render');
```

#### Network Debugging

- Check failed requests and status codes
- Analyze response times and sizes
- Verify API endpoints and data formats
- Test caching behavior

### Astro-Specific Debugging

#### Build Process Debugging

```bash
# Verbose build output
pnpm build --verbose

# Check specific pages
pnpm astro build --filter "/blog/*"

# Analyze build statistics
pnpm astro build --stats
```

#### Content Collection Debugging

```astro
---
// Add debugging to page components
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
console.log('Blog posts count:', posts.length);
console.log(
  'Post data:',
  posts.map((p) => ({ slug: p.slug, title: p.data.title }))
);
---
```

### TypeScript Debugging

#### Type Checking Debugging

```bash
# Detailed type checking
npx tsc --noEmit --strict --skipLibCheck

# Check specific files
npx tsc --noEmit src/components/Header.astro

# Generate type declaration files for debugging
npx tsc --declaration --emitDeclarationOnly
```

## Error Patterns and Solutions

### Common Error Messages

#### "Cannot find module '@/components/...'"

**Cause**: Path alias resolution issue
**Solution**:

1. Verify `tsconfig.json` paths configuration
2. Check import statement syntax
3. Restart development server
4. Clear TypeScript cache

#### "Property 'X' does not exist on type 'Y'"

**Cause**: TypeScript type mismatch
**Solution**:

1. Check type definitions in `src/types/index.ts`
2. Verify component prop interfaces
3. Update content collection schemas
4. Add proper type assertions if needed

#### "Hydration failed because the initial UI does not match"

**Cause**: Server/client rendering mismatch
**Solution**:

1. Check for conditional rendering based on browser APIs
2. Verify date formatting consistency
3. Use `client:idle` for non-critical components
4. Ensure deterministic rendering

### Performance Issues

#### Slow Initial Page Load

**Diagnostic Steps**:

1. Analyze bundle size with `pnpm build`
2. Check image optimization
3. Verify CSS delivery
4. Test with Lighthouse

#### Layout Shift (CLS)

**Diagnostic Steps**:

1. Check for missing image dimensions
2. Verify font loading behavior
3. Test dynamic content insertion
4. Use browser DevTools Layout Instability tools

## Troubleshooting Checklist

### Before Starting Debugging

- [ ] Reproduce the issue consistently
- [ ] Check browser console for errors
- [ ] Verify build process completes successfully
- [ ] Test in different browsers if applicable
- [ ] Check recent changes that might be related

### During Debugging

- [ ] Use systematic approach to isolate the problem
- [ ] Document findings and hypotheses
- [ ] Test one variable at a time
- [ ] Use appropriate debugging tools
- [ ] Keep track of attempted solutions

### After Fixing Issues

- [ ] Verify the fix works in all scenarios
- [ ] Test for regression in other areas
- [ ] Update documentation if needed
- [ ] Add preventive measures if applicable
- [ ] Run full test suite if available

## Advanced Debugging Techniques

### Memory Leak Detection

```javascript
// Monitor memory usage in browser DevTools
// Take heap snapshots before and after operations
// Look for detached DOM nodes and event listeners
```

### Network Performance Analysis

```bash
# Use curl to test API endpoints
curl -w "@curl-format.txt" https://nhutduong.com/api/endpoint

# Test with different network conditions in browser DevTools
```

### Accessibility Testing

1. Use browser accessibility tools
2. Test with screen readers
3. Verify keyboard navigation
4. Check color contrast and focus indicators

This debugging guide should help you systematically identify and resolve issues in the nhutduong.com project. Always approach problems methodically and document your findings for future reference.
