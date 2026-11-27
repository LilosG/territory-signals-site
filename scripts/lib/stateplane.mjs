// NAD83 State Plane California Zone VI (US survey feet), the projection named in the SanGIS Parcels.prj.
const D = Math.PI / 180;
const FOOT = 0.3048006096012192;
const a = 6378137 / FOOT;
const f = 1 / 298.257222101;
const e = Math.sqrt(2 * f - f * f);
const m = (p) => Math.cos(p) / Math.sqrt(1 - (e * Math.sin(p)) ** 2);
const t = (p) => Math.tan(Math.PI / 4 - p / 2) / (((1 - e * Math.sin(p)) / (1 + e * Math.sin(p))) ** (e / 2));
const p1 = 32.783333333333331 * D;
const p2 = 33.883333333333333 * D;
const l0 = -116.25 * D;
const n = Math.log(m(p1) / m(p2)) / Math.log(t(p1) / t(p2));
const F = m(p1) / (n * t(p1) ** n);
const r0 = a * F * t(32.166666666666664 * D) ** n;
const E0 = 6561666.666666666;
const N0 = 1640416.666666667;

export function toStatePlane([lon, lat]) {
  const r = a * F * t(lat * D) ** n;
  const theta = n * (lon * D - l0);
  return [E0 + r * Math.sin(theta), N0 + r0 - r * Math.cos(theta)];
}

export function toLonLat([x, y]) {
  const dx = x - E0;
  const dy = r0 - (y - N0);
  const ts = (Math.hypot(dx, dy) / (a * F)) ** (1 / n);
  let phi = Math.PI / 2 - 2 * Math.atan(ts);
  for (let i = 0; i < 6; i += 1) phi = Math.PI / 2 - 2 * Math.atan(ts * ((1 - e * Math.sin(phi)) / (1 + e * Math.sin(phi))) ** (e / 2));
  return [(Math.atan2(dx, dy) / n + l0) / D, phi / D];
}
