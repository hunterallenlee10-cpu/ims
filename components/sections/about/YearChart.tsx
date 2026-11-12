import { fmtDate, fmtUsd, yearPaths, yearStats } from "@/lib/track-year";

const W = 640;
const H = 260;

/**
 * Rendered "photo" for a timeline chapter: where $10,000 in the Portfolio Signal stood at the
 * end of that year, the year's return, and the track record line up to that point.
 * Drawn from content/track-record.ts, so it updates with the data. No image request.
 */
export function YearChart({ year }: { year: number }) {
  const s = yearStats(year);
  if (!s) return null;
  const p = yearPaths(year, W, H);
  const id = `yc-${year}`;
  const label = `Growth of $10,000 in the Portfolio Signal: ${fmtUsd(s.startValue)} on ${fmtDate(s.startDate)} to ${fmtUsd(
    s.endValue,
  )} on ${fmtDate(s.endDate)}, ${s.yearPct} ${s.isLatest ? "year to date" : "for the year"}, ${s.totalPct} since August 28, 2023.`;

  return (
    <figure
      role="img"
      aria-label={label}
      className="frame relative flex aspect-[5/4] flex-col overflow-hidden p-4 [--cut:18px] sm:aspect-[16/10] sm:p-6"
      style={{ ["--fill" as string]: "var(--bg-lift-1)" }}
    >
      <div aria-hidden="true" className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="mono-label text-[0.625rem] text-eyebrow sm:text-xs">
            Growth of $10,000<span className="hidden sm:inline"> · {year}</span>
          </p>
          <p className="text-signature mt-1 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-none">{fmtUsd(s.endValue)}</p>
        </div>
        <span className="shrink-0 border border-up/50 bg-up/10 px-2 py-1 font-mono text-[0.6875rem] font-semibold text-up sm:text-xs">
          {s.yearPct} {s.isLatest ? "YTD" : "in " + year}
        </span>
      </div>

      <div aria-hidden="true" className="relative -mx-4 mt-2 flex-1 sm:-mx-6">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8a1ef1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8a1ef1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${id}-line`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#2ff0fe" />
              <stop offset="100%" stopColor="#b946fb" />
            </linearGradient>
          </defs>
          <line x1="0" x2={W} y1={p.baseline} y2={p.baseline} stroke="var(--panel-line)" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          {p.earlier ? (
            <path d={p.earlier} fill="none" stroke="var(--fg-muted)" strokeOpacity="0.45" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ) : null}
          <path d={p.currentArea} fill={`url(#${id}-fill)`} />
          <path d={p.current} fill="none" stroke={`url(#${id}-line)`} strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-lighter bg-accent shadow-[0_0_16px_var(--accent-glow)]"
          style={{ left: `${p.end.left}%`, top: `${p.end.top}%` }}
        />
      </div>

      <p aria-hidden="true" className="relative z-10 mt-2 flex justify-between gap-3 font-mono text-[0.625rem] text-muted sm:text-[0.6875rem]">
        <span className="hidden sm:inline">{s.isFirst ? `Start ${fmtDate(s.startDate)}` : `${fmtUsd(s.startValue)} on ${fmtDate(s.startDate)}`}</span>
        <span className="ml-auto whitespace-nowrap text-accent-lighter">{s.totalPct} since day one</span>
      </p>
    </figure>
  );
}
