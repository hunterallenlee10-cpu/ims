// Shared math for the "data-wave" ribbon line art (site SVG + OG image).

export const WAVE_W = 1200; // one loop, in viewBox units
export const WAVE_H = 600;

/** One line of the ribbon. Spans two loops (0..2W) so a -50% drift loops seamlessly. */
export function ribbonPath(i: number, count: number, seed: number, w = WAVE_W, h = WAVE_H): string {
  const t = count > 1 ? i / (count - 1) : 0.5;
  const mid = h * (0.5 + 0.08 * Math.sin(seed));
  const amp1 = (110 + 40 * Math.sin(seed * 1.7)) * (h / WAVE_H);
  const amp2 = (28 + 22 * t) * (h / WAVE_H);
  const phase = seed + t * 1.1;
  const k1 = (2 * Math.PI) / w;
  const k2 = (2 * Math.PI * 3) / w;
  const spread = (t - 0.5) * 70 * (h / WAVE_H);

  // Sample sparsely, then draw a smooth Catmull-Rom curve through the points.
  // Far fewer bytes than a dense polyline, with the same look.
  const step = 80;
  const pts: [number, number][] = [];
  for (let x = -step; x <= w * 2 + step; x += step) {
    pts.push([x, mid + spread + amp1 * Math.sin(k1 * x + phase) + amp2 * Math.sin(k2 * x + phase * 2.3)]);
  }
  const r = (n: number) => Math.round(n);
  let d = `M${r(pts[1][0])} ${r(pts[1][1])}`;
  for (let i = 1; i < pts.length - 2; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}
