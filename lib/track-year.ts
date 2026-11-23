import { trackRecord, trackRecordData } from "@/content/track-record";

const toTime = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export const fmtUsd = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

export const fmtDate = (iso: string) =>
  new Date(toTime(iso)).toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" });

const signedPct = (p: number) => `${p >= 0 ? "+" : "−"}${Math.abs(Math.round(p))}%`;

/**
 * Portfolio Signal results for one calendar year of the track record:
 * value at the start and end of the year, the year's return, and the return since day one.
 */
export function yearStats(year: number) {
  const data = trackRecordData;
  const inYear = data.filter((d) => d[0].startsWith(`${year}-`));
  if (!inYear.length) return null;
  const before = data.filter((d) => d[0] < `${year}-01-01`).at(-1);
  const start = before ?? inYear[0];
  const end = inYear.at(-1)!;
  const last = data.at(-1)!;
  return {
    year,
    startDate: start[0],
    startValue: start[1],
    endDate: end[0],
    endValue: end[1],
    yearPct: signedPct((end[1] / start[1] - 1) * 100),
    totalPct: signedPct((end[1] / trackRecord.start - 1) * 100),
    isFirst: !before,
    isLatest: end === last,
  };
}

/**
 * SVG paths for the whole track record up to the end of `year`, drawn on the full
 * date range so the line grows chapter by chapter. Earlier years and this year are separate.
 */
export function yearPaths(year: number, w: number, h: number, pad = { top: 12, bottom: 6, right: 18 }) {
  const data = trackRecordData;
  const t0 = toTime(data[0][0]);
  const t1 = toTime(data.at(-1)![0]);
  const yMax = Math.max(...data.map((d) => d[1])) * 1.06;
  const yMin = trackRecord.start * 0.8;
  const x = (iso: string) => ((toTime(iso) - t0) / (t1 - t0)) * (w - pad.right);
  const y = (v: number) => pad.top + (1 - (v - yMin) / (yMax - yMin)) * (h - pad.top - pad.bottom);

  const upTo = data.filter((d) => d[0] <= `${year}-12-31`);
  const prevIdx = upTo.findIndex((d) => d[0] >= `${year}-01-01`);
  const earlier = prevIdx > 0 ? upTo.slice(0, prevIdx) : [];
  const current = prevIdx > 0 ? upTo.slice(prevIdx - 1) : upTo;

  const line = (pts: typeof data) => pts.map((d, i) => `${i ? "L" : "M"}${x(d[0]).toFixed(1)} ${y(d[1]).toFixed(1)}`).join("");
  const area = (pts: typeof data) =>
    pts.length ? `${line(pts)}L${x(pts.at(-1)![0]).toFixed(1)} ${h}L${x(pts[0][0]).toFixed(1)} ${h}Z` : "";
  const end = upTo.at(-1)!;
  return {
    earlier: earlier.length ? line(earlier) : "",
    current: line(current),
    currentArea: area(current),
    baseline: y(trackRecord.start),
    /** End point as a percentage of the box, for placing an HTML dot over a stretched SVG. */
    end: { left: (x(end[0]) / w) * 100, top: (y(end[1]) / h) * 100 },
  };
}
