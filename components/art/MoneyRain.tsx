"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Holographic "money rain": BTC coins, dollar bills, coins, gold bars, candlestick
 * charts and glints drawn as glowing wireframes in the brand gradient
 * (cyan #2FF0FE → blue #1697F4 → purple #B946FB), with scanlines, additive blending,
 * a slight RGB split on near items, and a colour shift as each piece turns.
 *
 * One <canvas>, sprites pre-rendered once per tint, three depth layers for parallax.
 * Decorative: aria-hidden, pointer-events off. Reduced-motion visitors get one still frame.
 * Pauses when off-screen or when the tab is hidden.
 */

type Kind = "btc" | "bill" | "coin" | "bar" | "chart" | "glint";

type Item = {
  kind: Kind;
  x: number;
  y: number;
  z: number; // depth 0.35 (far) .. 1 (near)
  size: number;
  vy: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rot: number;
  vrot: number;
  flip: number; // 3D flip angle
  vflip: number;
  soft: boolean;
  flicker: number; // seconds until the next hologram flicker
  flickerT: number; // remaining flicker time
};

// Relative mix of things that fall. BTC leads, bills and extras fill in.
const MIX: Array<[Kind, number]> = [
  ["btc", 0.36],
  ["bill", 0.26],
  ["coin", 0.12],
  ["chart", 0.1],
  ["bar", 0.06],
  ["glint", 0.1],
];

// Brand hologram tints, in order. Items cycle through these as they turn.
const TINTS = ["47,240,254", "22,151,244", "185,70,251"] as const; // cyan, blue, purple

const SPRITE = 160; // sprite canvas size in px (square box, art centred)
const LW = SPRITE * 0.014; // base line width

function pickKind(r: number): Kind {
  let acc = 0;
  for (const [kind, w] of MIX) {
    acc += w;
    if (r <= acc) return kind;
  }
  return "btc";
}

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/* ---------- Sprite painters: wireframe geometry in one tint ---------- */

type Paint = (ctx: CanvasRenderingContext2D, rgb: string) => void;

const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;

function text(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, weight = 800, mono = false) {
  ctx.font = `${weight} ${size}px ${mono ? "ui-monospace, Menlo, monospace" : "Arial, Helvetica, sans-serif"}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
}

const paintBtc: Paint = (ctx, rgb) => {
  const c = SPRITE / 2;
  const r = SPRITE * 0.42;
  // Glass disc
  const fill = ctx.createRadialGradient(c - r * 0.3, c - r * 0.35, r * 0.05, c, c, r);
  fill.addColorStop(0, rgba(rgb, 0.28));
  fill.addColorStop(1, rgba(rgb, 0.06));
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fill();
  // Rings
  ctx.strokeStyle = rgba(rgb, 0.95);
  ctx.lineWidth = LW * 1.4;
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = LW * 0.7;
  ctx.strokeStyle = rgba(rgb, 0.6);
  ctx.beginPath();
  ctx.arc(c, c, r * 0.8, 0, Math.PI * 2);
  ctx.stroke();
  // Rim ticks
  ctx.lineWidth = LW * 0.6;
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r * 0.86, c + Math.sin(a) * r * 0.86);
    ctx.lineTo(c + Math.cos(a) * r * 0.95, c + Math.sin(a) * r * 0.95);
    ctx.stroke();
  }
  // ₿ glyph: bold B with two short bars top and bottom, tilted like the logo
  ctx.save();
  ctx.translate(c, c);
  ctx.rotate((14 * Math.PI) / 180);
  ctx.fillStyle = rgba(rgb, 1);
  text(ctx, "B", 0, SPRITE * 0.02, SPRITE * 0.5, 900);
  const barW = SPRITE * 0.03;
  const barH = SPRITE * 0.09;
  for (const dx of [-SPRITE * 0.04, SPRITE * 0.04]) {
    ctx.fillRect(dx - barW / 2, -SPRITE * 0.245, barW, barH);
    ctx.fillRect(dx - barW / 2, SPRITE * 0.165, barW, barH);
  }
  ctx.restore();
};

const paintCoin: Paint = (ctx, rgb) => {
  const c = SPRITE / 2;
  const r = SPRITE * 0.34;
  ctx.fillStyle = rgba(rgb, 0.12);
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = rgba(rgb, 0.95);
  ctx.lineWidth = LW * 1.3;
  ctx.stroke();
  // Reeded edge
  ctx.lineWidth = LW * 0.5;
  ctx.strokeStyle = rgba(rgb, 0.7);
  for (let i = 0; i < 56; i++) {
    const a = (i / 56) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r * 0.84, c + Math.sin(a) * r * 0.84);
    ctx.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r);
    ctx.stroke();
  }
  ctx.fillStyle = rgba(rgb, 1);
  text(ctx, "$", c, c + SPRITE * 0.015, SPRITE * 0.38);
};

const paintBill: Paint = (ctx, rgb) => {
  const w = SPRITE * 0.92;
  const h = w * 0.43;
  const x = (SPRITE - w) / 2;
  const y = (SPRITE - h) / 2;
  // Glass sheet
  const fill = ctx.createLinearGradient(x, y, x + w, y + h);
  fill.addColorStop(0, rgba(rgb, 0.22));
  fill.addColorStop(0.5, rgba(rgb, 0.06));
  fill.addColorStop(1, rgba(rgb, 0.18));
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = rgba(rgb, 0.95);
  ctx.lineWidth = LW * 1.2;
  ctx.strokeRect(x, y, w, h);
  ctx.lineWidth = LW * 0.6;
  ctx.strokeStyle = rgba(rgb, 0.6);
  ctx.strokeRect(x + w * 0.04, y + h * 0.1, w * 0.92, h * 0.8);
  // Guilloche lines
  ctx.strokeStyle = rgba(rgb, 0.28);
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    for (let t = 0; t <= 1.0001; t += 0.02) {
      const px = x + w * 0.07 + t * w * 0.86;
      const py = y + h * (0.26 + i * 0.08) + Math.sin(t * 18 + i) * h * 0.025;
      if (t === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  // Portrait oval
  ctx.fillStyle = rgba(rgb, 0.16);
  ctx.strokeStyle = rgba(rgb, 0.9);
  ctx.lineWidth = LW * 0.8;
  ctx.beginPath();
  ctx.ellipse(SPRITE / 2, SPRITE / 2, w * 0.13, h * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = rgba(rgb, 1);
  text(ctx, "$", SPRITE / 2, SPRITE / 2 + h * 0.02, h * 0.42);
  text(ctx, "100", x + w * 0.15, y + h * 0.27, h * 0.19, 700, true);
  text(ctx, "100", x + w * 0.85, y + h * 0.73, h * 0.19, 700, true);
  // Seals
  ctx.strokeStyle = rgba(rgb, 0.7);
  ctx.lineWidth = LW * 0.6;
  for (const [sx, sy] of [
    [0.27, 0.58],
    [0.73, 0.42],
  ]) {
    ctx.beginPath();
    ctx.arc(x + w * sx, y + h * sy, h * 0.11, 0, Math.PI * 2);
    ctx.stroke();
  }
};

const paintBar: Paint = (ctx, rgb) => {
  const w = SPRITE * 0.7;
  const h = SPRITE * 0.32;
  const x = (SPRITE - w) / 2;
  const y = (SPRITE - h) / 2;
  const inset = w * 0.12;
  const outer: Array<[number, number]> = [
    [x + inset, y],
    [x + w - inset, y],
    [x + w, y + h],
    [x, y + h],
  ];
  const top: Array<[number, number]> = [
    [x + inset * 1.4, y + h * 0.12],
    [x + w - inset * 1.4, y + h * 0.12],
    [x + w - inset * 0.6, y + h * 0.78],
    [x + inset * 0.6, y + h * 0.78],
  ];
  const poly = (pts: Array<[number, number]>) => {
    ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.closePath();
  };
  ctx.fillStyle = rgba(rgb, 0.14);
  poly(outer);
  ctx.fill();
  ctx.strokeStyle = rgba(rgb, 0.95);
  ctx.lineWidth = LW * 1.2;
  ctx.stroke();
  ctx.fillStyle = rgba(rgb, 0.12);
  poly(top);
  ctx.fill();
  ctx.lineWidth = LW * 0.7;
  ctx.strokeStyle = rgba(rgb, 0.7);
  ctx.stroke();
  // Wireframe edges joining the faces
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(outer[i][0], outer[i][1]);
    ctx.lineTo(top[i][0], top[i][1]);
    ctx.stroke();
  }
  ctx.fillStyle = rgba(rgb, 1);
  text(ctx, "999.9", SPRITE / 2, y + h * 0.46, h * 0.22, 700, true);
};

// Small candlestick chart tile: ties the rain to "signals".
const paintChart: Paint = (ctx, rgb) => {
  const w = SPRITE * 0.7;
  const h = SPRITE * 0.5;
  const x = (SPRITE - w) / 2;
  const y = (SPRITE - h) / 2;
  ctx.fillStyle = rgba(rgb, 0.08);
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = rgba(rgb, 0.8);
  ctx.lineWidth = LW;
  ctx.strokeRect(x, y, w, h);
  // Grid
  ctx.strokeStyle = rgba(rgb, 0.2);
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + (h * i) / 4);
    ctx.lineTo(x + w, y + (h * i) / 4);
    ctx.stroke();
  }
  // Rising candles
  const n = 6;
  const opens = [0.7, 0.62, 0.66, 0.5, 0.44, 0.3];
  const closes = [0.6, 0.68, 0.52, 0.42, 0.34, 0.2];
  for (let i = 0; i < n; i++) {
    const cx = x + w * (0.12 + (i * 0.76) / (n - 1));
    const o = y + h * opens[i];
    const cl = y + h * closes[i];
    const top = Math.min(o, cl);
    const bh = Math.max(3, Math.abs(o - cl));
    ctx.strokeStyle = rgba(rgb, 0.9);
    ctx.lineWidth = LW * 0.6;
    ctx.beginPath();
    ctx.moveTo(cx, top - h * 0.06);
    ctx.lineTo(cx, top + bh + h * 0.06);
    ctx.stroke();
    ctx.fillStyle = rgba(rgb, cl < o ? 0.85 : 0.3);
    ctx.fillRect(cx - w * 0.04, top, w * 0.08, bh);
  }
  // Trend line
  ctx.strokeStyle = rgba(rgb, 1);
  ctx.lineWidth = LW * 0.8;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.05, y + h * 0.78);
  ctx.bezierCurveTo(x + w * 0.4, y + h * 0.7, x + w * 0.55, y + h * 0.35, x + w * 0.95, y + h * 0.12);
  ctx.stroke();
};

const paintGlint: Paint = (ctx, rgb) => {
  const c = SPRITE / 2;
  const g = ctx.createRadialGradient(c, c, 0, c, c, SPRITE * 0.3);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.25, rgba(rgb, 0.45));
  g.addColorStop(1, rgba(rgb, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(c, c, SPRITE * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath();
  const L = SPRITE * 0.26;
  const s = SPRITE * 0.035;
  ctx.moveTo(c, c - L);
  ctx.quadraticCurveTo(c + s, c - s, c + L, c);
  ctx.quadraticCurveTo(c + s, c + s, c, c + L);
  ctx.quadraticCurveTo(c - s, c + s, c - L, c);
  ctx.quadraticCurveTo(c - s, c - s, c, c - L);
  ctx.fill();
};

const PAINTERS: Record<Kind, Paint> = {
  btc: paintBtc,
  bill: paintBill,
  coin: paintCoin,
  bar: paintBar,
  chart: paintChart,
  glint: paintGlint,
};

type SpriteSet = { sharp: HTMLCanvasElement[]; soft: HTMLCanvasElement[] };
type Sprites = Record<Kind, SpriteSet>;

/** Paints one sprite in one tint: glow pass, crisp pass, then scanlines cut out. */
function renderSprite(kind: Kind, rgb: string): HTMLCanvasElement {
  const cv = makeCanvas(SPRITE, SPRITE);
  const ctx = cv.getContext("2d");
  if (!ctx) return cv;
  // Glow pass
  ctx.save();
  ctx.shadowColor = rgba(rgb, 0.9);
  ctx.shadowBlur = SPRITE * 0.06;
  PAINTERS[kind](ctx, rgb);
  ctx.restore();
  // Crisp pass on top
  PAINTERS[kind](ctx, rgb);
  // Hologram scanlines
  if (kind !== "glint") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    for (let y = 0; y < SPRITE; y += 4) ctx.fillRect(0, y, SPRITE, 1.5);
    ctx.globalCompositeOperation = "source-over";
  }
  return cv;
}

function buildSprites(): Sprites {
  const out = {} as Sprites;
  (Object.keys(PAINTERS) as Kind[]).forEach((kind) => {
    const sharp = TINTS.map((rgb) => renderSprite(kind, rgb));
    // Far-layer variant: blurred once here so the frame loop never uses ctx.filter.
    const soft = sharp.map((src) => {
      const cv = makeCanvas(SPRITE, SPRITE);
      const ctx = cv.getContext("2d");
      if (ctx) {
        ctx.filter = "blur(2.5px)";
        ctx.drawImage(src, 0, 0);
      }
      return cv;
    });
    out[kind] = { sharp, soft };
  });
  return out;
}

function spawn(w: number, h: number, anywhere: boolean): Item {
  const kind = pickKind(Math.random());
  const z = 0.35 + Math.random() * 0.65;
  const base = kind === "bill" ? 120 : kind === "bar" || kind === "chart" ? 86 : kind === "glint" ? 34 : 72;
  // Smaller sprites on narrow screens so a phone isn't filled by one bill.
  const screen = Math.min(1, Math.max(0.55, w / 1200));
  const size = base * (0.45 + z * 0.75) * screen;
  const floaty = kind === "bill" || kind === "chart";
  return {
    kind,
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -size - Math.random() * h * 0.3,
    z,
    size,
    // Slow fall; nearer items fall a bit faster (parallax). Bills and charts float.
    vy: (floaty ? 16 : 24) * (0.55 + z * 0.9),
    swayAmp: floaty ? 22 + Math.random() * 30 : 6 + Math.random() * 12,
    swayFreq: floaty ? 0.35 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * (floaty ? 0.25 : 0.6),
    flip: Math.random() * Math.PI * 2,
    vflip: kind === "glint" ? 0 : (0.6 + Math.random() * 1.2) * (Math.random() < 0.5 ? -1 : 1),
    soft: z < 0.55,
    flicker: 2 + Math.random() * 10,
    flickerT: 0,
  };
}

export function MoneyRain({
  className,
  density = 1,
  opacity = 0.7,
}: {
  className?: string;
  /** 1 = default count; scales the number of falling items. */
  density?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = buildSprites();
    const items: Item[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let last = 0;
    let t = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(70, Math.max(14, (w * h) / 26000)) * density);
      while (items.length < target) items.push(spawn(w, h, true));
      items.length = target;
    };

    const blit = (img: HTMLCanvasElement, size: number, alpha: number, dx = 0) => {
      if (alpha <= 0.002) return;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, -size / 2 + dx, -size / 2, size, size);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Additive light, like a projection.
      ctx.globalCompositeOperation = "lighter";
      for (const it of items) {
        const set = it.soft ? sprites[it.kind].soft : sprites[it.kind].sharp;
        const sway = Math.sin(t * it.swayFreq + it.phase) * it.swayAmp;
        const flipScale = Math.cos(it.flip);
        const floaty = it.kind === "bill" || it.kind === "chart";
        // Bills rock like a falling leaf; coins spin flat and flip edge-on.
        const angle = floaty ? it.rot + Math.sin(t * it.swayFreq * 1.3 + it.phase) * 0.5 : it.rot;
        const sx = floaty ? 1 : Math.max(0.06, Math.abs(flipScale));
        const sy = floaty ? Math.max(0.25, Math.abs(Math.cos(it.flip * 0.6))) : 1;

        let alpha = 0.3 + it.z * 0.6;
        if (it.kind === "glint") alpha *= 0.5 + 0.5 * Math.sin(t * 2.4 + it.phase);
        if (flipScale < 0 && !floaty) alpha *= 0.75; // back face is dimmer
        if (it.flickerT > 0) alpha *= 0.35 + 0.65 * Math.abs(Math.sin(it.flickerT * 70));

        // Iridescence: hue position 0..2 across cyan → blue → purple, driven by the turn.
        const hue = (Math.sin(it.flip * 0.5 + t * 0.35 + it.phase) + 1); // 0..2
        const i0 = Math.min(1, Math.floor(hue));
        const m = hue - i0;

        ctx.save();
        ctx.translate(it.x + sway, it.y);
        ctx.rotate(angle);
        ctx.scale(sx, sy);
        blit(set[i0], it.size, alpha * (1 - m));
        blit(set[i0 + 1], it.size, alpha * m);
        // Chromatic split on the nearest pieces
        if (it.z > 0.78 && it.kind !== "glint") {
          blit(set[0], it.size, alpha * 0.22, -it.size * 0.025);
          blit(set[2], it.size, alpha * 0.22, it.size * 0.025);
        }
        ctx.restore();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      t += dt;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        it.y += it.vy * dt;
        it.rot += it.vrot * dt;
        it.flip += it.vflip * dt;
        it.flicker -= dt;
        if (it.flickerT > 0) it.flickerT -= dt;
        if (it.flicker <= 0) {
          it.flickerT = 0.12 + Math.random() * 0.15;
          it.flicker = 4 + Math.random() * 12;
        }
        if (it.y - it.size > h) items[i] = spawn(w, h, false);
      }
      draw();
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

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      if (!frame) draw();
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
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full", className)}
      style={{ opacity }}
    />
  );
}
