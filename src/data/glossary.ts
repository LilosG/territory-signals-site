/** Glossary terms. Signal definitions are the product's own meanings (config/signal_labels.yaml). */
import { RECIPES } from '../lib/product.ts';
import { recipeSlug } from '../lib/recipe-slug.ts';

export interface Term { id: string; term: string; definition: string; href?: string }

export const SIGNAL_TERMS: Term[] = [
  {
    "id": "tax-default",
    "term": "Tax default",
    "definition": "The parcel appears on the County list of tax-defaulted property subject to power to sell. It is a sensitive record that stays off lists and share pages.",
    "href": "/signals/tax-default"
  },
  {
    "id": "code-violation-open",
    "term": "Open code enforcement case",
    "definition": "A City code enforcement case is open on the property. Open cases are a sign of friction that can make a sale conversation timely.",
    "href": "/signals/code-enforcement"
  },
  {
    "id": "code-violation-closed",
    "term": "Code enforcement case closed",
    "definition": "A City code enforcement case on the property was closed in the last six months, which often follows repair or cleanup work.",
    "href": "/signals/code-enforcement"
  },
  {
    "id": "notice-of-default",
    "term": "Notice of default",
    "definition": "A notice of default, notice of trustee sale or lis pendens was recorded against the property. It is a public distress filing, not a completed sale.",
    "href": "/signals/recorder-documents"
  },
  {
    "id": "ownership-transfer-inheritance",
    "term": "Ownership transfer by inheritance (context only, no points)",
    "definition": "A recorded transfer by death, trust or inheritance changed who owns the property, so a new owner or trustee may be deciding what to do with it.",
    "href": "/signals/recorder-documents"
  },
  {
    "id": "stro-license-removed",
    "term": "STR license removed",
    "definition": "The short-term rental license for this address was removed, so the home may no longer earn rental income.",
    "href": "/signals/short-term-rental-licenses"
  },
  {
    "id": "stro-license-active",
    "term": "Active STR license",
    "definition": "The home holds an active short-term rental license, so it is used as a short-term rental. This is context, not a sign of a sale.",
    "href": "/signals/short-term-rental-licenses"
  },
  {
    "id": "permit-approved-pre-sale-prep",
    "term": "Pre-sale prep permit approved",
    "definition": "A permit for cosmetic or remodel work (kitchen, bath, windows, roof, paint, landscaping) was approved. This is the kind of work that often goes in before a sale.",
    "href": "/signals/building-permits"
  },
  {
    "id": "permit-approved-demolition-lot-split",
    "term": "Demolition or lot-split permit approved",
    "definition": "A permit to demolish a structure, or to split or adjust the lot, was approved. That points to a redevelopment plan.",
    "href": "/signals/building-permits"
  },
  {
    "id": "permit-approved-adu",
    "term": "ADU permit approved",
    "definition": "A permit to add an accessory dwelling unit (ADU), a second small home on the lot, was approved.",
    "href": "/signals/building-permits"
  },
  {
    "id": "permit-approved-remodel-addition",
    "term": "Remodel or addition permit approved",
    "definition": "A building permit for a remodel, addition or new construction was approved, so the owner is putting money into the property.",
    "href": "/signals/building-permits"
  },
  {
    "id": "permit-approved-solar-energy",
    "term": "Solar or energy permit approved",
    "definition": "A solar or energy permit was approved. It shows investment in the home but is a weak sign of a plan to sell.",
    "href": "/signals/building-permits"
  },
  {
    "id": "permit-stalled",
    "term": "Permit expired with no close date",
    "definition": "A building permit expired more than 90 days ago and was never closed, so the project may be unfinished.",
    "href": "/signals/building-permits"
  },
  {
    "id": "sb79-transit-estimate",
    "term": "SB 79 transit eligibility (estimated)",
    "definition": "An estimated screen against the SB 79 state law suggests the lot is near enough to transit that more homes may be allowed on it. It is an estimate, not an official finding.",
    "href": "/signals/sb9-sb79-upzoning"
  },
  {
    "id": "sb9-lot-split-estimate",
    "term": "SB 9 lot-split eligibility (estimated)",
    "definition": "An estimated screen against the SB 9 state law suggests the lot may be eligible to be split in two. It is an estimate, not an official finding.",
    "href": "/signals/sb9-sb79-upzoning"
  },
  {
    "id": "fire-hazard-zone",
    "term": "Fire hazard severity zone",
    "definition": "The home is in a mapped fire hazard severity zone, which can affect insurance. Coming: not loaded yet.",
    "href": "/signals/fire-hazard-zones"
  },
  {
    "id": "owner-years-owned",
    "term": "Years owned",
    "definition": "How long the current owner has held the home. Longer ownership means more built-up equity.",
    "href": "/signals/ownership-tenure"
  },
  {
    "id": "owner-absentee",
    "term": "Absentee owner",
    "definition": "The owner's mailing address differs from the property, so the owner does not live there.",
    "href": "/signals/ownership-tenure"
  },
  {
    "id": "owner-out-of-state",
    "term": "Out-of-state owner",
    "definition": "The owner's mailing address is in another state.",
    "href": "/signals/ownership-tenure"
  },
  {
    "id": "owner-mortgage-open-false",
    "term": "No open mortgage",
    "definition": "No open mortgage is on record, so the home appears to be owned free and clear.",
    "href": "/signals/ownership-tenure"
  },
  {
    "id": "owner-est-equity-top-quartile",
    "term": "Equity in the top quarter (estimated)",
    "definition": "Estimated equity is in the top quarter of the territory. It is an estimate from public records, not a verified figure.",
    "href": "/signals/ownership-tenure"
  },
  {
    "id": "owner-portfolio-owner-multi",
    "term": "Multiple parcels in the territory",
    "definition": "The owner holds more than one property in the territory. Investors and absentee owners with several local parcels often review their holdings together.",
    "href": "/signals/ownership-tenure"
  },
  {
    "id": "owner-ownership-transfer",
    "term": "Ownership transfer (context only, no points)",
    "definition": "A recorded transfer that restarts the current owner’s tenure. It is context only and adds no points.",
    "href": "/signals/recorder-documents"
  }
];

