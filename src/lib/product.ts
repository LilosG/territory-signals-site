/** Typed access to the vendored product catalog and scoring rules. Build time only. */
import catalog from '../data/product-catalog.json';
import scoring from '../data/product-scoring.json';
import type { ScoreRules } from './scoring.ts';

export type Condition =
  | { all: Condition[] }
  | { any: Condition[] }
  | { not: Condition }
  | { signal: string; group?: string; within_days?: number; detail?: Record<string, string[]> }
  | { owner: string; is?: boolean; gte?: number; lt?: number }
  | { parcel: string; gte: number };

export interface RecipeRule {
  label: string;
  short_description: string;
  description: string;
  rationale?: string;
  when: Condition;
  requires_data?: string[];
}

export const CATALOG = catalog;
export const SCORING = scoring;
export const RECIPES = scoring.recipes as unknown as Record<string, RecipeRule>;

/** The 100-point ceiling comes from ARCHITECTURE.md: score = min(100, ...). */
export const SCORE_RULES: ScoreRules = {
  bonusPerExtraFamily: scoring.stacking.bonus_per_extra_family,
  stackingCap: scoring.stacking.cap,
  ownerCap: scoring.owner_modifiers.cap,
  maxScore: 100,
};

export function componentByKey(key: string) {
  const found = catalog.components.find((c) => c.key === key);
  if (!found) throw new Error(`Unknown score component: ${key}`);
  return found;
}

export const signalTypeLabel = (key: string): string => catalog.signal_types.find((s) => s.key === key)?.label ?? key;
export const groupLabel = (key: string): string => catalog.signal_groups.find((s) => s.key === key)?.label ?? key;

type SignalRule = {
  family: string;
  weight?: number;
  half_life_days?: number | null;
  by_group?: Record<string, { weight: number; half_life_days: number }>;
  values?: Record<string, number>;
};

/** Weight and half-life for a score component key such as "permit_approved:adu" or "owner:absentee". */
export function weightFor(key: string): { weight: string; halfLife: string; family: string } {
  const component = componentByKey(key);
  const family = component.family_label;
  const halfLife = (d: number | null | undefined) => (d ? `${d} days` : 'Does not decay');
  if (key.startsWith('owner:')) {
    return { weight: component.max_points === 0 ? '0 (context only)' : `Up to ${component.max_points}`, halfLife: 'Does not decay', family };
  }
  const [type, group] = key.split(':') as [string, string?];
  const rule = (scoring.signals as unknown as Record<string, SignalRule>)[type];
  if (!rule) throw new Error(`No scoring rule for ${key}`);
  if (group && rule.by_group) {
    const g = rule.by_group[group]!;
    return { weight: String(g.weight), halfLife: halfLife(g.half_life_days), family };
  }
  if (rule.values) {
    const values = Object.values(rule.values);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { weight: `${min} to ${max}, by ${type === 'fire_hazard_zone' ? 'hazard class' : 'distance to transit'}`, halfLife: halfLife(rule.half_life_days), family };
  }
  return { weight: rule.weight === 0 ? '0 (context only)' : String(rule.weight), halfLife: halfLife(rule.half_life_days), family };
}

const OWNER_PHRASES: Record<string, (c: { is?: boolean; gte?: number }) => string> = {
  absentee: (c) => (c.is ? 'The owner does not live at the property' : 'The owner lives at the property'),
  years_owned: (c) => `The current owner has held the property ${c.gte} years or more`,
  mortgage_open: (c) => (c.is ? 'A mortgage is open' : 'No mortgage is open'),
};

const days = (n: number) => (n % 365 === 0 ? `${n / 365 === 1 ? 'the last year' : `the last ${n / 365} years`}` : `the last ${n} days`);

/** A recipe's `when` rule as nested plain-English lines, generated from the config so it cannot drift. */
export type RuleLine = { text: string; children?: RuleLine[] };
export function describeCondition(c: Condition): RuleLine {
  if ('all' in c) return { text: 'All of these are true', children: c.all.map(describeCondition) };
  if ('any' in c) return { text: 'At least one of these is true', children: c.any.map(describeCondition) };
  if ('not' in c) return { text: 'This is not true', children: [describeCondition(c.not)] };
  if ('signal' in c) {
    const base = signalTypeLabel(c.signal);
    const parts = [base];
    if (c.group) parts.push(`in the "${groupLabel(c.group)}" group`);
    if (c.detail) parts.push(`(${Object.values(c.detail).flat().join(' or ')})`);
    if (c.within_days) parts.push(`dated within ${days(c.within_days)}`);
    return { text: parts.join(' ') };
  }
  if ('owner' in c) return { text: OWNER_PHRASES[c.owner]!(c) };
  return { text: `The lot is at least ${c.gte} times the median residential lot size of its planning area` };
}
