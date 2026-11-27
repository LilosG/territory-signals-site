/**
 * The demo workspace shown in product UI recreations. Every address, parcel number and record ID here is invented.
 * Scores are computed with the real formula and weights, never typed in.
 */
import { componentByKey, SCORE_RULES, SCORING } from '../lib/product.ts';
import { computeScore, type ScoreInput } from '../lib/scoring.ts';

export const WORKSPACE = 'Demo Team';
export const AREA = 'Sample Area';

const s = SCORING.signals;
const o = SCORING.owner_modifiers;
const yearsOwned20 = o.years_owned.find((t) => t.min_years === 20)!.weight;

type DemoSignal = ScoreInput & { label: string; points: number };
const input = (key: string, x: Omit<ScoreInput, 'key' | 'family'>): DemoSignal => {
  const c = componentByKey(key);
  return { ...x, key, family: c.family, label: c.label, points: c.max_points };
};

/** The six toggles of the score demo, in display order. */
export const DEMO_SIGNALS: (DemoSignal & { on: boolean })[] = [
  { ...input('permit_approved:pre_sale_prep', { ...rule(s.permit_approved.by_group.pre_sale_prep), ageDays: 60, confidence: 0.95 }), on: true },
  { ...input('stro_license_removed', { ...rule(s.stro_license_removed), ageDays: 45, confidence: 0.9 }), on: false },
  { ...input('permit_stalled', { ...rule(s.permit_stalled), ageDays: 200, confidence: 0.95 }), on: false },
  { ...input('sb9_lot_split_estimate', { weight: s.sb9_lot_split_estimate.weight, halfLifeDays: null, ageDays: 0, confidence: 0.5 }), on: true },
  { ...input('owner:years_owned', { weight: yearsOwned20, halfLifeDays: null, ageDays: 0, confidence: 1, ownerModifier: true }), on: true },
  { ...input('owner:mortgage_open_false', { weight: o.mortgage_open_false.weight, halfLifeDays: null, ageDays: 0, confidence: 1, ownerModifier: true }), on: true },
];

function rule(r: { weight: number; half_life_days: number }) {
  return { weight: r.weight, halfLifeDays: r.half_life_days };
}

const pickDemo = (...keys: string[]) => keys.map((k) => DEMO_SIGNALS.find((d) => d.key === k)!);

/** The sample lead used across the product recreations. */
export const LEAD = (() => {
  const signals = pickDemo('permit_approved:pre_sale_prep', 'sb9_lot_split_estimate', 'owner:years_owned', 'owner:mortgage_open_false');
  const result = computeScore(signals, SCORE_RULES);
  return {
    address: '1200 Sample Ave',
    apn: '000-000-01-00',
    zoning: 'RS-1-7',
    lot: '6,700 sq ft',
    headline: 'Long-held home with a fresh remodel permit',
    summary:
      'A permit for cosmetic or remodel work was approved in September 2026. The owner has held the home 24 years and no open mortgage is on record. This is the kind of work that often goes in before a sale.',
    topSignal: 'Kitchen and bath remodel permit approved Sep 27',
    recipe: SCORING.recipes.pre_list_prep.label,
    model: SCORING.model_version,
    score: result.score,
    families: result.families.length,
    multiplier: result.multiplier,
    breakdown: result.components
      .map((c) => ({ label: signals.find((x) => x.key === c.key)!.label, points: c.contribution, max: signals.find((x) => x.key === c.key)!.points }))
      .sort((a, b) => b.points - a.points),
  };
})();

export const TIMELINE = [
  { title: 'Permit approved: electrical, plumbing and mechanical work (kitchen and bath remodel)', date: 'Sep 27, 2026', iso: '2026-09-27', source: 'City development permits', record: 'PMT-0000101', match: 'Matched by parcel number', confidence: 95 },
  { title: 'Permit approved: building permit (remodel, addition or new construction)', date: 'May 12, 2026', iso: '2026-05-12', source: 'City development permits', record: 'PMT-0000087', match: 'Matched by parcel number', confidence: 95 },
  { title: 'SB 9 lot-split eligibility (estimated)', date: 'Nov 23, 2026', iso: '2026-11-23', source: 'Zoning and lot-size screen', record: 'EST-0000012', match: 'Matched by parcel number', confidence: 50 },
];

