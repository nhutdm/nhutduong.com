# 05 — Design System (Signal) & Assets

## DESIGN.md — Signal token spec (root, read-only source of truth)

Front matter tokens (verbatim):

- colors: primary `#1c2644` (deep navy), secondary `#232f55` (navy-alt), tertiary `#e2dcd0` (bone), neutral `#c8a870` (muted gold), surface `#f0ece3` (bone paper)
- typography: h1 = Source Serif 4 / 2.5rem / 700; body-md = Source Serif 4 / 1rem / 400 (see discrepancy below)
- spacing: sm 1.0rem, md 2.0rem, lg 4.0rem (base unit 8px; section gaps `clamp(4rem, 8vw, 8rem)`)
- components: button-primary = primary bg, neutral(gold) text, 12px padding

Prose rules (body of the doc):

- Roles: Bg `#1c2644`, Bg Alt `#232f55`, Fg `#e2dcd0`, Accent `#c8a870`, Bg Light `#f0ece3`.
- Typography: Display/hero Source Serif 4 700 (hero `clamp(2.5rem,5vw,4rem)`, H1 2.25rem, H2 1.5rem); **Body = DM Sans 400, 16px/1.6, max 72ch**; UI labels DM Sans 0.875rem/500; code IBM Plex Mono.
- Layout: CSS Grid, max-width 1280px + 1.5rem side padding; zig-zag feature rows (no 3-equal-columns); collapse < 768px; z-index contract base/sticky-nav 100/overlay 200/modal 300/toast 500.
- Motion: 200–300ms ease-out; entry fade+translateY 16px→0 over 420ms, 80ms stagger; only transform/opacity animated.
- Shapes: base radius 4px. Components: button (4px radius, hover 8% darken + lift, active −1px press), ghost button (1.5px border), cards (4px, subtle shadow, 1px stroke), inputs (label above, 2px accent focus ring offset 2px), nav (active = accent indicator, weight 500), skeletons (shimmer, no spinners).
- Do's: WCAG AA 4.5:1 body text; generous whitespace (section gaps ≥ 5rem); serif hierarchy; mobile stacking.
- Don'ts: no emojis in UI; no pure black; saturation cap 80%; no 3-col equal rows; no `h-screen` (use `min-h-[100dvh]`); no AI clichés ("Elevate", "Seamless", "Unleash", "Next-Gen"); no broken external images; no lorem ipsum.

KNOWN SPEC DISCREPANCY (documented in AGENTS.md): the front matter `body-md` says Source Serif 4 (spec-verbatim from designmd.app), but the doc's own Typography section and the implementation both use **DM Sans for body/UI**. Deliberate; the rebuild must make the same call explicitly (owner decision to confirm).

Also: DESIGN.md "Do" says fonts loaded "via Google Fonts"; the implementation self-hosts via Astro Fonts API (Fontsource) instead — see 01. AGENTS.md notes the front matter is treated as read-only/verbatim.

## Implementation in src/styles/global.css

- Light mode = bone paper canvas (`--background #f0ece3`, navy text); dark mode = navy canvas (`#1c2644`, bone text). `@custom-variant dark (&:where(.dark *))` + class strategy.
- Extra derived tokens beyond DESIGN.md's five: `--muted-foreground`, `--accent`(surface tint), `--border`, `--ring #9a7a44` (gold darkened for WCAG 3:1 on light), `--gold-hover #b8976a`, `--link` (navy light / gold dark), `--radius 0.25rem`.
- `@theme inline` exports Tailwind utilities: `bg-background/foreground/primary/muted-foreground/accent/border/ring/gold/gold-hover/navy/navy-alt/link/input` + `font-sans`/`font-serif` mapping to Fonts API vars + radius tokens.
- Base layer: border/outline defaults, cursor-pointer on buttons, heading text-wrap balance, focus-visible ring.
- `prefers-reduced-motion` guard zeroes transitions/animations.
- `.prose` overrides map typography-plugin vars to Signal tokens (quote borders gold, pre bg navy-alt, code font IBM Plex Mono; headings forced Source Serif 4 700; anchor-link styling).
- Shiki `css-variables` theme: navy-alt canvas, bone text, gold keywords/operators/tags, sage strings, per-token mapping — fully token-driven.

## Fonts (runtime)

Astro Fonts API (`astro.config.mjs`), Fontsource provider: DM Sans 100–900 var (`--font-dm-sans`), Source Serif 4 200–900 var (`--font-source-serif`), IBM Plex Mono 400 (`--font-ibm-plex-mono`). Preloaded (first two) via `<Font>` in BaseLayout with metric-matched fallbacks; downloaded at build time → cold-cache builds need network.

## public/ assets (9 files)

| File | Purpose |
| --- | --- |
| `favicon.svg` | Primary favicon (SVG). |
| `favicon.ico` | Legacy favicon fallback. |
| `apple-touch-icon.png` | iOS home-screen icon (3.7 KB). |
| `android-chrome-192x192.png` | PWA/manifest icon 192 (5.3 KB). |
| `android-chrome-512x512.png` | PWA/manifest icon 512 (17.7 KB); ALSO reused as the logo baked into every generated OG image. |
| `manifest.webmanifest` | PWA manifest: name "Nhut Duong", standalone, theme/background `#f0ece3`, the two android-chrome icons. |
| `og.png` | Default social image (46 KB), referenced by siteConfig.image. |
| `robots.txt` | Allow all + `Sitemap: https://nhutduong.com/sitemap-index.xml`. |
| `_redirects` | 12 lines of 301s: 4 renamed post slugs × (with/without trailing slash) + their OG pngs (see 03). Cloudflare Pages/Workers semantics. |

Note: robots.txt and manifest hardcode `nhutduong.com` — both must be revisited if the owner picks a different domain routing.

## Cross-cutting asset notes

- `src/assets/avatar.png` (660 KB) is served through astro:assets (gets hashed/optimized at build) but is still the largest source asset; a pre-optimized WebP/AVIF would shrink the About page.
- OG generation is network-free (vendored TTF) while runtime fonts are network-fetched at build — asymmetric but deliberate (AGENTS.md documents both).
