# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: software engineers who arrive to read technical writing (git workflows, CSS techniques, engineering practice). Secondary: potential clients and employers evaluating the author's consulting credibility.

## Product Purpose

Personal site of Nhut Duong — full-stack developer and technical consultant at Bosch Digital, Ho Chi Minh City. The home page leads with technical writing; consulting credibility rides along. Success: engineers read, subscribe, and return; evaluators leave trusting the author.

## Positioning

A practitioner's site: a working consultant writing from practice — real problems solved in real work, not content marketing.

## Operating Context

Static Astro site (17 pages: home, blog index + pagination, post pages, about, privacy, terms, tags index + tag pages, 404), full-content RSS, self-hosted fonts, per-post + default OpenGraph cards rendered at build time, deployed as Cloudflare Workers static assets under nhutduong.com. Single light rendition (bone paper) — dark mode was removed by owner decision.

## Capabilities and Constraints

- Content on hand: 6 real blog posts + about/privacy/terms pages. No CMS.
- DESIGN.md (Signal) is owner-locked as the visual system.
- Owner directive for the rebuild: typography focus, minimal mindset — composition/layout of every page rebuilt from scratch inside the locked system.
- Typography-led minimalism is a binding constraint, not a mood.
- Now and Uses pages are deferred (owner decision, 2026-10-16): drafts parked until real content lands — restore the MDX from the release commit's git history, fill content, then add the nav slot in the same change.

## Brand Commitments

- Signal design system (DESIGN.md): deep navy #1c2644 / #232f55, bone #e2dcd0 / #f0ece3, muted gold #c8a870, Source Serif 4 display, DM Sans body/UI, IBM Plex Mono for metadata.
- WCAG AA body-text contrast; gold never conveys state alone on light canvas (1.92:1).

## Evidence on Hand

Six real posts (2024/2025 year reviews, git history cleanup, fork sync, iframe zoom CSS, meeting mastery), about page with real bio and dates, avatar photo (webp). No client list, testimonials, or metrics — future work must not fabricate them.

## Product Principles

1. Writing leads; the person is the byline.
2. Typography and negative space carry authority — every element must justify itself against not being there (Signal's own creed).
3. Reader-first: fast static pages, comfortable reading measure, single light bone-paper rendition.
4. Truthful only — real posts, real bio, no invented claims.

## Accessibility & Inclusion

WCAG AA (4.5:1) body text; responsive collapse below 768px; no pure black; motion minimal (transform/opacity only).
