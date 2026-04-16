# Brand Assets

The site uses the private `brand-assets` repository as a git submodule.

## Source of truth

- `brand-assets/logos/Aosus Logo/SVG/aosus-horizontal-black-no-link.svg` powers the light-mode site logo.
- `brand-assets/logos/Aosus Logo/SVG/aosus-white-logo.svg` powers the dark-mode site logo.
- `brand-assets/logos/Aosus Logo/SVG/aosus-icon.svg` powers the favicon.
- `brand-assets/logos/Aosus Logo/PNG/writing-contest.png` powers the writing contest logo.
- `brand-assets/assets/aosus-preview.jpg` powers the default OpenGraph image.
- `brand-assets/assets/writing-preview.jpg` powers the writing contest OpenGraph image.
- `brand-assets/logos/discourse-chat-bridge/Discourse_Bridge.webp` powers the bridge project logo in the homepage card.

## Public export

`scripts/sync-content-assets.ts` copies the selected brand files into `public/` before development and build.

- `public/images/aosus-logo-light.svg`
- `public/images/aosus-logo-dark.svg`
- `public/favicon.svg`
- `public/images/writing-contest.png`
- `public/images/discourse-bridge.webp`
- `public/opengraph.jpg`
- `public/og/writing-contest.jpg`

The private repository itself stays outside the public site bundle.

## Metadata

- Homepage metadata is localized for Arabic and English.
- Writing contest pages use the contest preview image.
- Blog posts use their `thumbnail` field for OpenGraph and Twitter previews.
- Shared pages like services, support, and contact use localized titles and descriptions.
