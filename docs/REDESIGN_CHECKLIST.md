# Website redesign checklist

Approved reference: `docs/design-prototype.html` and `docs/prototypes/`.

- [x] Review existing routes, Contentstack delivery fields, and approved prototypes.
- [x] Install dependencies and record the current build state.
- [x] Implement shared navigation, typography, spacing, buttons, and footer.
- [x] Implement the homepage and portfolio, including the existing gallery and lightbox.
- [x] Implement films, stories, journal story detail, and about.
- [x] Implement contact, packages, services, testimonials, FAQ, and info.
- [x] Add one script that checks all routes, key interactions, and layout at desktop and mobile sizes.
- [x] Run the script, fix every reported issue, and review page visuals.
- [x] Add a project skill for AI assistants covering architecture, design, Contentstack, and checks.
- [x] Record final results and any remaining limitations here.

## Progress notes

- 11 November 2026: Existing code and published `development` snapshot mapped to the approved prototypes. No app implementation changes yet.
- 11 November 2026: Installed locked dependencies. Baseline production build started; its result will be recorded below.
- 11 November 2026: Baseline build compiled but page collection failed because the checkout has no Contentstack key in `.env`. Shared design, home, and portfolio are implemented; portfolio retains the existing 29-image gallery and lightbox.
- 11 November 2026: Remaining page templates implemented. Contact and package booking behavior remain connected to their existing API flows. TypeScript check passes.
- 11 November 2026: Added `npm run test:redesign` for 15 routes at desktop and mobile sizes, image loading, overflow, header CTA placement, and key interactions.
- 11 November 2026: Added a shared project guide for GPT, Claude, and other coding assistants at `.cursor/skills/aamod-website/SKILL.md`, with `AGENTS.md` and `CLAUDE.md` entry points.
- 11 November 2026: First full browser pass covered all 15 routes at desktop and mobile sizes. Fixed a hydration issue that removed styles and adjusted the film teaser to keep its still image visible while video loads. Final visual review and rerun are in progress.
- 11 November 2026: Final browser run passed all 15 routes at 1440 × 900 and 390 × 844, including portfolio arrows and Escape, FAQ expansion, contact required fields, mobile navigation, package selection, and film teaser controls. Reviewed the page screenshots; hero images, the about image fit, CTA placement, and mobile layouts align with the approved prototypes. The published film teaser also began playback in a separate browser check. The production build passed with published `development` content.
- 11 November 2026: During final log review, corrected two existing featured-content queries that passed a boolean to the Delivery SDK's string/number-only `equalTo` method. They now use the SDK's boolean-compatible `where` method.
- 11 November 2026: Repeated browser and production build checks after that correction; both passed. Local CMS connection files are now excluded from git so credentials remain outside the redesign changes.

## Limits

- Contact and package forms were validated in the browser without submitting a real inquiry or booking. Sending a live lead would create external data.
- Contentstack delivery content can change after this test. Rerun `npm run test:redesign` with current `development` credentials before release.

## Film embeds follow-up

- [x] Replace links to YouTube pages with an on-page film player.
- [x] Update the project guide and browser script for the new interaction.
- [x] Verify film playback and closing behavior on desktop and mobile.
- [x] Run the full browser script and production build.

The published YouTube film loaded and played inside the dialog. Desktop and mobile checks confirmed the player fits the screen, the URL stays on `/films`, Escape and the close button dismiss it, and all 15 routes still pass. The production build passed; the local development server was restarted afterward and `/films` responds with HTTP 200 at `http://localhost:3000`.

## Simplify Stories and Services

- [x] Find Journal and Packages links, pages, and related calls to action.
- [x] Remove the redundant pages and navigation, and update related content and links.
- [x] Redirect existing Journal and Packages URLs to their replacement pages.
- [x] Update the project guide and browser script.
- [x] Verify all remaining pages, redirects, and the production build.

Journal and Packages no longer have pages or links in the active site. The homepage calls its editorial section Stories, Services leads visitors to the portfolio and contact form, and the two retired URLs redirect to their replacements. The updated browser script passed all 13 active routes at desktop and mobile sizes, confirmed the redirects and absence of old links, and the production build passed. The local server is running again at `http://localhost:3000`.

## Featured banner carousel concept

- [x] Review the five published homepage featured banners in Contentstack development.
- [x] Create an interactive desktop and mobile design prototype.
- [x] Check image loading, slide controls, and mobile alignment.
- [x] Review the concept before changing the live homepage. The full-screen alternative was selected.

