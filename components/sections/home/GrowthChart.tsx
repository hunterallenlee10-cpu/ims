"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { trackRecord, trackRecordData } from "@/content/track-record";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = (v: number, start: number) => {
  const p = Math.round(((v - start) / start) * 100);
  return `${p >= 0 ? "+" : "−"}${Math.abs(p)}%`;
};
const toTime = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(toTime(iso)).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
const fmtK = (v: number) => `$${Math.round(v / 1000)}k`;

const SURFACE = "#0F2033"; // --panel, used for the ring around dots

/** Growth of $10,000: Portfolio Signal vs S&P 500, with a crosshair readout and a table view. */
export function GrowthChart() {
  const { series, start, disclosure } = trackRecord;
  const data = trackRecordData;
  const last = data[data.length - 1];

  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = width > 0 && width < 560;
  const height = width ? Math.round(Math.min(440, Math.max(280, width * 0.46))) : 0;
  const m = { top: 16, right: compact ? 14 : 132, bottom: 32, left: 48 };
  const iw = Math.max(0, width - m.left - m.right);
  const ih = Math.max(0, height - m.top - m.bottom);

  const geo = useMemo(() => {
    const t0 = toTime(data[0][0]);
    const t1 = toTime(last[0]);
    const maxV = Math.max(...data.map((d) => Math.max(d[1], d[2])));
    const yMax = Math.ceil(maxV / 10000) * 10000;
    const yMin = 0;
    const x = (iso: string) => ((toTime(iso) - t0) / (t1 - t0)) * iw;
    const y = (v: number) => ih - ((v - yMin) / (yMax - yMin)) * ih;
    const xs = data.map((d) => x(d[0]));
    const path = (k: 1 | 2) => data.map((d, i) => `${i ? "L" : "M"}${xs[i].toFixed(1)} ${y(d[k]).toFixed(1)}`).join("");
    const yTicks: number[] = [];
    for (let v = yMin; v <= yMax; v += 10000) yTicks.push(v);
    const xTicks: { iso: string; label: string }[] = [];
    for (let yr = new Date(t0).getUTCFullYear() + 1; Date.UTC(yr, 0, 1) < t1; yr++) {
      xTicks.push({ iso: `${yr}-01-01`, label: compact ? `’${String(yr).slice(2)}` : `Jan ${yr}` });
    }
    return { x, y, xs, paths: [path(1), path(2)], yTicks, xTicks };
  }, [data, last, iw, ih, compact]);

  const nearest = (px: number) => {
    const xs = geo.xs;
    let lo = 0;
    let hi = xs.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (xs[mid] < px) lo = mid;
      else hi = mid;
    }
    return px - xs[lo] < xs[hi] - px ? lo : hi;
  };

  const onPointer = (e: PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    setActive(nearest(e.clientX - box.left));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1;
    const cur = active ?? data.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = Math.min(data.length - 1, cur + step);
    else if (e.key === "ArrowLeft") next = Math.max(0, cur - step);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = data.length - 1;
    else if (e.key === "Escape") return setActive(null);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
  };

  // Monthly rows for the table view (first point of each month, plus the latest).
  const monthly = useMemo(() => {
    const rows = data.filter((d, i) => i === 0 || d[0].slice(0, 7) !== data[i - 1][0].slice(0, 7));
    if (rows[rows.length - 1] !== last) rows.push(last);
    return rows;
  }, [data, last]);

  const a = active === null ? null : data[active];
  const ax = active === null ? 0 : geo.xs[active];
  // Readout sits beside the crosshair and never leaves the chart area.
  const TIP_W = 212;
  const cross = m.left + ax;
  let tipLeft = cross + 12;
  if (tipLeft + TIP_W > width) tipLeft = cross - 12 - TIP_W;
  tipLeft = Math.max(0, Math.min(tipLeft, width - TIP_W));

  const endLabels = series.map((s, i) => ({ s, v: last[i + 1] as number, y: geo.y(last[i + 1] as number) }));
  // Keep the two end labels from colliding.
  if (endLabels.length === 2 && Math.abs(endLabels[0].y - endLabels[1].y) < 34) {
    const [hi, lo] = endLabels[0].y < endLabels[1].y ? [endLabels[0], endLabels[1]] : [endLabels[1], endLabels[0]];
    lo.y = hi.y + 34;
  }

  return (
    <div className="frame p-5 [--cut:22px] sm:p-8">
      {/* Headline numbers; doubles as the legend */}
      <dl className="grid gap-6 sm:grid-cols-2">
        {series.map((s, i) => {
          const v = last[i + 1] as number;
          return (
            <div key={s.key} className="border-l-2 border-panel-line pl-4">
              <dt className="flex items-center gap-2.5 text-sm font-medium text-body">
                <span aria-hidden="true" className="inline-block h-[3px] w-6 rounded-full" style={{ background: s.color }} />
                {s.label}
              </dt>
              <dd className="mt-2 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none tabular-nums text-heading">{usd.format(v)}</span>
                <span className="font-semibold tabular-nums text-body">{pct(v, start)}</span>
              </dd>
            </div>
          );
        })}
      </dl>

      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-label={`Line chart: $10,000 invested on ${fmtDate(data[0][0])}. By ${fmtDate(last[0])} the Portfolio Signal reached ${usd.format(last[1])} and the S&P 500 ${usd.format(last[2])}. Use the left and right arrow keys to read values by date.`}
        onKeyDown={onKey}
        onBlur={() => setActive(null)}
        className="relative mt-8 rounded-site-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
        style={{ height: height || 320 }}
      >
        {width ? (
          <svg width={width} height={height} className="block select-none" aria-hidden="true">
            <g transform={`translate(${m.left},${m.top})`}>
              {/* Grid and y axis */}
              {geo.yTicks.map((v) => (
                <g key={v}>
                  <line x1={0} x2={iw} y1={geo.y(v)} y2={geo.y(v)} stroke="var(--line)" strokeWidth={1} />
                  <text x={-10} y={geo.y(v)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px] tabular-nums">
                    {fmtK(v)}
                  </text>
                </g>
              ))}
              {/* Starting $10,000 */}
              <line x1={0} x2={iw} y1={geo.y(start)} y2={geo.y(start)} stroke="var(--panel-line)" strokeWidth={1.5} strokeDasharray="4 4" />
              {!compact ? (
                <text x={iw - 6} y={geo.y(start) + 15} textAnchor="end" className="fill-muted text-[11px]">
                  Started with $10,000
                </text>
              ) : null}
              {/* X axis */}
              {geo.xTicks.map((t) => (
                <g key={t.iso}>
                  <line x1={geo.x(t.iso)} x2={geo.x(t.iso)} y1={ih} y2={ih + 5} stroke="var(--panel-line)" />
                  <text x={geo.x(t.iso)} y={ih + 20} textAnchor="middle" className="fill-muted text-[11px]">
                    {t.label}
                  </text>
                </g>
              ))}
              <line x1={0} x2={iw} y1={ih} y2={ih} stroke="var(--panel-line)" />

              {/* Lines: S&P first so the Signal line sits on top */}
              {[1, 0].map((i) => (
                <path
                  key={series[i].key}
                  d={geo.paths[i]}
                  fill="none"
                  stroke={series[i].color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}

              {/* End dots and direct labels */}
              {series.map((s, i) => (
                <circle key={s.key} cx={iw} cy={geo.y(last[i + 1] as number)} r={4.5} fill={s.color} stroke={SURFACE} strokeWidth={2} />
              ))}
              {!compact
                ? endLabels.map(({ s, v, y }) => (
                    <g key={s.key} transform={`translate(${iw + 12},${y})`}>
                      <text dy="-0.2em" className="fill-heading text-[13px] font-semibold tabular-nums">
                        {usd.format(v)}
                      </text>
                      <text dy="1.1em" className="fill-muted text-[11px]">
                        {s.label}
                      </text>
                    </g>
                  ))
                : null}

              {/* Crosshair */}
              {a ? (
                <g>
                  <line x1={ax} x2={ax} y1={0} y2={ih} stroke="var(--fg-muted)" strokeOpacity={0.6} strokeWidth={1} />
                  {series.map((s, i) => (
                    <circle key={s.key} cx={ax} cy={geo.y(a[i + 1] as number)} r={4.5} fill={s.color} stroke={SURFACE} strokeWidth={2} />
                  ))}
                </g>
              ) : null}

              {/* Hit area larger than the marks */}
              <rect
                x={0}
                y={0}
                width={iw}
                height={ih}
                fill="transparent"
                style={{ touchAction: "pan-y" }}
                onPointerMove={onPointer}
                onPointerDown={onPointer}
                onPointerLeave={() => setActive(null)}
              />
            </g>
          </svg>
        ) : null}

        {a ? (
          <div
            role="status"
            className="pointer-events-none absolute top-2 z-10 border border-panel-line bg-bg/95 px-3.5 py-3 text-sm shadow-lg backdrop-blur"
            style={{ left: tipLeft, width: TIP_W }}
          >
            <p className="mono-label text-muted">{fmtDate(a[0])}</p>
            <ul className="mt-2 space-y-1.5">
              {series.map((s, i) => (
                <li key={s.key} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 whitespace-nowrap text-body">
                    <span aria-hidden="true" className="inline-block h-[3px] w-4 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-semibold tabular-nums text-heading">{usd.format(a[i + 1] as number)}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <p className="mt-6 border-t border-panel-line pt-4 text-xs leading-relaxed text-muted">{disclosure}</p>

      <details className="group mt-4 text-sm">
        <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-accent-light hover:text-accent-lighter">
          View as a table
        </summary>
        <div className="mt-3 max-h-80 overflow-auto border border-panel-line">
          <table className="w-full text-left tabular-nums">
            <caption className="sr-only">Value of $10,000 by month</caption>
            <thead className="sticky top-0 bg-panel text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Date</th>
                {series.map((s) => (
                  <th key={s.key} scope="col" className="px-3 py-2 text-right font-medium">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.map((d) => (
                <tr key={d[0]} className="border-t border-panel-line/60">
                  <td className="px-3 py-1.5 text-body">{fmtDate(d[0])}</td>
                  <td className="px-3 py-1.5 text-right text-heading">{usd.format(d[1])}</td>
                  <td className="px-3 py-1.5 text-right text-heading">{usd.format(d[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