/** Four unrelated records that resolve to one parcel in the hero sequence. */
export const HERO = (() => {
  const records = [
    { source: 'Permit record', record: 'PMT-0000214', date: '2026-06-27', fact: 'ADU permit approved', input: input('permit_approved:adu', { ...rule(s.permit_approved.by_group.adu), ageDays: 150, confidence: 0.95 }) },
    { source: 'Rental license change', record: 'STR-0000058', date: '2026-07-27', fact: 'License no longer listed', input: input('stro_license_removed', { ...rule(s.stro_license_removed), ageDays: 120, confidence: 0.9 }) },
    { source: 'Tax-roll line', record: 'TTC-0000007', date: '2025-10-22', fact: 'On the tax-default list', input: input('tax_default', { ...rule(s.tax_default), ageDays: 400, confidence: 0.95 }) },
    { source: 'Recorder document', record: 'DOC-0000031', date: '2002-03-14', fact: 'Grant deed: held 24 years', input: input('owner:years_owned', { weight: yearsOwned20, halfLifeDays: null, ageDays: 0, confidence: 1, ownerModifier: true }) },
  ];
  const result = computeScore(records.map((r) => r.input), SCORE_RULES);
  return { apn: '000-000-02-00', records, score: result.score, families: result.families.length, multiplier: result.multiplier };
})();

/** Weekly briefing and recipe counts are illustrative sample numbers inside a Sample-badged visual. */
export const BRIEFING = {
  week: 'Week of Nov 16, 2026',
  title: 'Two priority leads this week',
  intro: 'Two parcels moved into the Priority tier. Both have a recently approved remodel permit and a long-held owner.',
};

export const DRAFT = {
  salutation: `To the owners of ${LEAD.address},`,
  // The pre-list prep letter template from the product (config/outreach_templates/pre_list_prep/letter.md), filled for the demo.
  body: [
    `I focus on ${AREA}, and updates before a sale can be expensive, so it helps to know what pays off first.`,
    `I can put together a short guide to which updates actually pay off before selling in ${AREA}, and which don't, so you can spend only where it counts.`,
    `No obligation, just a guide you can keep. Reach out to ${WORKSPACE} to get started.`,
  ],
};

/** Invented signal sets for the example score on each recipe card and the sample leads on the dashboard. */
const event = (key: string, r: { weight: number; half_life_days: number }, ageDays: number, confidence = 0.95) =>
  input(key, { ...rule(r), ageDays, confidence });
const fixed = (key: string, weight: number, confidence = 1, ownerModifier = true) =>
  input(key, { weight, halfLifeDays: null, ageDays: 0, confidence, ownerModifier });
const held30 = o.years_owned.find((t) => t.min_years === 30)!.weight;
const owner = {
  held20: () => fixed('owner:years_owned', yearsOwned20),
  held30: () => fixed('owner:years_owned', held30),
  absentee: () => fixed('owner:absentee', o.absentee.weight),
  noMortgage: () => fixed('owner:mortgage_open_false', o.mortgage_open_false.weight),
};
const estimate = (key: string, weight: number) => fixed(key, weight, 0.5, false);
const prep = (ageDays: number) => event('permit_approved:pre_sale_prep', s.permit_approved.by_group.pre_sale_prep, ageDays);
const stalled = (ageDays: number) => event('permit_stalled', s.permit_stalled, ageDays);
const stroRemoved = (ageDays: number) => event('stro_license_removed', s.stro_license_removed, ageDays, 0.9);

const remodel = (ageDays: number) => event('permit_approved:remodel_addition', s.permit_approved.by_group.remodel_addition, ageDays);

