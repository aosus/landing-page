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

## Aosus Website (artifacts/aosus-website)

Production website for Aosus (أسس), the largest Arabic open-source community. Migrated from Vite+React SPA to **Next.js 15** static site (`output: 'export'`).

### Stack
- **Framework**: Next.js 15 (App Router, static export)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss` + `@tailwindcss/typography`
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Content**: Markdown files with YAML front matter (gray-matter + remark)
- **Fonts**: Inter (EN), Almarai (AR)
- **Brand colors**: #008a2f (green primary), #1d70ba (blue secondary)

### Design
- Cyber/terminal aesthetic: black background, green accent borders, monospace headings, matrix rain background, corner bracket decorations on cards, terminal-style section headers (`/ Section_Name`)
- No "STATUS: ACTIVE" badges or terminal status bars
- Stats/metrics section preserved on homepage (Members 3,000+, Posts 10,000+, Topics 1,300+, Years 9)

### Bilingual Routing
- English routes: `/`, `/blog`, `/blog/[slug]`, `/services`, `/writing-contest`, `/support-us`, `/contact-us`
- Arabic routes: `/ar`, `/ar/blog`, `/ar/blog/[slug]`, `/ar/services`, `/ar/writing-contest`, `/ar/support-us`, `/ar/contact-us`
- Arabic pages import English client components and pass `lang="ar"`

### Content Pipeline
- Blog articles stored as markdown in `content/blog/{en|ar}/{slug}.md`
- Front matter: title, date, author, tags, thumbnail, excerpt
- `src/lib/markdown.ts` handles parsing and rendering
- `generateStaticParams` pre-renders all article pages at build time

### Key Files
- `src/app/layout.tsx` — root layout with global OG metadata
- `src/components/layout/Layout.tsx` — shared layout with MatrixRain, nav, footer, CyberCard, etc.
- `src/lib/markdown.ts` — markdown parsing utilities
- `src/app/(en)/HomePageClient.tsx` — homepage
- `src/app/(en)/blog/BlogPageClient.tsx` — blog listing
- `src/app/(en)/blog/[slug]/ArticlePageClient.tsx` — article detail with OG tags
- `src/app/(en)/services/ServicesPageClient.tsx` — privacy services
- `src/app/(en)/writing-contest/WritingContestPageClient.tsx` — writing contest
- `src/app/(en)/support-us/SupportPageClient.tsx` — donations
- `src/app/(en)/contact-us/ContactPageClient.tsx` — contact channels
- `content/blog/en/*.md` — English blog articles (6 posts)
- `content/blog/ar/*.md` — Arabic blog articles (6 posts)

### Commands
- `pnpm --filter @workspace/aosus-website run dev` — Next.js dev server
- `pnpm --filter @workspace/aosus-website run build` — static export to `out/`

## Aosus Website Mockup (artifacts/mockup-sandbox)

Multi-page website mockup for Aosus. Used during design phase, now superseded by the production Next.js site.
