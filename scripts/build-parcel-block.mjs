// Selects one contiguous block of single-family parcels in the example planning area and writes it as SVG paths.
// Only drawing coordinates are written: no parcel numbers, addresses, owner fields or geographic coordinates.
// Source files are read in place and never modified.
// Usage: npm run parcels
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { readPolygons, readRows } from './lib/shapefile-stream.mjs';
import { toStatePlane } from './lib/stateplane.mjs';
import { cacheFile, insideRings, segmentDistance, simplifyRing } from './lib/geometry.mjs';
import { EXAMPLE_AREA } from './lib/example-area.mjs';

const fs = { readdirSync, join, homedir };
const zip = cacheFile('parcels', 'Parcels_shapefile.zip', fs);
const areas = JSON.parse(readFileSync(cacheFile('planning_areas', 'Community_Plan_SD.geojson', fs), 'utf8')).features;
const area = areas.find((f) => f.properties.CPNAME === EXAMPLE_AREA);
if (!area) throw new Error(`planning area ${EXAMPLE_AREA} not found`);
const areaRings = (area.geometry.type === 'Polygon' ? [area.geometry.coordinates] : area.geometry.coordinates).flat().map((r) => r.map(toStatePlane));

const SINGLE_FAMILY = '11';
const SIZE = [30, 50];
const SHARED_FEET = 1.5;
const WINDOW_FEET = 3500;

const areaPoints = areaRings.flat();
const center = [0, 1].map((i) => (Math.min(...areaPoints.map((p) => p[i])) + Math.max(...areaPoints.map((p) => p[i]))) / 2);

const shapes = new Map();
for await (const s of readPolygons(zip, 'Parcels.shp')) {
  const mid = [(s.bbox[0] + s.bbox[2]) / 2, (s.bbox[1] + s.bbox[3]) / 2];
  if (Math.abs(mid[0] - center[0]) > WINDOW_FEET || Math.abs(mid[1] - center[1]) > WINDOW_FEET) continue;
  if (!insideRings(mid, areaRings)) continue;
  const rings = s.rings();
  if (rings.length === 1) shapes.set(s.index, { index: s.index, bbox: s.bbox, mid, ring: rings[0] });
}
const rows = await readRows(zip, 'Parcels.dbf', new Set(shapes.keys()), ['ASR_LANDUS']);

