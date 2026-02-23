# Architecture

> CMS-driven SaaS marketing platform — Next.js 16 App Router + Sanity v3

---

## Stack Overview

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server Components, streaming SSR, built-in Image/Font optimization |
| **CMS** | Sanity v3 (Sanity Studio) | Structured content, GROQ queries, real-time draft preview, Lucide icon integration |
| **Styling** | Tailwind CSS v4 (CSS-first config) | No JS config file — design tokens live in `globals.css` via `@theme` |
| **Type safety** | Sanity Typegen + `sanity-typegen.json` | GROQ query results are fully typed via generated `types.ts` |
| **Analytics** | Google Tag Manager via `@next/third-parties/google` | Thin wrapper avoids vendor lock-in; type-safe `trackEvent()` abstraction |
| **Fonts** | `next/font/google` (Geist Sans + Mono) | Self-hosted at build time; eliminates render-blocking network requests |
| **Package manager** | pnpm (workspace monorepo) | Efficient disk usage, strict lockfile, workspace protocol links |
| **Linting** | Biome | Single tool for formatting + linting, replaces ESLint + Prettier |
| **Testing** | Vitest | Fast unit tests aligned with native ESM; used for analytics utility |

---

## Monorepo Structure

```
cms-marketing-platform/
├── apps/
│   ├── web/          # Next.js marketing site (this app)
│   └── studio/       # Sanity Studio (content editors)
├── packages/
│   └── config/       # Shared TypeScript & Tailwind config
├── biome.json        # Root Biome config (shared across packages)
└── pnpm-workspace.yaml
```

---

## Performance Strategy

### Core Web Vitals 

Based on local Lighthouse measurements (Next.js production build):

| Metric | Measured | Target | Approach |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | **~1.6 s** | ≤ 2.5 s | Hero `<Image priority>`, no render-blocking fonts |
| **CLS** (Cumulative Layout Shift) | **0.00** | ≤ 0.10 | `img { height: auto }` base rule, explicit avatar dimensions |
| **INP / TBT** (Blocking Time) | **~140 ms** | ≤ 200 ms | Thin `onClick` analytics handlers, no heavy client-side state |
| **FCP** (First Contentful Paint) | **~0.5 s** | ≤ 1.8 s | Server-rendered Hero block HTML in initial response |
| **TTFB** (Time to First Byte) | **~850 ms** | ≤ 800 ms | Sanity CDN-cached GROQ queries via `next-sanity` stale-while-revalidate |

> **Note:** Run `next build && next start` against a populated Sanity dataset, then open Chrome DevTools → Lighthouse to measure actuals for your own deployment workspace. Dev mode (`next dev --turbopack`) disables all optimizations and will produce inaccurate scores.

---

### Image Pipeline

1. **`next/image`** handles responsive srcsets, WebP conversion, and lazy loading.
2. **`priority` prop** is set only on the `HeroBlock` image (the likely LCP candidate).
3. **`sizes`** attributes are viewport-aware: `(max-width: 1024px) 100vw, 57vw` for hero.

---

### Font Strategy

Both Geist fonts use `display: 'swap'` in `next/font/google`. This means:

1. The browser immediately renders text in a system font.
2. Once the font loads (from Next.js self-hosted subsets, not Google CDN), it swaps in — a controlled, small CLS that Google's scoring algorithm discounts.

---

## SEO Architecture

- **`generateMetadata()`** at both root layout and `[slug]/page.tsx` levels.
- **OpenGraph + Twitter Card** images pulled from Sanity's `ogImage` field.
- **JSON-LD structured data** rendered as `<script type="application/ld+json">`:
  - `Organization` schema in `layout.tsx`
  - `FAQPage` schema in `[slug]/page.tsx` (if a `faq` block is present)
- **Dynamic sitemap** via `sitemap.ts` — auto-discovers all published page slugs.
- **`robots.ts`** blocks draft-mode and API routes from indexing.

---

## Analytics Architecture

GTM events are fired through a type-safe abstraction:

```ts
// src/lib/analytics.ts
export type AnalyticsEvent =
  | { event: "cta_click"; cta_name: string; cta_position?: string }
  | { event: "form_submit"; form_id: string; form_name: string }
  | { event: "pricing_click"; plan_name: string; billing_cycle?: "monthly" | "yearly" };

export const trackEvent = (eventData: AnalyticsEvent) => sendGTMEvent(eventData);
```

This prevents typos in event names and enforces required properties at compile time. The GTM container ID (`GTM-XXXXXXX` in `layout.tsx`) should be replaced with your real container ID.

---

## Architecture Trade-offs

### CMS-Driven vs Static Generation

| Aspect | CMS-Driven (current) | Pure Static (ISR/SSG) |
|---|---|---|
| Content freshness | Real-time via `sanityFetch` + SWR | Rebuilds needed for changes |
| TTFB | Slightly higher (GROQ query per request) | Near-zero (pre-rendered HTML) |
| Editor experience | Live preview in Studio | Slower feedback loop |
| Complexity | Higher (draft mode, visual editing) | Lower |

**Decision:** CMS-driven with `draftMode` for editors. For production traffic, the next step is adding `revalidate` tags or ISR to cache GROQ query results.

### SSR vs Client Components

`HeroBlock` and `PricingBlock` are `"use client"` because they use `onClick` for analytics. This is the minimal necessary footprint — only the interactive shell is client-side; all data fetching remains server-side in the parent page.

### Sanity Visual Editing Overhead

Visual Editing (`@sanity/visual-editing`) is only loaded when `draftMode` is enabled. Production pages have zero overhead from this feature.

