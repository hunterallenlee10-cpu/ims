import { home } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

// Stylized dashboard. Every value comes from content/home.ts and is EXAMPLE DATA.

function polar(z: number, r: number) {
  const theta = Math.PI - ((z + 3) / 6) * Math.PI; // z in [-3, 3] → 180°..0°
  return { x: 100 + r * Math.cos(theta), y: 100 - r * Math.sin(theta) };
}

export function ZScoreGauge({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(-3, Math.min(3, value));
  const tip = polar(clamped, 62);
  const ticks = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <svg viewBox="0 0 200 118" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gauge-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2FF0FE" />
          <stop offset="0.5" stopColor="#1697F4" />
          <stop offset="1" stopColor="#8A1EF1" />
        </linearGradient>
      </defs>
      <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#213854" strokeWidth="10" strokeLinecap="round" />
      <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#gauge-grad)" strokeWidth="3" strokeLinecap="round" />
      {ticks.map((t) => {
        const a = polar(t, 70);
        const b = polar(t, 76);
        const l = polar(t, 92);
        return (
          <g key={t}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#9CA2AB" strokeWidth="1" />
            {t % 3 === 0 ? (
              <text x={l.x} y={l.y + 3} textAnchor="middle" fontSize="9" fill="#9CA2AB" fontFamily="var(--font-inter)">
                {t > 0 ? `+${t}` : t}
              </text>
            ) : null}
          </g>
        );
      })}
      <line x1="100" y1="100" x2={tip.x} y2={tip.y} stroke="#F9F9FB" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="100" r="5" fill="#0F2033" stroke="#B946FB" strokeWidth="2" />
    </svg>
  );
}

function Sparkline({ className }: { className?: string }) {
  const pts = Array.from({ length: 31 }, (_, i) => {
    const y = 62 - i * 1.55 + 6 * Math.sin(i * 0.9) + 3 * Math.sin(i * 2.3);
    return [i * 8, Number(y.toFixed(1))] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
  const area = `${line}L240 80L0 80Z`;
  return (
    <svg viewBox="0 0 240 80" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="spark-line" x1="0" x2="1">
          <stop offset="0" stopColor="#2FF0FE" />
          <stop offset="1" stopColor="#8A1EF1" />
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8A1EF1" stopOpacity="0.28" />
          <stop offset="1" stopColor="#8A1EF1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <path d={line} fill="none" stroke="url(#spark-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

function Panel({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col p-6 sm:p-7", className)}>
      <p className="mono-label text-eyebrow">{label}</p>
      {children}
    </div>
  );
}

export function SignalConsole() {
  const c = home.console;
  const z = c.valuation.value;
  return (
    <Section glow="center" aria-labelledby="console-title">
      <SectionHeader
        id="console-title"
        eyebrow={c.eyebrow}
        title={c.title}
        subhead={c.subhead}
        chip={{ tag: "Example", variant: "split" }}
        chipIcon="pulse"
      />

      <figure data-reveal className="mx-auto max-w-5xl" aria-label="Example signal console. All values are made up.">
        <div
          className="frame [--cut:22px]"
        >
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-panel-line px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-panel-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-panel-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-panel-line" />
              </span>
              <span className="mono-label text-heading">Signal console</span>
              <span className="mono-label hidden text-muted sm:inline">· {c.asset}</span>
            </div>
            <span className="mono-label inline-flex items-center gap-2 text-accent-light">
              <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-accent-light" />
              {c.badge}
            </span>
          </div>

          {/* Three inputs */}
          <div className="grid divide-y divide-panel-line md:grid-cols-3 md:divide-x md:divide-y-0">
            <Panel label={c.trend.label}>
              <p className="mt-4 inline-flex w-fit items-center gap-2 border border-accent-light/60 bg-bg/40 px-3 py-1.5 text-sm font-semibold text-heading">
                <Icon name="trend" size={16} className="text-accent-light" />
                {c.trend.value}
              </p>
              <Sparkline className="mt-5 h-20 w-full" />
              <p className="mt-4 text-sm text-muted">{c.trend.detail}</p>
            </Panel>

            <Panel label={c.valuation.label}>
              <div className="mx-auto mt-3 w-full max-w-[220px]">
                <ZScoreGauge value={z} className="w-full" />
                <p className="mt-1 text-center font-display text-4xl text-heading tabular-nums">
                  {z > 0 ? "+" : ""}
                  {z.toFixed(2)}
                </p>
              </div>
              <p className="mt-2 text-center text-sm text-muted">{c.valuation.detail}</p>
            </Panel>

            <Panel label={c.gate.label}>
              <div className="mt-4 grid grid-cols-2 gap-2" role="presentation">
                {["Open", "Closed"].map((state) => {
                  const active = state === c.gate.value;
                  return (
                    <span
                      key={state}
                      className={cn(
                        "flex min-h-11 items-center justify-center border text-sm font-semibold",
                        active ? "border-accent-light/70 bg-accent-light/10 text-heading" : "border-panel-line text-muted",
                      )}
                    >
                      {state}
                    </span>
                  );
                })}
              </div>
              <div className="mt-5" aria-hidden="true">
                <div className="mono-label flex justify-between !text-[0.68rem] text-muted">
                  <span>Leverage allowed</span>
                  <span>0×</span>
                </div>
                <div className="mt-2 h-1.5 bg-bg/60">
                  <div className="h-full w-[6%]" style={{ background: "var(--gradient-signature)" }} />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">{c.gate.detail}</p>
            </Panel>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-3 border-t border-panel-line bg-bg/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-sm">
              <span className="mono-label mr-3 text-eyebrow">{c.composite.label}</span>
              <span className="font-semibold text-heading">{c.composite.value}</span>
            </p>
            <p className="mono-label inline-flex items-center gap-2 !tracking-[0.12em] text-muted">
              <Icon name="clock" size={16} className="text-accent-light" />
              {c.updated}
            </p>
          </div>
        </div>
        <figcaption className="mt-4 text-center text-sm text-muted">
          <span className="mono-label mr-2 font-semibold text-accent-light">Example data.</span>
          <span>{c.caption}</span>
        </figcaption>
      </figure>
    </Section>
  );
}
