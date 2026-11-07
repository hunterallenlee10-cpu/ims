import { cn } from "@/lib/cn";
import { ribbonPath, WAVE_H, WAVE_W } from "@/lib/wave";

// Thin flowing "data-wave" line art. Pure SVG + one CSS animation (wave-drift),
// switched off by prefers-reduced-motion in globals.css.

const W = WAVE_W;
const H = WAVE_H;

export function DataWave({
  className,
  lines = 9,
  seed = 0.6,
  duration = 52,
  reverse,
  opacity = 0.5,
  fade = true,
}: {
  className?: string;
  lines?: number;
  seed?: number;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
  /** Soft radial fade so the lines dissolve at the edges. */
  fade?: boolean;
}) {
  const mask = fade ? "radial-gradient(ellipse 50% 50% at 50% 50%, #000 35%, transparent 100%)" : undefined;
  const id = `wave-grad-${String(seed).replace(".", "")}`;
  const paths = Array.from({ length: lines }, (_, i) => ribbonPath(i, lines, seed));

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute", className)}
      style={{ opacity, maskImage: mask, WebkitMaskImage: mask }}
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
