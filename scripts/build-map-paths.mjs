// Projects and simplifies the City planning-area file into SVG path strings at build-prep time. No map library.
// Only geometry is written: no names, codes or other properties, so no area can be singled out (DECISIONS.md S2).
// Usage: npm run map -- [path/to/Community_Plan_SD.geojson]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const cacheRoot = join(homedir(), 'territory-signals/data/raw/planning_areas');
const source = process.argv[2] ?? join(cacheRoot, readdirSync(cacheRoot).sort().at(-1), 'Community_Plan_SD.geojson');
const { features } = JSON.parse(readFileSync(source, 'utf8'));

const WIDTH = 800;
const TOLERANCE = 0.9; // viewBox units
const polygons = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);
const all = features.flatMap((f) => polygons(f.geometry).flatMap((p) => p[0]));
const lons = all.map((c) => c[0]);
const lats = all.map((c) => c[1]);
const [minX, maxX, minY, maxY] = [Math.min(...lons), Math.max(...lons), Math.min(...lats), Math.max(...lats)];
const k = Math.cos((((minY + maxY) / 2) * Math.PI) / 180);
const scale = WIDTH / ((maxX - minX) * k);
const height = Math.ceil((maxY - minY) * scale);
const project = ([lon, lat]) => [(lon - minX) * k * scale, (maxY - lat) * scale];

function simplify(points) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const len = Math.hypot(bx - ax, by - ay);
  let max = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i];
    const d = len === 0 ? Math.hypot(px - ax, py - ay) : Math.abs((by - ay) * px - (bx - ax) * py + bx * ay - by * ax) / len;
    if (d > max) { max = d; index = i; }
  }
  if (max <= TOLERANCE) return [points[0], points[points.length - 1]];
  return [...simplify(points.slice(0, index + 1)).slice(0, -1), ...simplify(points.slice(index))];
}

const fmt = (n) => String(Math.round(n * 10) / 10);
const ringPath = (ring) => {
  const pts = ring.map(project);
  // A closed ring starts and ends on one point, so split it before simplifying.
  const mid = Math.floor(pts.length / 2);
  const out = [...simplify(pts.slice(0, mid + 1)).slice(0, -1), ...simplify(pts.slice(mid))];
  if (out.length < 4) return '';
  return `M${out.slice(0, -1).map((p) => `${fmt(p[0])} ${fmt(p[1])}`).join('L')}Z`;
};

const paths = features.map((f) => {
  const rings = polygons(f.geometry).flat();
  const d = rings.map(ringPath).join('');
  if (d) return d;
  // A shape smaller than the tolerance keeps its full outline so every area is still drawn.
  return rings.map((r) => `M${r.slice(0, -1).map((c) => project(c).map(fmt).join(' ')).join('L')}Z`).join('');
});

writeFileSync('src/data/map-paths.json', `${JSON.stringify({ width: WIDTH, height, count: paths.length, paths })}\n`);
console.log(`${paths.length} shapes, ${WIDTH}x${height}, ${(JSON.stringify(paths).length / 1024).toFixed(1)} KB`);
