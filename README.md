# CMS Marketing Platform

> A high-performance, CMS-driven SaaS marketing platform built with Next.js 16 (App Router), Sanity v3, and Tailwind CSS v4.

This repository contains a production-ready web application designed for maximum performance, technical SEO, and editor empowerment. Unlike traditional static sites, this platform relies entirely on real-time content delivery connected natively to Sanity Studio.

## 📖 Core Documentation

We maintain detailed, standalone documents covering specific aspects of the platform. Please refer to these for deep dives:

- **[Features & Highlights](FEATURES.md)**: A non-technical overview of the platform's key capabilities, including its modular block architecture, live editing workflows, type-safe analytics, and exceptional Lighthouse scores (LCP ~1.6s, CLS 0).
- **[Architecture Overview](ARCHITECTURE.md)**: A technical deep dive into the stack decisions, Core Web Vitals targets, lazy-loading strategies, image pipelines, font loading logic, and SEO architecture.

## 📁 Repository Structure

The project is structured as a robust **pnpm workspace monorepo**, ensuring clean dependency isolation and shared tooling configuration:

```
cms-marketing-platform/
├── apps/
│   ├── web/          # The Next.js 16 front-end application
│   └── studio/       # The Sanity v3 CMS Studio for content editors
├── packages/
│   └── config/       # Shared TypeScript & Tailwind configuration parameters
├── biome.json        # Unified formatting and linting rules
└── pnpm-workspace.yaml
```

Inside the `apps/web/src` directory, you'll also find module-specific READMEs detailing the roles of individual directories:
- `components/blocks/` - Documentation on the modular block rendering engine.
- `components/shared/` - Documentation on layout and global UI components.
- `sanity/` - Documentation on our data fetching, SWR caching, and generated types.
- `lib/` - Documentation on our type-safe Google Tag Manager analytics abstractions.

## 🚀 Quick Start

To spin up both the front-end marketing site and the Sanity Studio simultaneously for local development:

```bash
# 1. Install dependencies aggressively across the workspace
pnpm install

# 2. Start the development servers concurrently
# Runs `next dev --turbopack` and `sanity dev` side-by-side
pnpm run dev
```

Once running:
- The Next.js web app is available at `http://localhost:3000`
- The Sanity Studio is available at `http://localhost:3333`

> **Note**: To utilize the Live Visual Editing preview mode, you must launch the Next.js site and navigate through the Sanity Studio Presentation tool.
