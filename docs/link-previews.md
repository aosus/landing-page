# Link Previews

The blog renders external-link previews with local favicon caching.

## Behavior

- Standalone raw links (`https://example.com` on their own line) are replaced with a full preview card.
- Inline external links get a compact hover preview on desktop only.
- Hover previews are disabled on touch devices.
- Preview favicons are always served from this site (`/link-previews/favicons/*`).

## Build Flow

`scripts/build-link-previews.ts` runs before `pnpm dev` and `pnpm build`.

1. Scan `content/blog/**/index.*.md` for external HTTP(S) links.
2. Skip internal `aosus.org` links.
3. Fetch metadata via `open-graph-scraper`.
4. Download each favicon and cache it in `public/link-previews/favicons`.
5. Write `public/link-previews/manifest.json`.
6. Remove stale favicon files no longer referenced by the manifest.

## Safety and Reliability

- URLs are normalized before caching.
- Private/local targets are blocked before metadata and favicon fetches.
- Requests use explicit timeout and crawler user-agent.
- Entries are cached for 30 days (`expiresAt`), then refreshed.
- If a fetch fails, rendering falls back to a local default favicon.

## Rendering Pipeline

Markdown rendering happens in `src/lib/markdown.ts`:

- `remarkLinkPreviews` transforms markdown link nodes.
- `remark-html` then serializes HTML with preview markup.

Plugin source: `src/lib/remarkLinkPreviews.ts`.

## Manual Refresh

Run this when you want to refresh preview metadata on demand:

```bash
pnpm previews:refresh
```
