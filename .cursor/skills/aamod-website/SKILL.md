---
name: aamod-website
description: Maintain and redesign the Aamod P. Pisat Photography Next.js website. Use when editing its pages, Contentstack content delivery, visual design, navigation, forms, or site checks.
---

# Aamod Photography website

Read this file before exploring the repository. Open only the route or component needed for the task.

## Stack and source of truth

- Next.js 14 App Router, React 18, Tailwind, and Framer Motion.
- Hosting: Contentstack Launch. Keep `next.config.js` standalone output.
- Published content: Contentstack Delivery SDK in `src/lib/contentstack.ts`. `CONTENTSTACK_API_KEY`, `CONTENTSTACK_DELIVERY_TOKEN`, and `CONTENTSTACK_ENVIRONMENT` are server environment variables. Use `development` for local checks. Never commit a token or place one in a client component. Live Preview loads after hydration via `src/lib/contentstack-live-preview.ts`.
- CMS field types: `src/lib/types.ts`; schemas: `schemas/`. The credential-free published reference is `docs/contentstack-development-snapshot.json` (10 November 2026 snapshot; refresh when content changes).
- Image delivery: `src/lib/image-utils.ts` sets per-use width and quality ceilings. `src/lib/contentstack-image-loader.ts` turns Next `<Image>` candidates into direct Contentstack CDN URLs with responsive widths, the published environment, and WebP with progressive JPEG fallback. `next.config.js` selects this loader; do not send Contentstack images through Next's built-in `/_next/image` optimizer again. Keep accurate `sizes` props on each image so small cards do not download hero-sized files.
- Approved design: `docs/design-prototype.html` and `docs/prototypes/`. Progress checklist: `docs/REDESIGN_CHECKLIST.md`.

## Fast route map

- Shared shell: `src/app/layout.tsx`, `src/components/layout/{Layout,Header,Footer}.tsx`.
- Shared design: `src/components/editorial.tsx`, `src/styles/editorial.css`, `tailwind.config.ts`.
- Home `/`: `src/app/page.tsx`, `src/components/HomeHeroCarousel.tsx`, `src/styles/home-carousel.css` → `homepage_new.featured_banner`, about, stories, testimonials. The approved hero fills the viewport below the header and the award feature follows it. The "Raw, timeless, nostalgic, cinematic" section uses four curated portrait assets from `portfolio_section.gallery_images`, with equal 2:3 frames and `object-fit: contain` so the full images remain visible.
- Portfolio `/portfolio`: `src/app/portfolio/{page,PortfolioClient}.tsx` → `portfolio_page` and the asset folder in `gallery_section.asset_folder_uid`. Preserve compact four-column desktop/two-column mobile gallery and full-screen lightbox with arrows and keyboard controls.
- Films `/films`: `src/app/films/page.tsx`, `src/components/{FilmHeroMedia,FilmsGallery}.tsx` → `films_page` and its published teaser/video list. Keep the hero still visible until the user starts the video. Film cards open the YouTube embed in an on-page dialog; never send a card click to a YouTube page. `FilmThumbnail` uses a film's published Contentstack image when present, otherwise that film's `i.ytimg.com` max-resolution thumbnail with an HQ fallback. The hero's fallback image belongs only to the hero and must not be reused for film cards.
- Stories `/stories`: `src/app/stories/{page,StoriesClient}.tsx`, `src/styles/stories.css`; detail `/stories/[slug]`: `src/app/stories/[slug]/{page,StoryGallery}.tsx` → `stories_post`. The listing uses equal 2:3 portrait frames with complete images, a three/two/one-column responsive grid, and category filters. Sushmita's published thumbnail is landscape, so the listing uses portrait asset `APP05244.jpg` from that story's published gallery while the CMS thumbnail retains its current UID. Story details display every published `gallery_images` asset in a lazy-loading grid; clicking any image opens an on-page viewer with arrows and Escape support. Never limit the gallery with `slice`.
- About `/about`: `src/app/about/page.tsx` → `about_page` and homepage About. Keep both portrait images fully visible (`object-fit: contain`).
- Contact `/contact`: `src/app/contact/page.tsx`, `src/components/ContactForm.tsx`, `src/app/api/contact/route.ts` → `contact_page` and `site_config`.
- Supporting pages: `src/app/{services,info,testimonials,faq}/page.tsx`. Services leads visitors to Contact.
- Retired URLs: `/journal` permanently redirects to `/stories`, and `/packages` permanently redirects to `/services` in `next.config.js`. Do not add these pages back to navigation or calls to action.

## Design rules

Use white backgrounds, the Playfair Display and DM Sans pairing, restrained olive accents, generous space, real Contentstack photography, and the header inquiry CTA. Use the approved prototypes for composition. Keep motion subtle and respect reduced motion. Never replace the portfolio gallery with editorial cards. Make mobile layouts without horizontal overflow. Keep text and assets from published Contentstack data wherever a field exists.

## One check command

`npm run test:redesign` starts the site, visits all 13 active routes at desktop and mobile sizes, checks layout, image loading, responsive Contentstack image widths on high density screens, the uniform homepage and Stories grids, complete story detail galleries, and retired URL redirects, captures screenshots in `/private/tmp/aamod-redesign-screenshots`, and exercises the homepage carousel, Stories filters and links, story photo viewer, portfolio lightbox, on-page film dialog, FAQ, contact validation, and mobile menu. Set the three Contentstack variables above before running. `npx tsc --noEmit` checks types; `npm run build` checks production compilation. The check script is `scripts/test-redesign.mjs`.

## Known details

- `.env` in this checkout does not contain Contentstack credentials. A build may compile while CMS requests fail and return empty data; check the published gallery and story counts in the browser run.
- `hero_banner`, `service_package`, and `blog_post` are present in local schema/code references but were not found by the `development` Delivery API on 10 November 2026. Current home hero uses `homepage_new.featured_banner`.
- `portfolio_section.subtiitle` is misspelled in the CMS schema and TypeScript type.
- Contentstack image URLs should use `src/lib/image-utils.ts` presets; do not download and commit CMS assets.
- The contact form POST is real. The browser check validates required fields without sending an inquiry.