const seen = new Set();
const homes = [...shapes.values()].filter((p) => {
  if (rows.get(p.index)?.ASR_LANDUS !== SINGLE_FAMILY) return false;
  const key = p.bbox.map(Math.round).join();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

/** Two parcels are neighbors when they run along each other, not merely touch at a corner. */
function touching(p, q) {
  const pad = SHARED_FEET;
  if (p.bbox[0] > q.bbox[2] + pad || q.bbox[0] > p.bbox[2] + pad || p.bbox[1] > q.bbox[3] + pad || q.bbox[1] > p.bbox[3] + pad) return false;
  const near = [];
  for (const [from, to] of [[p, q], [q, p]]) {
    for (const pt of from.ring) {
      if (to.ring.some((v, i) => i > 0 && segmentDistance(pt, to.ring[i - 1], v) <= pad)) near.push(pt);
    }
  }
  return near.some((u) => near.some((v) => Math.hypot(u[0] - v[0], u[1] - v[1]) > 20));
}

const links = homes.map(() => []);
for (let i = 0; i < homes.length; i += 1) for (let j = i + 1; j < homes.length; j += 1) if (touching(homes[i], homes[j])) { links[i].push(j); links[j].push(i); }

const visited = new Set();
const blocks = [];
for (let i = 0; i < homes.length; i += 1) {
  if (visited.has(i)) continue;
  const queue = [i];
  const members = [];
  visited.add(i);
  while (queue.length) {
    const at = queue.pop();
    members.push(at);
    for (const next of links[at]) if (!visited.has(next)) { visited.add(next); queue.push(next); }
  }
  if (members.length >= SIZE[0] && members.length <= SIZE[1]) blocks.push(members);
}
if (!blocks.length) throw new Error('no contiguous block in the size range; widen WINDOW_FEET');

const ringArea = (ring) => Math.abs(ring.reduce((sum, [x, y], i) => { const [nx, ny] = ring[(i + 1) % ring.length]; return sum + x * ny - nx * y; }, 0) / 2);

// Turn each candidate to its tightest box, then prefer a full, landscape shape that suits the page layouts.
function layout(members) {
  const points = members.flatMap((i) => homes[i].ring);
  let best;
  for (let degrees = 0; degrees < 180; degrees += 1) {
    const r = (degrees * Math.PI) / 180;
    const turned = points.map(([x, y]) => [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]);
    const w = Math.max(...turned.map((p) => p[0])) - Math.min(...turned.map((p) => p[0]));
    const h = Math.max(...turned.map((p) => p[1])) - Math.min(...turned.map((p) => p[1]));
    if (w >= h && (!best || w * h < best.w * best.h)) best = { r, w, h };
  }
  const fill = members.reduce((sum, i) => sum + ringArea(homes[i].ring), 0) / (best.w * best.h);
  return { members, ...best, score: fill - Math.abs(best.w / best.h - 1.45) * 0.35 };
}
const chosen = blocks.map(layout).sort((x, y) => y.score - x.score)[0];

// A slight tilt keeps the drawing from reading as a grid of boxes. Y is flipped for SVG.
const tilt = chosen.r - (7 * Math.PI) / 180;
const turn = ([x, y]) => [x * Math.cos(tilt) - y * Math.sin(tilt), -(x * Math.sin(tilt) + y * Math.cos(tilt))];
const turned = chosen.members.map((i) => homes[i].ring.map(turn));
const all = turned.flat();
const min = [0, 1].map((i) => Math.min(...all.map((p) => p[i])));
const max = [0, 1].map((i) => Math.max(...all.map((p) => p[i])));
const WIDTH = 1000;
const MARGIN = 12;
const scale = (WIDTH - MARGIN * 2) / (max[0] - min[0]);
const height = Math.ceil((max[1] - min[1]) * scale + MARGIN * 2);
const fmt = (v) => Math.round(v * 10) / 10;

const parcels = turned.map((ring) => {
  const points = simplifyRing(ring.map(([x, y]) => [(x - min[0]) * scale + MARGIN, (y - min[1]) * scale + MARGIN]), 1.2).slice(0, -1);
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  return {
    d: `M${points.map((p) => `${fmt(p[0])} ${fmt(p[1])}`).join('L')}Z`,
    c: [fmt((Math.min(...xs) + Math.max(...xs)) / 2), fmt((Math.min(...ys) + Math.max(...ys)) / 2)],
  };
}).sort((p, q) => p.c[1] - q.c[1] || p.c[0] - q.c[0]);

const nearest = (target, taken) => parcels
  .map((p, i) => ({ i, d: Math.hypot(p.c[0] - target[0] * WIDTH, p.c[1] - target[1] * height) }))
  .filter((x) => !taken.has(x.i))
  .sort((x, y) => x.d - y.d)[0].i;

const taken = new Set();
const pick = (target) => { const i = nearest(target, taken); taken.add(i); return i; };
const subject = pick([0.5, 0.52]);
const filled = [['immediate', [0.24, 0.3]], ['priority', [0.72, 0.34]], ['watchlist', [0.3, 0.75]], ['monitor', [0.78, 0.72]]]
  .map(([tier, target]) => ({ index: pick(target), tier }));

writeFileSync('src/data/parcel-block.json', `${JSON.stringify({ width: WIDTH, height, count: parcels.length, subject, subjectCenter: parcels[subject].c, filled, paths: parcels.map((p) => p.d) })}\n`);
console.log(`${blocks.length} candidate blocks; chose ${parcels.length} parcels, ${WIDTH}x${height}`);
