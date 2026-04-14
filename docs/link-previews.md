# Link Previews

Standalone external links in blog posts get hover previews on desktop.

## Flow

1. `scripts/build-link-previews.ts` scans markdown for external URLs.
2. It fetches Open Graph metadata at build time.
3. Favicons are downloaded into `public/link-previews/favicons`.
4. Preview metadata is written to `public/link-previews/manifest.json`.
5. `src/lib/markdown.ts` normalizes standalone URLs and passes content through `remarkLinkPreviews`.
6. `src/lib/remarkLinkPreviews.ts` replaces standalone link paragraphs with a wrapped link and a desktop-only hover card.

## Rules

- Only standalone links are enhanced.
- Mobile never shows the preview.
- Favicons are served locally.
- If metadata is missing, the link stays normal.

## Build

The preview cache is regenerated during `pnpm dev` and `pnpm build`.