export const RECIPE_TERMS: Term[] = Object.entries(RECIPES).map(([key, r]) => ({
  id: recipeSlug(key),
  term: r.label,
  definition: r.description,
  href: `/recipes/${recipeSlug(key)}`,
}));

export const SCORING_TERMS: Term[] = [
  {
    "id": "parcel",
    "term": "Parcel",
    "definition": "One assessor parcel number. Every signal is matched to a parcel."
  },
  {
    "id": "match-confidence",
    "term": "Match confidence",
    "definition": "A value from 0 to 1 recording how reliably a record was matched to its parcel. It multiplies the signal’s weight."
  },
  {
    "id": "half-life",
    "term": "Half-life",
    "definition": "The number of days after which a signal’s contribution is halved. Static signals have none."
  },
  {
    "id": "signal-family",
    "term": "Signal family",
    "definition": "A group of related signals: financial, short-term rentals, permits, upzoning, fire hazard or owner."
  },
  {
    "id": "stacking",
    "term": "Stacking bonus",
    "definition": "Plus 15% for each independent family beyond the first, capped at 45%."
  },
  {
    "id": "score-tier",
    "term": "Score tier",
    "definition": "A display band: Immediate (80 to 100), Priority (65 to 79), Active Watchlist (45 to 64) or Monitor (under 45)."
  },
  {
    "id": "suppression",
    "term": "Suppression",
    "definition": "A rule that leaves a parcel unscored, such as a sale in the last 24 months or a team suppression."
  },
  {
    "id": "estimated-eligibility",
    "term": "Estimated eligibility",
    "definition": "The result of an in-house screen for SB 9 or SB 79. It is not an official determination."
  }
];
