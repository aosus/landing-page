# AGENTS.md

- Use `pnpm dev` for local work; it runs `tsx scripts/sync-content-assets.ts` first, then `next dev` on port `25211` by default.
- Use `pnpm build` to verify changes; this repo is a static export (`output: 'export'`), so `pnpm start` serves the generated `out/` directory, not a long-running Next server.
- There is no repo-local `lint` or `test` script in `package.json`.
- The app router lives in `src/app`; shared markdown/content logic lives in `src/lib/markdown.ts`.
- Locale routing is split between Arabic and English: `/` is Arabic, `/en` is English.
- Blog posts live under `content/blog/<slug>/` with `index.ar.md` and `index.en.md`; keep images next to the post file.
- Build-time asset sync copies non-markdown files from `content/blog` to `public/content/blog`; do not edit generated files under `public/content/blog` by hand.
- WordPress imports come from `pnpm import:wordpress`; image processing helpers are in `scripts/optimize-images.ts`.
- `src/app/layout.tsx` sets `lang`, `dir`, and theme on the client from the current pathname and `localStorage`.
