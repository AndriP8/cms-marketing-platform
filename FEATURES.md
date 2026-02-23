# Portfolio Features & Highlights

This repository contains a production-ready, CMS-driven SaaS marketing platform. Built from the ground up to emphasize performance, developer experience, and editor empowerment, this project serves as a showcase of modern web development practices.

## 🌟 Key Capabilities

### 1. CMS-Driven Dynamic Routing
At its core, the platform uses **Next.js 16 App Router** integrated seamlessly with **Sanity v3**. Page generation is entirely dynamic and content-driven, fetching routes and structural data via powerful GROQ queries.

### 2. Modular Block Architecture
The UI is constructed using a robust `BlockRenderer` component. Rather than hardcoding page layouts, the editor defines sections (e.g., Hero, Features, Testimonials, Pricing, FAQ) in the Sanity Studio. The frontend then dynamically maps these schema types to their respective React components, providing unparalleled flexibility while maintaining type safety.

### 3. State-of-the-Art Editor Experience
Empowering content creators was a primary goal:
- **Real-time Live Previews**: Utilizing `@sanity/visual-editing` and Next.js Draft Mode, editors can see their changes immediately on the actual site layout before publishing.
- **Rich Content Management**: Customized studio schemas, including `sanity-plugin-lucide-icon-picker` for intuitive icon selection directly within the CMS.

### 4. Advanced Technical SEO
The platform implements technical SEO best practices to ensure maximum visibility:
- **Dynamic Metadata**: Utilization of Next.js `generateMetadata()` for both root layouts and dynamic slugs.
- **Structured Data**: JSON-LD scripts for `Organization` and `FAQPage` schemas are automatically injected based on the page's block composition.
- **Sitemap & Robots**: A dynamic, auto-discovering sitemap (`sitemap.ts`) and configured `robots.txt` that correctly handles draft mode paths.

### 5. Type-Safe Event Tracking
Analytics are handled through a strictly typed Google Tag Manager (GTM) abstraction layer (`@next/third-parties/google`). Event trackers like `trackEvent()` enforce required fields at compile time (e.g., CTA clicks, form submissions), eliminating silent tracking failures caused by typos.

### 6. Relentless Performance Optimization
The architecture is designed to score near 100 on Lighthouse out of the box. Recent measurements demonstrate excellent Core Web Vitals:
- **LCP (Largest Contentful Paint)**: ~1.6s
- **FCP (First Contentful Paint)**: ~0.5s
- **CLS (Cumulative Layout Shift)**: 0
- **TBT (Total Blocking Time)**: ~140ms

**How it's achieved:**
- Self-hosted Next.js fonts (`next/font`) to eliminate render-blocking network requests.

### 7. End-to-End Type Safety
By integrating **Sanity Typegen**, every GROQ query result is statically typed. Content schemas and frontend components perfectly align without manual TypeScript interface maintenance, drastically reducing runtime undefined errors.

### 8. Modern Developer Tooling Ecosystem
- **Styling**: Tailwind CSS v4 using a modern, CSS-first configuration strategy with design tokens.
- **Monorepo**: Structured as a `pnpm` workspace for strict dependency management and efficient disk usage.
- **Code Quality**: **Biome** replaces ESLint and Prettier for blazing-fast, unified formatting and linting.
- **Testing**: **Vitest** configured for fast, native ESM unit testing.
