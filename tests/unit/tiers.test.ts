import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tierOf } from '../../src/lib/tiers.ts';

test('display tiers follow the product cut-offs (D19)', () => {
  const cases: [number, string][] = [[100, 'immediate'], [80, 'immediate'], [79, 'priority'], [65, 'priority'], [64, 'watchlist'], [45, 'watchlist'], [44, 'monitor'], [0, 'monitor']];
  for (const [score, key] of cases) assert.equal(tierOf(score).key, key, String(score));
});
