# SEO Foundations

This document captures the SEO work added in the `opencode/seo-foundations` branch so future changes keep the same assumptions.

## Locale Routing

- Arabic is canonical on `/` paths.
- English is canonical on `/en` paths.
- The duplicate `src/app/(ar)/ar/*` route tree was removed instead of being kept as a fallback surface.

## Crawlability

- `src/app/robots.ts` publishes a static `robots.txt`.
- `src/app/sitemap.ts` publishes a static `sitemap.xml`.
- The sitemap includes:
  - primary marketing pages for both locales
  - Arabic article URLs
  - English article URLs when English content exists

## Metadata

- `src/lib/metadata.ts` is the shared source for page metadata.
- Marketing pages that exist in both locales opt into language alternates with `includeLanguageAlternates: true`.
- Canonicals should always point at the actual public route for that locale.

## Structured Data

- `src/app/(en)/HomePageClient.tsx` injects homepage organization and website JSON-LD.
- `src/app/(en)/blog/[slug]/ArticlePageClient.tsx` injects breadcrumb and article JSON-LD.
- JSON-LD must be serialized safely before passing it to `dangerouslySetInnerHTML`.

## English Content Rules

- `/en` should only surface English posts.
- `/en/blog` should not silently show Arabic posts as fallback content.
- When English translations are missing, the English blog explains that untranslated posts are only available on the Arabic blog.

## Social Links

- Use `getSocialPlatforms(lang)` when a page needs locale-aware social links.
- The RSS item is locale-aware and points to `/rss.xml` for Arabic and `/en/rss.xml` for English.
- `SOCIAL_PLATFORMS_AR` exists only as an explicit Arabic fallback list for code that truly wants a fixed Arabic export.

## Validation

Before shipping SEO-related changes, run:

```bash
npm test
npm run build
```
