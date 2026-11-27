/**
 * Every data source the site names. Verdicts come from the product's SOURCES.md; only sources marked usable or
 * usable-with-limits that the pipeline ingests are listed as live. Wording follows DECISIONS.md S5 and S6.
 */
export type SourceKey = 'permits' | 'str' | 'tax' | 'parcels' | 'zoning' | 'transit' | 'areas' | 'code' | 'attom' | 'fire';
export type Verdict = 'Usable' | 'Usable with limits' | 'Coming';

export interface DataSource {
  key: SourceKey;
  name: string;
  publisher: string;
  url: string;
  verdict: Verdict;
  provides: string;
  join: string;
  publishes: string;
  limits: string;
}

const SANDAG = 'https://geo.sandag.org/server/rest/directories/downloads/';

export const SOURCES: DataSource[] = [
  { key: 'permits', name: 'City of San Diego development permit approvals', publisher: 'City of San Diego Development Services', url: 'https://data.sandiego.gov/datasets/development-permits/', verdict: 'Usable with limits', provides: 'Approval type, scope text, issue, close and expiry dates, ADU unit counts', join: 'Parcel number, then location or address', publishes: 'Daily on the City portal', limits: 'Some rows have no parcel number, and many have no project type, so classification reads the approval type and scope text.' },
  { key: 'str', name: 'City of San Diego short-term rental (STRO) licenses', publisher: 'City of San Diego City Treasurer', url: 'https://data.sandiego.gov/datasets/stro-licenses/', verdict: 'Usable with limits', provides: 'License ID, tier, location and status', join: 'Point inside the parcel, by latitude and longitude', publishes: 'Refreshed on the City portal; no fixed cadence stated', limits: 'The file lists active licenses with no parcel number. Removals are detected as licenses change between data pulls.' },
  { key: 'tax', name: 'County Treasurer-Tax Collector tax-default list', publisher: 'San Diego County Treasurer-Tax Collector', url: 'https://www.sdttc.com/content/ttc/en/tax-collection/property-tax-sales/legal-ads.html', verdict: 'Usable with limits', provides: 'Parcel number, notice date and amount to redeem on parcels subject to power to sell', join: 'Parcel number', publishes: 'An annual list, with auction notices during the year', limits: 'A low-volume signal published as a PDF. The auction notices are not ingested.' },
  { key: 'parcels', name: 'SanGIS parcels', publisher: 'SanGIS / SANDAG', url: 'https://gis-sangis1.hub.arcgis.com/pages/download-data', verdict: 'Usable', provides: 'Parcel number, boundary, address, land use and lot size', join: 'This is the base every other record joins to', publishes: 'Update frequency not stated by the publisher', limits: 'Contains no owner names. Its last recorded document date is never treated as a purchase date.' },
  { key: 'zoning', name: 'SANDAG base zoning', publisher: 'SANDAG', url: `${SANDAG}Zoning_Base_SD.geojson`, verdict: 'Usable with limits', provides: 'Zone names used by the estimated SB 9 screen', join: 'Parcel position inside a zoning polygon', publishes: 'Listed as weekly in the publisher’s catalog', limits: 'An input to an estimate, not an eligibility finding. Planned districts are left out of the SB 9 screen.' },
  { key: 'transit', name: 'SANDAG transit stops and routes', publisher: 'SANDAG', url: `${SANDAG}Transit_Stops_GTFS.geojson`, verdict: 'Usable with limits', provides: 'Rail stations and rapid-bus stops used by the estimated SB 79 screen', join: 'Distance from the parcel boundary', publishes: 'Listed as weekly in the publisher’s catalog', limits: 'No service-frequency or dedicated-lane fields, so the screen is a proxy. An official SB 79 layer is not confirmed.' },
  { key: 'areas', name: 'Community planning areas', publisher: 'SANDAG (City of San Diego community plan areas)', url: `${SANDAG}Community_Plan_SD.geojson`, verdict: 'Usable', provides: 'The boundaries that define a team’s territory', join: 'Parcel position inside a planning area', publishes: 'Listed as weekly in the publisher’s catalog', limits: 'Planning areas do not match ZIP codes; ZIP is kept only as an attribute.' },
  { key: 'code', name: 'City of San Diego code enforcement cases', publisher: 'City of San Diego Development Services', url: 'https://data.sandiego.gov/datasets/code-enforcement-violations/', verdict: 'Usable with limits', provides: 'Case open and close dates and violation category, where the City publishes case data', join: 'Parcel number, then location', publishes: 'Where the City publishes case data', limits: 'Investigator names, phone numbers and emails are never stored.' },
  { key: 'attom', name: 'ATTOM owner and recorder data', publisher: 'ATTOM', url: 'https://www.attomdata.com/', verdict: 'Usable with limits', provides: 'Owner, mailing address, estimated value, mortgage status and recorder history', join: 'Parcel number and county code, with a street-address fallback', publishes: 'Retrieved per parcel and cached', limits: 'ATTOM’s license governs retention and display. No phone number, Social Security number or email address is stored.' },
  { key: 'fire', name: 'CAL FIRE fire hazard severity zones', publisher: 'Office of the State Fire Marshal', url: 'https://osfm.fire.ca.gov/', verdict: 'Coming', provides: 'Hazard class by location', join: 'Parcel position inside a hazard zone', publishes: 'Statewide map releases', limits: 'Not loaded yet. It is added from an authoritative state file and never guessed.' },
];

export const NOT_SCRAPED = [
  { term: 'Superior Court probate records', definition: 'The court’s terms bar bots and automated data gathering, so Before They Sell does not scrape them.' },
  { term: 'Published legal notices', definition: 'The statewide notice site bars automated collection without written permission, and individual newspaper pages are not confirmed as usable. Neither is scraped.' },
  { term: 'Obituaries', definition: 'Publisher and obituary-site terms bar scraping and database use. Obituaries are never collected.' },
];

export const PIPELINE_CADENCE = 'Weekly run, in a fixed order. A failed source is recorded and the rest of the run continues.';

export const sourceByKey = (key: SourceKey): DataSource => SOURCES.find((s) => s.key === key)!;
