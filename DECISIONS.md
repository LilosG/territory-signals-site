# Decisions

Approved by Mike on 2026-11-26. These override PLAN.md where they differ.

- **S1 Catalog.** `src/data/product-catalog.json` copies an allowlist of fields only: no client identifier and no client-specific recipe settings. `check-catalog.mjs` fails if any client-specific key appears.
- **S2 Map.** The market map uses the full City file `Community_Plan_SD.geojson` (all 61 shapes), drawn identically, with no names and no highlights. The product dashboard's three-area GeoJSON is not used anywhere.
- **S3 Competitors.** Offrs: only the four facts Mike verified on offrs.com, linked to https://www.offrs.com, "as of Nov 2026". No Offrs percentages. SmartZip: verified facts from the HousingWire review, with its date shown.
- **S4 MLS.** Offered today. Described only as an optional add-on, scoped per client, that requires the broker's signed back-office data agreement. The core product runs without MLS. No MLS features, fields or boards are described.
- **S5 Build-state limits are not published as product limits.** Outreach is "drafts that the team approves and sends"; nothing is ever said or implied to send automatically. Code enforcement is a source "where the City publishes case data". Rental license removals are "detected as licenses change between data pulls". Fire zones are "coming"; Insurance squeeze activates when fire hazard data is loaded. Product visuals carry the Sample badge; copy does not discuss sample versus real owner data.
- **S6 ATTOM.** Named factually as the owner and recorder data source (owner, mailing, value, mortgage and recorder history). No logo, no implied partnership or endorsement.
- **S7** All other defaults in PLAN.md section 7 are approved.
- **S8 Design elevation (replaces the "no highlights" part of S2).** The map fills all 61 shapes, shows parcel density as dots and outlines one example planning area in gold, labeled as an illustration. The parcel drawing in heroes is a real block in that same area; its data file holds drawing coordinates only (no parcel numbers, addresses, owner fields or geographic coordinates), and the score fills and subject parcel are illustrative. Home keeps the two-dark-band limit: the hero and the product showcase, with a light closing band.

