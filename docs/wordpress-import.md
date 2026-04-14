# WordPress Import

This repo imports published WordPress content into `content/blog`.

## What the importer does

Run `pnpm import:wordpress` to sync WordPress posts and media into local markdown files.

The importer:

- fetches published posts, media, categories, tags, and users from `https://aosus.org/wp-json/wp/v2`
- writes each imported post into a folder under `content/blog/<slug>/`
- downloads referenced WordPress upload assets next to the post files
- rewrites image URLs in markdown so local assets point at `/content/blog/...`
- stores WordPress metadata in front matter, including `wpId`, `wpType`, and `sourceUrl`

## Post routing

Imported WordPress posts use numeric public routes.

- Arabic posts render at `/[id]`
- English WordPress post routes are not generated

Regular blog content still uses `/blog/[slug]` and `/en/blog/[slug]`.

## Locale handling

Imported posts are written as a single locale file when the importer can determine a primary language.

- the importer keeps only one of `index.ar.md` or `index.en.md` for posts
- media items still keep both locale files
- the markdown loader reads the exact locale file and does not fall back to the other locale

## Route changes

The app now treats imported WordPress posts and normal blog posts as separate route families.

- `src/app/[id]/page.tsx` serves Arabic imported posts by WordPress id
- `src/app/en/[id]/page.tsx` was removed because no English imported post files remain
- `src/app/blog/[slug]/page.tsx` and `src/app/en/blog/[slug]/page.tsx` continue to serve non-WordPress posts

## Build expectations

Because the app uses `output: 'export'`, every dynamic route must provide `generateStaticParams()`.

If the importer removes a locale from the content tree, the matching route must also be removed or updated so the static export still builds.
