import { cn } from "@/lib/cn";

// Thin flowing "data-wave" line art. Pure SVG + one CSS animation (wave-drift),
// switched off by prefers-reduced-motion in globals.css.

const W = 1200; // visible width of one loop (viewBox units)
const H = 600;

function ribbonPath(i: number, count: number, seed: number) {
  const t = i / (count - 1); // 0..1 across the ribbon
  const mid = H * (0.5 + 0.08 * Math.sin(seed));
  const amp1 = 110 + 40 * Math.sin(seed * 1.7); // main swell
  const amp2 = 28 + 22 * t; // fine ripple that widens across the ribbon
  const phase = seed + t * 1.1; // twist between neighbouring lines
  const k1 = (2 * Math.PI) / W; // one swell per loop
  const k2 = (2 * Math.PI * 3) / W; // three ripples per loop
  const spread = (t - 0.5) * 70;

  let d = "";
  for (let x = 0; x <= W * 2; x += 15) {
    const y = mid + spread + amp1 * Math.sin(k1 * x + phase) + amp2 * Math.sin(k2 * x + phase * 2.3);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
}

export function DataWave({
  className,
  lines = 9,
  seed = 0.6,
  duration = 52,
  reverse,
  opacity = 0.5,
}: {
  className?: string;
  lines?: number;
  seed?: number;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
}) {
  const id = `wave-grad-${String(seed).replace(".", "")}`;
  const paths = Array.from({ length: lines }, (_, i) => ribbonPath(i, lines, seed));

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute", className)}
      style={{ opacity }}
    >
      <defs>
        {/* Symmetric gradient with a period of exactly one loop, so the drift is seamless. */}
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor="#2FF0FE" />
          <stop offset="0.28" stopColor="#1697F4" />
          <stop offset="0.5" stopColor="#8A1EF1" />
          <stop offset="0.72" stopColor="#1697F4" />
          <stop offset="1" stopColor="#2FF0FE" />
        </linearGradient>
      </defs>
      <g
        className="wave-track"
        style={{
          transformBox: "fill-box",
          ["--wave-dur" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={i === Math.floor(lines / 2) ? 1.4 : 0.8}
            strokeOpacity={0.35 + 0.65 * Math.sin((Math.PI * (i + 1)) / (lines + 1))}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
