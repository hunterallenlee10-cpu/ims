"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Holographic growth chart for the home hero.
 *
 * A perspective grid floor drifts toward the viewer while a glowing line in the brand
 * gradient (cyan #2FF0FE → blue #1697F4 → purple #B946FB) draws itself upward from
 * bottom-left to top-right. Its tip carries a pulsing node and a climbing "+%" readout,
 * and "SIGNAL" markers ping at dips as the line passes them. When the climb finishes it
 * holds, fades, and a new climb begins. Scanlines finish the hologram look.
 *
 * Decorative: aria-hidden, pointer-events off. Reduced-motion visitors get one still,
 * completed chart. Pauses when off-screen or when the tab is hidden.
 */

const C = "47,240,254"; // cyan
const B = "22,151,244"; // blue
const P = "185,70,251"; // purple (accent-light)
const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;

const POINTS = 90;
const DRAW_S = 12; // seconds to draw the line
const HOLD_S = 2.6; // seconds to hold the finished chart
const FADE_S = 1.4; // seconds to fade out
const CYCLE_S = DRAW_S + HOLD_S + FADE_S;

type Climb = {
  v: number[];
  lo: number;
  hi: number;
  gain: number; // final "+%" shown at the tip
  signals: number[]; // point indexes that get a SIGNAL marker
};

/** Small deterministic PRNG so each climb is varied but reproducible. */
function prng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function makeClimb(seed: number): Climb {
  const rnd = prng(seed * 7919 + 17);
  const v = [0];
  for (let i = 1; i < POINTS; i++) v.push(v[i - 1] + 1 + (rnd() - 0.5) * 6.5);
  const lo = Math.min(...v);
  const hi = Math.max(...v);
  // Mark the lowest point in each window as a "signal" (a dip before the next leg up).
  const signals: number[] = [];
  for (let start = 10; start < POINTS - 12; start += 20) {
    let best = start;
    for (let i = start; i < start + 16; i++) if (v[i] < v[best]) best = i;
    signals.push(best);
  }
  return { v, lo, hi, gain: 120 + rnd() * 140, signals };
}

export function HoloGrowthChart({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let frame = 0;
    let last = 0;
    let t = 0;
    let visible = true;
    let climbNo = 1;
    let climb = makeClimb(climbNo);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const mono = (s: string, x: number, y: number, rgb: string, a: number, size: number, align: CanvasTextAlign = "left") => {
      ctx.font = `500 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = align;
      ctx.textBaseline = "middle";
      ctx.fillStyle = rgba(rgb, a);
      ctx.fillText(s, x, y);
    };

    const draw = (time: number, k: number) => {
      ctx.clearRect(0, 0, w, h);
      const narrow = w < 640;
      // On phones the hero is tall and text-heavy, so the chart lives in the lower half.
      const horizon = h * (narrow ? 0.58 : 0.46);
      const top = h * (narrow ? 0.5 : 0.2);
      const bottom = h * 0.92;
      const vpX = w * 0.5;

      /* Grid floor, drifting toward the viewer */
      ctx.lineWidth = 1;
      const rows = 18;
      const drift = (time * 0.6) % 1;
      for (let i = 0; i < rows; i++) {
        const f = ((i + drift) / rows) ** 2;
        const y = horizon + (h - horizon) * f;
        ctx.strokeStyle = rgba(C, 0.04 + f * 0.17);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.strokeStyle = rgba(B, 0.11);
      const spread = Math.max(w, 900) * 0.09;
      for (let i = -14; i <= 14; i++) {
        ctx.beginPath();
        ctx.moveTo(vpX + i * 6, horizon);
        ctx.lineTo(vpX + i * spread, h);
        ctx.stroke();
      }
      // Horizon glow
      const hg = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 40);
      hg.addColorStop(0, rgba(P, 0));
      hg.addColorStop(0.5, rgba(P, 0.16));
      hg.addColorStop(1, rgba(P, 0));
      ctx.fillStyle = hg;
      ctx.fillRect(0, horizon - 40, w, 80);

      /* The climb */
      const { v, lo, hi, gain, signals } = climb;
      const n = v.length;
      const px = (i: number) => w * 0.03 + (i / (n - 1)) * w * 0.94;
      const py = (val: number) => bottom - ((val - lo) / (hi - lo || 1)) * (bottom - top);
      const prog = Math.min(1, Math.max(0, k / DRAW_S)) * (n - 1);
      const lastI = Math.floor(prog);
      const fr = prog - lastI;
      const hx = px(lastI + fr);
      const hy = lastI + 1 < n ? py(v[lastI] + (v[lastI + 1] - v[lastI]) * fr) : py(v[lastI]);
      const fade = k > DRAW_S + HOLD_S ? Math.max(0, 1 - (k - DRAW_S - HOLD_S) / FADE_S) : 1;
      if (!Number.isFinite(hx) || !Number.isFinite(hy) || fade <= 0) return;

      const tracePath = () => {
        ctx.beginPath();
        for (let i = 0; i <= lastI; i++) {
          if (i === 0) ctx.moveTo(px(i), py(v[i]));
          else ctx.lineTo(px(i), py(v[i]));
        }
        ctx.lineTo(hx, hy);
      };

      ctx.globalAlpha = fade;

      // Area under the line
      tracePath();
      ctx.lineTo(hx, h);
      ctx.lineTo(px(0), h);
      ctx.closePath();
      const area = ctx.createLinearGradient(0, top, 0, h);
      area.addColorStop(0, rgba(P, 0.26));
      area.addColorStop(1, rgba(B, 0));
      ctx.fillStyle = area;
      ctx.fill();

      // Line: wide soft pass for glow, then the crisp line (cheaper than shadowBlur every frame)
      const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
      lineGrad.addColorStop(0, rgba(C, 1));
      lineGrad.addColorStop(0.5, rgba(B, 1));
      lineGrad.addColorStop(1, rgba(P, 1));
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = lineGrad;
      for (const [lw, a] of [
        [14, 0.08],
        [7, 0.16],
        [2.5, 1],
      ]) {
        ctx.globalAlpha = fade * a;
        ctx.lineWidth = lw;
        tracePath();
        ctx.stroke();
      }
      ctx.globalAlpha = fade;

      // SIGNAL markers at dips the line has passed: ping for a few seconds, then settle.
      for (const si of signals) {
        if (si > lastI) continue;
        const sx = px(si);
        const sy = py(v[si]) + 20;
        const passedFor = (prog - si) / ((n - 1) / DRAW_S); // seconds since the tip passed it
        const ping = (passedFor * 0.9) % 1;
        const fresh = Math.max(0, 1 - passedFor / 4);
        ctx.fillStyle = rgba(C, 0.55 + 0.4 * fresh);
        ctx.beginPath();
        ctx.moveTo(sx, sy - 6);
        ctx.lineTo(sx + 6, sy + 5);
        ctx.lineTo(sx - 6, sy + 5);
        ctx.closePath();
        ctx.fill();
        if (fresh > 0) {
          ctx.strokeStyle = rgba(C, 0.8 * (1 - ping) * fresh);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(sx, sy, 6 + ping * 22, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (!narrow) mono("SIGNAL", sx, sy + 18, C, 0.4 + 0.4 * fresh, 9, "center");
      }

      // Tip: soft glow, dashed drop line, ping ring, bright node, climbing readout
      const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 90);
      glow.addColorStop(0, rgba(C, 0.22));
      glow.addColorStop(1, rgba(C, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(hx - 90, hy - 90, 180, 180);

      ctx.strokeStyle = rgba(C, 0.25);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(hx, hy + 8);
      ctx.lineTo(hx, h);
      ctx.stroke();
      ctx.setLineDash([]);

      const ping = (time * 1.2) % 1;
      ctx.strokeStyle = rgba(C, 1 - ping);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, hy, 6 + ping * 22, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = rgba(C, 0.35);
      ctx.beginPath();
      ctx.arc(hx, hy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      const tipVal = lastI + 1 < n ? v[lastI] + (v[lastI + 1] - v[lastI]) * fr : v[lastI];
      const pct = Math.max(0, ((tipVal - v[0]) / ((v[n - 1] - v[0]) || 1)) * gain);
      const labelRight = hx > w - 110;
      mono(`+${pct.toFixed(1)}%`, labelRight ? hx - 14 : hx + 14, hy - 18, C, 0.95, narrow ? 11 : 13, labelRight ? "right" : "left");

      ctx.globalAlpha = 1;

      // Hologram scanlines across everything drawn this frame
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
      ctx.globalCompositeOperation = "source-over";
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      t += dt;
      const k = t % CYCLE_S;
      const no = Math.floor(t / CYCLE_S) + 1;
      if (no !== climbNo) {
        climbNo = no;
        climb = makeClimb(climbNo);
      }
      draw(t, k);
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    // Reduced motion: one finished chart. Otherwise the first paint before the loop starts.
    const still = () => draw(0, reduced ? DRAW_S : 0);

    resize();
    still();

    const ro = new ResizeObserver(() => {
      resize();
      if (!frame) still();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    start();
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full", className)}
      style={{ opacity }}
    />
  );
}
