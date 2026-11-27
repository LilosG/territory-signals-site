# Territory Signals marketing site

Static Astro site on Cloudflare Workers. The only on-demand route is `/api/request`.

## Commands

    npm run build          # build to dist/
    npm run check          # types, forbidden terms, meta, catalog, links, unit and browser tests (build first)
    npm run lighthouse     # mobile Lighthouse against a running server (npx wrangler dev --port 4321)
    npm run sync:product   # re-vendor the allowlisted catalog and scoring rules from the product repo (read only)
    npm run map -- [file]  # rebuild the map: planning-area paths plus SanGIS parcel-density dots (reads the cached files)
    npm run parcels        # rebuild the example parcel block from the cached SanGIS shapefile (read only, no identifiers kept)
    node scripts/screenshots.mjs <dir>  # full-page screenshots at 1440 and 390 against a running server
    npm run deploy         # build and deploy

## Configuration

Build time (`.env.production`, see `.env.example`): `PUBLIC_TURNSTILE_SITE_KEY`, optional `PUBLIC_GA4_ID`.
Worker secrets (`npx wrangler secret put <NAME>`): `RESEND_API_KEY`, `RESEND_FROM`, `TURNSTILE_SECRET_KEY`.
The request form fails closed (503, with the contact address) until all three secrets are set.

## Where things live

- `src/data/` site facts, fixed-page meta, data sources, glossary, demo records, vendored product data
- `src/content/` signals, recipes, platform, audiences, compare, guides, faq
- `src/styles/tokens.css` every color, type, spacing, radius, shadow and motion token
- `src/components/seo/Seo.astro` the only emitter of titles, meta, canonical, social tags and JSON-LD
- `DECISIONS.md` approved wording and data rules; `PLAN.md` the Phase 1 plan
