# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Aosus Website Mockup (artifacts/mockup-sandbox)

Multi-page website mockup for Aosus (أسس), the largest Arabic open-source community.

### Design Direction
- **Design 1 (Cyber/Terminal)** aesthetic: black background, green (#008a2f) accent borders, monospace headings, matrix rain background, corner bracket decorations on cards, terminal-style section headers (`/ Section_Name`), uppercase tracking.
- Body text uses Inter (EN) / Almarai (AR) for readability. UI chrome uses monospace.
- Brand colors: #008a2f (green primary), #1d70ba (blue secondary).

### Phase 1 (complete)
- 5 visually distinct landing page designs × 2 languages (10 total routes: /1–/5, /1-ar–/5-ar)

### Phase 2 (complete)
- 7-page multi-page site in both EN and AR (14 total routes):
  - EN: `/site`, `/site/blog`, `/site/article`, `/site/services`, `/site/writing-contest`, `/site/support-us`, `/site/contact-us`
  - AR: `/site-ar`, `/site-ar/blog`, `/site-ar/article`, `/site-ar/services`, `/site-ar/writing-contest`, `/site-ar/support-us`, `/site-ar/contact-us`
- Shared Layout with nav, footer, MatrixRain, dark/light toggle, lang toggle
- Shared components: CyberCard, SectionHeading, PrimaryButton, SecondaryButton
- Arabic AR wrapper components force `lang="ar"` prop
- Blog listing includes thumbnails per article
- Uses actual Aosus logo from `public/images/aosus-logo.png`

### Key Files
- `design-aosus/Layout.tsx` — shared layout with MatrixRain, nav, footer, CyberCard, etc.
- `design-aosus/HomePage.tsx` — homepage with hero, stats, projects, timeline, about, blog preview
- `design-aosus/BlogPage.tsx` — blog listing with thumbnails
- `design-aosus/ArticlePage.tsx` — article detail (Daydream hackathon sample)
- `design-aosus/ServicesPage.tsx` — privacy services listing
- `design-aosus/WritingContestPage.tsx` — writing contest with rules, steps, past winners
- `design-aosus/SupportPage.tsx` — donations, GitHub sponsors, referral links
- `design-aosus/ContactPage.tsx` — contact channels and social links
- `design-aosus/*Ar.tsx` — Arabic wrapper components