/** Invented matching parcels, one per recipe: the qualifying signal, the full breakdown and the computed score. */
const sample = (signal: string, signals: DemoSignal[]) => {
  const result = computeScore(signals, SCORE_RULES);
  return {
    signal: componentByKey(signal).label,
    score: result.score,
    families: result.families.length,
    multiplier: result.multiplier,
    weightedSum: result.weightedSum,
    breakdown: result.components
      .map((c) => ({ label: componentByKey(c.key).label, points: c.contribution, max: componentByKey(c.key).max_points }))
      .filter((c) => c.points > 0)
      .sort((a, b) => b.points - a.points),
  };
};

export const RECIPE_SAMPLES = {
  str_exit: sample('stro_license_removed', [stroRemoved(30), owner.held20(), owner.absentee()]),
  tired_landlord: sample('owner:absentee', [stroRemoved(60), stalled(100), owner.absentee(), owner.held20()]),
  builder_bait: sample('sb9_lot_split_estimate', [estimate('sb9_lot_split_estimate', s.sb9_lot_split_estimate.weight), estimate('sb79_transit_estimate', s.sb79_transit_estimate.values.within_quarter_mile), owner.held30()]),
  pre_list_prep: sample('permit_approved:pre_sale_prep', [prep(60), estimate('sb9_lot_split_estimate', s.sb9_lot_split_estimate.weight), owner.held20(), owner.noMortgage()]),
  stalled_project: sample('permit_stalled', [stalled(100), owner.held20()]),
  downsizer: sample('owner:mortgage_open_false', [owner.held30(), owner.noMortgage(), remodel(60)]),
  insurance_squeeze: sample('fire_hazard_zone', [fixed('fire_hazard_zone', s.fire_hazard_zone.values['very high'], 0.95, false), owner.held20()]),
  financial_pressure: sample('tax_default', [event('tax_default', s.tax_default, 200), event('notice_of_default', s.notice_of_default, 60)]),
  quiet_inheritance: sample('ownership_transfer_inheritance', [owner.absentee(), owner.noMortgage()]),
} as const;

/** One card per catalog recipe: the signal or fact that qualifies it, and the score of one invented matching parcel. */
export const RECIPE_EXAMPLES: Record<string, { signal: string; score: number }> = Object.fromEntries(
  Object.entries(RECIPE_SAMPLES).map(([k, v]) => [k, { signal: v.signal, score: v.score }]),
);

/** The dashboard's ranked list. No sensitive record appears on a lead row, matching the product's rule. */
export const TOP_LEADS = [
  { address: '418 Sample Ct', recipe: 'tired_landlord', signal: 'Rental license no longer listed', signals: [stroRemoved(60), stalled(100), owner.absentee(), owner.held20()] },
  { address: LEAD.address, recipe: 'pre_list_prep', signal: LEAD.topSignal, signals: [prep(60), estimate('sb9_lot_split_estimate', s.sb9_lot_split_estimate.weight), owner.held20(), owner.noMortgage()] },
  { address: '77 Sample Way', recipe: 'pre_list_prep', signal: 'Window and roof permit approved Nov 6', signals: [prep(20), owner.held20(), owner.noMortgage()] },
  { address: '2315 Sample St', recipe: 'str_exit', signal: 'Rental license no longer listed', signals: [stroRemoved(30), owner.held20(), owner.absentee()] },
]
  .map((l) => ({ address: l.address, signal: l.signal, recipe: SCORING.recipes[l.recipe as keyof typeof SCORING.recipes].label, score: computeScore(l.signals, SCORE_RULES).score }))
  .sort((a, b) => b.score - a.score);

/** The top lead's breakdown, shown beside the hero workspace. Same invented parcel and signals as TOP_LEADS[0]. */
export const TOP_LEAD_DETAIL = { address: '418 Sample Ct', ...RECIPE_SAMPLES.tired_landlord };

/** Sample counts inside the hero workspace and the sample briefing. Immediate and Priority come from TOP_LEADS. */
export const WEEK = {
  label: 'Week of Nov 16, 2026',
  newSignals: 38,
  drafts: 12,
  conversations: 7,
};
