# nhutduong.com

Personal site built with [Astro](https://astro.build) — static output, TypeScript (strict preset), deployed to Cloudflare Workers static assets.

Personal site of Nhut Duong — full stack developer and consultant. Built with [Astro](https://astro.build) — static output, TypeScript (strict preset), deployed to Cloudflare Workers static assets. `DESIGN.md` is the design system spec; the live token layer is `src/styles/global.css`.

## Tech Stack

- [Astro](https://astro.build) ^7.3 (static output, zero-JS) — MDX, sitemap, full-content RSS, Fonts API (self-hosted DM Sans + Source Serif 4 + IBM Plex Mono via the Fontsource provider), OpenGraph cards rendered at build time (satori + @resvg/resvg-js, fonts vendored in-repo)
- [Tailwind CSS](https://tailwindcss.com) v4 via the `@tailwindcss/vite` plugin (+ `@tailwindcss/typography`; design tokens in `src/styles/global.css`)
- [Biome](https://biomejs.dev) 2.x for linting and formatting (incl. `.astro` files)
- TypeScript with the `astro/tsconfigs/strict` preset
- Deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/) as static assets (Wrangler, worker `nhutduong-com`)

Content: Markdown blog (`src/content/blog`) + MDX pages (`src/content/pages`), validated by Zod schemas in `src/content.config.ts`.

Note: builds fetch Fontsource fonts on a cold cache (`.astro/fonts` / `node_modules/.astro/fonts`) — network access is needed for the first build; the OG-card fonts are vendored in-repo (`src/assets/og-fonts/`) and need no network.

## Prerequisites

- Node.js `>= 22.12.0`
- npm

## Project Structure

```text
/
├── public/            # Static assets (favicons, manifest, robots.txt, _redirects)
├── src/
│   ├── assets/        # Optimizable imports (avatar.webp, vendored OG fonts)
│   ├── components/    # Astro components (Breadcrumbs, TOC, Masthead, Footer, ...)
│   ├── content/       # Content collections (blog/*.md, pages/*.mdx)
│   ├── content.config.ts  # Collection schemas (Zod via astro/zod)
│   ├── data/          # site-config.ts (nav, social, image)
│   ├── layouts/       # BaseLayout.astro (head, JSON-LD, breadcrumbs, view transitions)
│   ├── lib/           # cn() helper
│   ├── pages/         # File-based routes (index, pages catch-all, blog/, tags/, og/, rss.xml, 404)
│   ├── styles/
│   │   └── global.css # Tailwind v4 entry: Signal tokens, @theme inline fonts, prose overrides
│   ├── types/         # Shared types
│   └── utils/         # data, schema (JSON-LD), breadcrumb, toc, sitemap helpers
├── astro.config.mjs   # Astro configuration (site, fonts, mdx/sitemap integrations, tailwind vite)
├── biome.json         # Biome lint/format configuration
├── tsconfig.json      # Extends astro/tsconfigs/strict, @/* path alias
├── wrangler.jsonc     # Cloudflare Workers static assets config (serves ./dist)
└── dist/              # Build output (generated)
```

## Commands

All commands are run from the root of the project:

| Command           | Action                                            |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Installs dependencies                             |
| `npm run dev`     | Starts local dev server at `localhost:4321`       |
| `npm run build`   | Builds the production site to `./dist/`           |
| `npm run preview` | Previews the build locally                        |
| `npm run check`   | Lints + formats (Biome, applies safe fixes)       |
| `npm run ci`      | Full gate: `biome ci && astro check && astro build` |

## Deployment

Deploy is manual and owner-run: `npm run build && npx wrangler deploy`. The site deploys to Cloudflare Workers static assets, configured in `wrangler.jsonc`:

- `assets.directory` points at the Astro build output (`./dist`) — always run `npm run build` first.
- `assets.not_found_handling: "404-page"` serves the built `404.html` for unknown routes.
- `public/_redirects` carries 12 × 301 redirects (honored by Workers static assets).
- Worker name is `nhutduong-com`.

## Learn More

- [Astro documentation](https://docs.astro.build)
- [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
