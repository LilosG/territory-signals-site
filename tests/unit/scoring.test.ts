// Expected values are worked by hand from config/scoring.yaml and the formula in ARCHITECTURE.md.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { computeScore, decayFactor, type ScoreInput, type ScoreRules } from '../../src/lib/scoring.ts';

const scoring = JSON.parse(readFileSync(new URL('../../src/data/product-scoring.json', import.meta.url), 'utf8'));
const rules: ScoreRules = { bonusPerExtraFamily: scoring.stacking.bonus_per_extra_family, stackingCap: scoring.stacking.cap, ownerCap: scoring.owner_modifiers.cap, maxScore: 100 };
const sig = (key: string, family: string, weight: number, halfLifeDays: number | null, ageDays = 0, confidence = 1, ownerModifier = false): ScoreInput => ({ key, family, weight, halfLifeDays, ageDays, confidence, ownerModifier });
const close = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} is not ${b}`);

test('the vendored rules hold the values the hand calculations use', () => {
  const s = scoring.signals;
  assert.deepEqual([rules.bonusPerExtraFamily, rules.stackingCap, rules.ownerCap], [0.15, 0.45, 40]);
  assert.deepEqual(s.permit_approved.by_group.pre_sale_prep, { weight: 36, half_life_days: 120 });
  assert.deepEqual([s.stro_license_removed.weight, s.stro_license_removed.half_life_days], [40, 90]);
  assert.deepEqual([s.tax_default.weight, s.tax_default.half_life_days], [40, 365]);
  assert.equal(s.sb9_lot_split_estimate.weight, 14);
  assert.equal(scoring.owner_modifiers.mortgage_open_false.weight, 13);
});

test('decay halves a weight at one half-life and never touches static or future signals', () => {
  assert.equal(decayFactor(90, 90), 0.5);
  assert.equal(decayFactor(180, 90), 0.25);
  assert.equal(decayFactor(500, null), 1);
  assert.equal(decayFactor(-3, 90), 1);
});

test('worked example: 36 x 0.5^(60/120) x 0.95 + 7 + 13 + 13, three families, is 74', () => {
  const r = computeScore([
    sig('permit_approved:pre_sale_prep', 'permits', 36, 120, 60, 0.95),
    sig('sb9_lot_split_estimate', 'upzoning', 14, null, 0, 0.5),
    sig('owner:years_owned', 'owner', 13, null, 0, 1, true),
    sig('owner:mortgage_open_false', 'owner', 13, null, 0, 1, true),
  ], rules);
  close(r.components[0]!.contribution, 24.18);
  close(r.weightedSum, 57.18);
  assert.equal(r.families.length, 3);
  close(r.multiplier, 1.3);
  assert.equal(r.score, 74);
});

test('tax default one year old plus an SB 9 estimate: (20 + 7) x 1.15 = 31.05, shown as 31', () => {
  const r = computeScore([sig('tax_default', 'financial', 40, 365, 365), sig('sb9_lot_split_estimate', 'upzoning', 14, null, 0, 0.5)], rules);
  assert.equal(r.score, 31);
});

test('one family gets no stacking bonus', () => {
  const r = computeScore([sig('stro_license_removed', 'rental', 40, 90, 90)], rules);
  assert.equal(r.multiplier, 1);
  assert.equal(r.score, 20);
});

test('stacking caps at +45% and the score caps at 100', () => {
  const r = computeScore(['financial', 'rental', 'permits', 'upzoning', 'fire', 'owner'].map((f) => sig(f, f, 30, null)), rules);
  close(r.multiplier, 1.45);
  assert.equal(r.score, 100);
});

test('owner modifiers over 40 points are scaled by one factor: 20+15+13+6+6 = 60 becomes 40', () => {
  const r = computeScore([20, 15, 13, 6, 6].map((w, i) => sig(`o${i}`, 'owner', w, null, 0, 1, true)), rules);
  close(r.weightedSum, 40);
  close(r.components[0]!.contribution, 13.33);
  assert.equal(r.score, 40);
});

test('a zero-weight component does not count as a family', () => {
  const r = computeScore([sig('permit_stalled', 'permits', 27, 365), sig('inherit', 'owner', 0, null)], rules);
  assert.equal(r.families.length, 1);
  assert.equal(r.score, 27);
});

test('halves round up', () => {
  assert.equal(computeScore([sig('a', 'permits', 22.5, null)], rules).score, 23);
});

test('no signals score zero', () => {
  assert.equal(computeScore([], rules).score, 0);
});
