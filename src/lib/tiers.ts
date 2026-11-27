/** The product's four display tiers (dashboard/src/lib/ring.ts, DECISIONS.md D19). Colors live in tokens.css. */
export type TierKey = 'immediate' | 'priority' | 'watchlist' | 'monitor';
export const TIERS: readonly { key: TierKey; label: string; min: number; max: number }[] = [
  { key: 'immediate', label: 'Immediate', min: 80, max: 100 },
  { key: 'priority', label: 'Priority', min: 65, max: 79 },
  { key: 'watchlist', label: 'Active Watchlist', min: 45, max: 64 },
  { key: 'monitor', label: 'Monitor', min: 0, max: 44 },
];
export const tierOf = (score: number) => TIERS.find((t) => score >= t.min) ?? TIERS[TIERS.length - 1]!;
