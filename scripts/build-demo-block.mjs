/**
 * Writes src/data/parcel-block-demo.json: an invented residential block for illustrations that highlight a lot.
 * The lots are generated along a made-up curved street with a seeded random, so the output is stable and traces no
 * real parcel. The real SanGIS block (parcel-block.json) is used only as unhighlighted texture.
 *
 *   node scripts/build-demo-block.mjs
 */
import { writeFileSync } from 'node:fs';

const W = 1000;
const H = 720;

let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const jitter = (n) => (rand() - 0.5) * 2 * n;

/** Centerline of the street: a gentle curve across the sheet. */
const center = (t) => {
  const x = 40 + t * 920;
  const y = 400 - Math.sin(t * Math.PI) * 60 + t * 30;
  return [x, y];
};
/** Unit normal of the centerline at t (pointing up the sheet). */
const normal = (t) => {
  const [x1, y1] = center(Math.max(0, t - 0.001));
  const [x2, y2] = center(Math.min(1, t + 0.001));
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  return [dy / len, -dx / len];
};
const offset = (t, d) => {
  const [x, y] = center(t);
  const [nx, ny] = normal(t);
  return [x + nx * d, y + ny * d];
};

/** Split [0,1] into n lots of uneven width. */
const cuts = (n) => {
  const w = Array.from({ length: n }, () => 0.75 + rand() * 0.5);
  const total = w.reduce((a, b) => a + b, 0);
  const out = [0];
  w.reduce((acc, x) => (out.push((acc + x) / total), acc + x), 0);
  return out;
};

const STREET = 30;
const lots = [];
const row = (side, n, depthMin, depthMax) => {
  const c = cuts(n);
  const depths = c.map(() => depthMin + rand() * (depthMax - depthMin));
  for (let i = 0; i < n; i++) {
    const t0 = c[i];
    const t1 = c[i + 1];
    const skew0 = i === 0 ? 0 : jitter(0.006);
    const skew1 = i === n - 1 ? 0 : jitter(0.006);
    const pts = [
      offset(t0, side * STREET),
      offset(t1, side * STREET),
      offset(t1 + skew1, side * (STREET + depths[i + 1])),
      offset(t0 + skew0, side * (STREET + depths[i])),
    ];
    lots.push(pts);
  }
};
row(1, 8, 250, 310);
row(-1, 7, 240, 300);

const fmt = (n) => Math.round(n * 10) / 10;
const toPath = (pts) => `M${pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L')}Z`;

// Fit everything into the sheet with a margin.
const all = lots.flat();
const minX = Math.min(...all.map((p) => p[0]));
const minY = Math.min(...all.map((p) => p[1]));
const maxX = Math.max(...all.map((p) => p[0]));
const maxY = Math.max(...all.map((p) => p[1]));
const scale = Math.min(W / (maxX - minX), H / (maxY - minY));
const fit = (pts) => pts.map(([x, y]) => [(x - minX) * scale, (y - minY) * scale]);
const fitted = lots.map(fit);
const width = fmt((maxX - minX) * scale);
const height = fmt((maxY - minY) * scale);

const subject = 11; // a lot on the lower side of the street, right of center
const centroid = (pts) => [fmt(pts.reduce((a, p) => a + p[0], 0) / pts.length), fmt(pts.reduce((a, p) => a + p[1], 0) / pts.length)];

const out = {
  note: 'Invented block for illustration. It traces no real parcel.',
  width,
  height,
  count: fitted.length,
  subject,
  subjectCenter: centroid(fitted[subject]),
  filled: [
    { index: 2, tier: 'immediate' },
    { index: 5, tier: 'priority' },
    { index: 9, tier: 'watchlist' },
    { index: 13, tier: 'monitor' },
  ],
  paths: fitted.map(toPath),
};
writeFileSync(new URL('../src/data/parcel-block-demo.json', import.meta.url), `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${out.count} lots, ${width}x${height}, subject ${subject}`);
