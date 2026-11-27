/**
 * Browser-safe port of the product's deterministic scoring arithmetic (ARCHITECTURE.md "Scoring",
 * config/scoring.yaml, pipelines/territory/scoring_engine.py). No clock, no randomness, no AI.
 */
export interface ScoreInput {
  key: string;
  family: string;
  weight: number;
  /** null means a static signal that does not decay. */
  halfLifeDays: number | null;
  ageDays: number;
  /** Match confidence from 0 to 1. Owner modifiers use 1. */
  confidence: number;
  ownerModifier?: boolean;
}
export interface ScoreRules {
  bonusPerExtraFamily: number;
  stackingCap: number;
  ownerCap: number;
  maxScore: number;
}
export interface ScoreComponent extends ScoreInput {
  decay: number;
  contribution: number;
}
export interface ScoreResult {
  components: ScoreComponent[];
  weightedSum: number;
  families: string[];
  multiplier: number;
  score: number;
}

export const decayFactor = (ageDays: number, halfLifeDays: number | null): number =>
  halfLifeDays === null || ageDays <= 0 ? 1 : 0.5 ** (ageDays / halfLifeDays);

export const stackingMultiplier = (familyCount: number, rules: ScoreRules): number =>
  1 + Math.min(rules.stackingCap, rules.bonusPerExtraFamily * Math.max(0, familyCount - 1));

export function computeScore(inputs: ScoreInput[], rules: ScoreRules): ScoreResult {
  const components: ScoreComponent[] = inputs.map((i) => {
    const decay = decayFactor(i.ageDays, i.halfLifeDays);
    return { ...i, decay, contribution: i.weight * decay * i.confidence };
  });
  // Over the cap, every owner component is scaled by the same factor.
  const ownerTotal = components.filter((c) => c.ownerModifier).reduce((sum, c) => sum + c.contribution, 0);
  if (ownerTotal > rules.ownerCap) {
    for (const c of components) if (c.ownerModifier) c.contribution *= rules.ownerCap / ownerTotal;
  }
  const weightedSum = components.reduce((sum, c) => sum + c.contribution, 0);
  const families = [...new Set(components.filter((c) => c.contribution > 0).map((c) => c.family))].sort();
  const multiplier = stackingMultiplier(families.length, rules);
  // Round half up, after removing binary floating-point noise.
  const score = Math.min(rules.maxScore, Math.floor(Number((weightedSum * multiplier).toFixed(6)) + 0.5));
  return { components, weightedSum, families, multiplier, score };
}
