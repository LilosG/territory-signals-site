export const cacheFile = (folder, name, { readdirSync, join, homedir }) => {
  const root = join(homedir(), 'territory-signals/data/raw', folder);
  return join(root, readdirSync(root).sort().at(-1), name);
};

/** Even-odd test across every ring of a polygon or multipolygon. */
export function insideRings([x, y], rings) {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

export function segmentDistance([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = dx * dx + dy * dy;
  const k = len === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len));
  return Math.hypot(px - ax - k * dx, py - ay - k * dy);
}

export function simplify(points, tolerance) {
  if (points.length < 3) return points;
  let max = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const d = segmentDistance(points[i], points[0], points[points.length - 1]);
    if (d > max) { max = d; index = i; }
  }
  if (max <= tolerance) return [points[0], points[points.length - 1]];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

/** Simplifies a closed ring (first point repeated last) by splitting it first. */
export function simplifyRing(ring, tolerance) {
  const mid = Math.floor(ring.length / 2);
  return [...simplify(ring.slice(0, mid + 1), tolerance).slice(0, -1), ...simplify(ring.slice(mid), tolerance)];
}