Prototype: `docs/prototypes/featured-banner-carousel.html`, served locally at `http://localhost:3001/prototypes/featured-banner-carousel.html`. The current homepage at port 3000 remains the implemented design until this concept is approved.

## Full-screen carousel alternative

- [x] Build a full-viewport banner using the same five published featured images.
- [x] Keep the inquiry CTA and award recognition visible in the concept.
- [x] Verify desktop and mobile image loading, slide controls, and no horizontal overflow.
- [x] Review the full-screen concept before replacing the live homepage hero.

Prototype: `docs/prototypes/full-page-carousel.html`, served at `http://localhost:3001/prototypes/full-page-carousel.html`. The carousel fills the viewport below the header; the award feature moves immediately below it.

## Implement approved full-screen carousel

- [x] Confirm the approved prototype and published Contentstack banner fields.
- [x] Build the full-screen homepage carousel and move the award feature below it.
- [x] Add carousel interaction checks to the one browser script and update the project guide.
- [x] Review desktop and mobile visuals, run the full browser script and production build.
- [x] Restart the local website server for browser review.

The homepage now matches the approved full-screen prototype. The five published featured banners rotate every six seconds, with arrows, keyboard navigation, swipe support, and a reduced-motion pause. All 13 active routes passed the browser script at desktop and mobile sizes; each banner image loaded without overlap at 390px, 375px, and 320px widths. The production build passed, and the restarted homepage responds with HTTP 200 at `http://localhost:3000`.

## Uniform homepage image grid

- [x] Inspect the current grid and the published image proportions.
- [x] Select four complete portrait images and give every card the same frame size.
- [x] Check desktop and mobile visuals and add a grid assertion to the browser script.
- [x] Run the browser script and production build, then restart the local server.

The section now shows four curated portrait assets from the published Contentstack gallery. Desktop frames measure 311 × 466px; mobile frames are 172 × 258px at 390px wide and 137 × 206px at 320px wide. All four photographs fit completely inside equal frames, with no horizontal overflow. All 13 active routes passed the browser script, the production build passed, and `http://localhost:3000` responds with HTTP 200.

## Stories page refinement

- [x] Inspect the current Stories page and published thumbnail proportions.
- [x] Build a consistent story grid with complete portrait thumbnails and refined filters.
- [x] Verify category filtering, links, image loading, and visual alignment at desktop and mobile widths.
- [x] Update the browser script and project guide, then run the full checks and build.
- [x] Restart the local server for review.

The Stories listing now has three equal portrait frames, consistent card spacing, and refined category tabs. The published Sushmita story uses a portrait image from its gallery in the listing. All 13 active routes passed the browser script at desktop and mobile sizes; the production build and type check passed. Review the live page at `http://localhost:3000/stories`.

## Image clarity and loading

- [x] Audit delivered image dimensions and compression on desktop and mobile screens.
- [x] Deliver one responsive image variant directly from Contentstack rather than re-encoding it in Next.js.
- [x] Correct homepage image size hints and defer inactive carousel slides.
- [x] Verify image loading, sharpness budgets, and transfer size in the browser.
- [x] Run the production build and leave the local preview ready for review.

At 1440px with a 2× display density, the homepage hero now receives a 2560px WebP image instead of a 1920px image processed a second time. The four homepage cards receive 750px WebP variants instead of 800px images that were enlarged and re-encoded. On first load, measured homepage image transfer dropped from 1.95 MB to 1.13 MB on desktop and from 0.66 MB to 0.43 MB on mobile. All 13 routes passed the browser checks at desktop and mobile widths, including the new high density image checks; the production build passed.

## Complete story galleries

- [x] Confirm the image counts published for each story in Contentstack development.
- [x] Replace the two-image story preview with all published gallery images.
- [x] Add a full-photo viewer with arrows and keyboard controls.
- [x] Review desktop and mobile gallery layouts and run the browser checks.
- [x] Run the production build and leave the local preview ready.

The development entry now displays all 25 Yuvraj photos, all 21 Trushang and Vaishnavi photos, and all 13 Sushmita and Milind photos. Every thumbnail shows the full image and loads lazily; the viewer supports next, previous, and Escape. All 13 routes passed the desktop and mobile browser checks, the production build passed, and each restarted story URL responds with HTTP 200 and the expected gallery count.
