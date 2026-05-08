# SEO Foundations

This branch was about making the site easier to find, clearer to search engines, and more consistent across Arabic and English.

## Why this work was needed

- Search engines did not have a complete picture of the site.
- English pages could quietly fall back to Arabic content.
- Some shared links and metadata behaved differently depending on locale.
- A few review findings showed the SEO signals were still too brittle.

## What changed

- Added `robots.txt` and `sitemap.xml`.
- Clarified which routes are Arabic and which are English.
- Removed the duplicate Arabic route surface instead of keeping a fallback version.
- Added page metadata and language alternates so both locales point to the right public pages.
- Added structured data for the homepage and blog posts.
- Made RSS and social links match the current locale.
- Added a clear English notice when a post is only available in Arabic.

## Issues found and how they were fixed

- The sitemap included a changing timestamp on static pages, which was unnecessary. We removed it.
- One sitemap rule was too specific for WordPress posts, which made the logic harder to trust. We simplified it.
- Three tests had special-case RSS handling that no longer matched the new link behavior. We updated the tests to check the real values directly.

## Validation

- `npm test`
- `npm run build`
