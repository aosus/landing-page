# Link Previews

The blog renders link previews with local favicon caching.

## Behavior

- Standalone raw links (`https://example.com` on their own line) are replaced with a full preview card.
- Inline links get a compact hover preview on desktop only.
- Hover previews are disabled on touch devices.
- Preview favicons are always served from this site (`/link-previews/favicons/*`).

## Build Flow

`scripts/build-link-previews.ts` runs before `pnpm dev` and `pnpm build`.

1. Scan `content/blog/**/index.*.md` for HTTP(S) links.
2. Fetch metadata via `open-graph-scraper`.
3. Download each favicon and cache it in `public/link-previews/favicons`.
4. Write `public/link-previews/manifest.json`.
5. Remove stale favicon files no longer referenced by the manifest.

## Safety and Reliability

- URLs are normalized before caching.
- Private/local targets are blocked before metadata and favicon fetches.
- Requests use explicit timeout and crawler user-agent.
- Entries are cached for 30 days (`expiresAt`), then refreshed.
- If a fetch fails, rendering falls back to a local default favicon.

Previously, internal `aosus.org` URLs were excluded to reduce preview noise and avoid fetching metadata for pages we already control. That tradeoff is gone now, so all HTTP(S) links can be previewed.

## Rendering Pipeline

Markdown rendering happens in `src/lib/markdown.ts`:

- `remarkLinkPreviews` transforms markdown link nodes.
- `remark-html` then serializes HTML with preview markup.

Plugin source: `src/lib/remarkLinkPreviews.ts`.

## Tests

```bash
npx vitest run
```

Tests cover standalone cards, inline hover, internal links, named links alone in a paragraph, and missing manifest entries.

## Known Edge Cases

- WordPress-imported posts with `wpType: "post"` are served at `/<wpId>`, not `/blog/<slug>`.
- URLs with escaped parentheses (e.g. Wikipedia `Matrix_(protocol)`) may not match manifest entries correctly and are gracefully skipped.
- The markdown regex in `build-link-previews.ts` strips trailing `)` only when unbalanced, to avoid capturing closing parens from `[text](url)` syntax.

## Manual Refresh

Run this when you want to refresh preview metadata on demand:

```bash
pnpm previews:refresh
```
