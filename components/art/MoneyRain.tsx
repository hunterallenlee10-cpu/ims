"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Slow falling field of BTC coins, dollar bills, gold coins, gold bars and glints.
 * One <canvas>, sprites pre-rendered once, three depth layers for parallax.
 * Decorative: aria-hidden, pointer-events off. Reduced-motion visitors get one still frame.
 * Pauses when off-screen or when the tab is hidden.
 */

type Kind = "btc" | "bill" | "coin" | "bar" | "glint";

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
};

// Relative mix of things that fall. Coins lead, bills and extras fill in.
const MIX: Array<[Kind, number]> = [
  ["btc", 0.4],
  ["bill", 0.3],
  ["coin", 0.14],
  ["bar", 0.06],
  ["glint", 0.1],
];

const SPRITE = 160; // sprite canvas size in px (square box, art centered)

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

/* ---------- Sprite painters (all drawn in a SPRITE x SPRITE box) ---------- */

function paintBtc(ctx: CanvasRenderingContext2D) {
  const c = SPRITE / 2;
  const r = SPRITE * 0.42;
  // Rim
  const rim = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
  rim.addColorStop(0, "#ffd27a");
  rim.addColorStop(0.5, "#f7931a");
  rim.addColorStop(1, "#a55a00");
  ctx.fillStyle = rim;
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fill();
  // Face
  const face = ctx.createRadialGradient(c - r * 0.35, c - r * 0.4, r * 0.1, c, c, r * 0.9);
  face.addColorStop(0, "#ffc35c");
  face.addColorStop(0.6, "#f7931a");
  face.addColorStop(1, "#c96f05");
  ctx.fillStyle = face;
  ctx.beginPath();
  ctx.arc(c, c, r * 0.84, 0, Math.PI * 2);
  ctx.fill();
  // Inner ring
  ctx.strokeStyle = "rgba(255,230,180,0.55)";
  ctx.lineWidth = SPRITE * 0.012;
  ctx.beginPath();
  ctx.arc(c, c, r * 0.76, 0, Math.PI * 2);
  ctx.stroke();
  // ₿ glyph: bold B with two short bars top and bottom, tilted like the logo
  ctx.save();
  ctx.translate(c, c);
  ctx.rotate((14 * Math.PI) / 180);
  ctx.fillStyle = "#fff8ec";
  ctx.font = `900 ${SPRITE * 0.56}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("B", 0, SPRITE * 0.02);
  const barW = SPRITE * 0.035;
  const barH = SPRITE * 0.1;
  for (const dx of [-SPRITE * 0.045, SPRITE * 0.045]) {
    ctx.fillRect(dx - barW / 2, -SPRITE * 0.27, barW, barH);
    ctx.fillRect(dx - barW / 2, SPRITE * 0.18, barW, barH);
  }
  ctx.restore();
  // Highlight
  const shine = ctx.createLinearGradient(c - r, c - r, c, c);
  shine.addColorStop(0, "rgba(255,255,255,0.45)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.beginPath();
  ctx.arc(c, c, r, Math.PI * 1.05, Math.PI * 1.7);
  ctx.arc(c, c, r * 0.84, Math.PI * 1.7, Math.PI * 1.05, true);
  ctx.fill();
}

function paintCoin(ctx: CanvasRenderingContext2D) {
  const c = SPRITE / 2;
  const r = SPRITE * 0.36;
  const rim = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
  rim.addColorStop(0, "#fff1b0");
  rim.addColorStop(0.5, "#e2b23c");
  rim.addColorStop(1, "#8c6510");
  ctx.fillStyle = rim;
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fill();
  // Reeded edge
  ctx.strokeStyle = "rgba(120,85,10,0.5)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r * 0.9, c + Math.sin(a) * r * 0.9);
    ctx.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r);
    ctx.stroke();
  }
  const face = ctx.createRadialGradient(c - r * 0.3, c - r * 0.35, r * 0.1, c, c, r * 0.85);
  face.addColorStop(0, "#fde58a");
  face.addColorStop(1, "#c8951f");
  ctx.fillStyle = face;
  ctx.beginPath();
  ctx.arc(c, c, r * 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(110,75,5,0.85)";
  ctx.font = `800 ${SPRITE * 0.42}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", c, c + SPRITE * 0.015);
}

function paintBill(ctx: CanvasRenderingContext2D) {
  const w = SPRITE * 0.92;
  const h = w * 0.43;
  const x = (SPRITE - w) / 2;
  const y = (SPRITE - h) / 2;
  // Paper
  const paper = ctx.createLinearGradient(x, y, x + w, y + h);
  paper.addColorStop(0, "#cfe3c4");
  paper.addColorStop(0.5, "#a9c99a");
  paper.addColorStop(1, "#8fb57f");
  ctx.fillStyle = paper;
  ctx.fillRect(x, y, w, h);
  // Border
  ctx.strokeStyle = "#3f6b3a";
  ctx.lineWidth = SPRITE * 0.018;
  ctx.strokeRect(x + w * 0.035, y + h * 0.08, w * 0.93, h * 0.84);
  ctx.lineWidth = SPRITE * 0.006;
  ctx.strokeRect(x + w * 0.06, y + h * 0.15, w * 0.88, h * 0.7);
  // Fine guilloche lines
  ctx.strokeStyle = "rgba(63,107,58,0.25)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    for (let t = 0; t <= 1; t += 0.02) {
      const px = x + w * 0.08 + t * w * 0.84;
      const py = y + h * (0.22 + i * 0.07) + Math.sin(t * 18 + i) * h * 0.02;
      if (t === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  // Center portrait oval
  ctx.fillStyle = "#e3eedc";
  ctx.strokeStyle = "#3f6b3a";
  ctx.lineWidth = SPRITE * 0.01;
  ctx.beginPath();
  ctx.ellipse(SPRITE / 2, SPRITE / 2, w * 0.13, h * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#4f7d48";
  ctx.font = `800 ${h * 0.42}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", SPRITE / 2, SPRITE / 2 + h * 0.02);
  // Corner denominations
  ctx.fillStyle = "#2f5a2b";
  ctx.font = `800 ${h * 0.2}px Arial, Helvetica, sans-serif`;
  ctx.fillText("100", x + w * 0.15, y + h * 0.27);
  ctx.fillText("100", x + w * 0.85, y + h * 0.73);
  // Seals
  ctx.fillStyle = "rgba(47,90,43,0.55)";
  ctx.beginPath();
  ctx.arc(x + w * 0.27, y + h * 0.58, h * 0.11, 0, Math.PI * 2);
  ctx.arc(x + w * 0.73, y + h * 0.42, h * 0.11, 0, Math.PI * 2);
  ctx.fill();
}

function paintBar(ctx: CanvasRenderingContext2D) {
  const w = SPRITE * 0.7;
  const h = SPRITE * 0.32;
  const x = (SPRITE - w) / 2;
  const y = (SPRITE - h) / 2;
  const inset = w * 0.12;
  // Side (trapezoid body)
  const body = ctx.createLinearGradient(x, y, x, y + h);
  body.addColorStop(0, "#f7d774");
  body.addColorStop(1, "#9a6f12");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(x + inset, y);
  ctx.lineTo(x + w - inset, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.fill();
  // Top face
  const top = ctx.createLinearGradient(x, y, x + w, y + h * 0.5);
  top.addColorStop(0, "#fff3bd");
  top.addColorStop(1, "#e0b13d");
  ctx.fillStyle = top;
  ctx.beginPath();
  ctx.moveTo(x + inset * 1.4, y + h * 0.12);
  ctx.lineTo(x + w - inset * 1.4, y + h * 0.12);
  ctx.lineTo(x + w - inset * 0.6, y + h * 0.78);
  ctx.lineTo(x + inset * 0.6, y + h * 0.78);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(120,85,10,0.7)";
  ctx.font = `700 ${h * 0.24}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("999.9", SPRITE / 2, y + h * 0.46);
}

function paintGlint(ctx: CanvasRenderingContext2D) {
  const c = SPRITE / 2;
  const g = ctx.createRadialGradient(c, c, 0, c, c, SPRITE * 0.3);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.25, "rgba(210,155,253,0.45)");
  g.addColorStop(1, "rgba(138,30,241,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(c, c, SPRITE * 0.3, 0, Math.PI * 2);
  ctx.fill();
  // Four-point star
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
}

const PAINTERS: Record<Kind, (ctx: CanvasRenderingContext2D) => void> = {
  btc: paintBtc,
  bill: paintBill,
  coin: paintCoin,
  bar: paintBar,
  glint: paintGlint,
};

type Sprites = Record<Kind, { sharp: HTMLCanvasElement; soft: HTMLCanvasElement }>;

function buildSprites(): Sprites {
  const out = {} as Sprites;
  (Object.keys(PAINTERS) as Kind[]).forEach((kind) => {
    const sharp = makeCanvas(SPRITE, SPRITE);
    const sctx = sharp.getContext("2d");
    if (sctx) PAINTERS[kind](sctx);
    // Far-layer variant: blurred once here so the frame loop never uses ctx.filter.
    const soft = makeCanvas(SPRITE, SPRITE);
    const fctx = soft.getContext("2d");
    if (fctx) {
      fctx.filter = "blur(3px)";
      fctx.drawImage(sharp, 0, 0);
    }
    out[kind] = { sharp, soft };
  });
  return out;
}

function spawn(w: number, h: number, anywhere: boolean): Item {
  const kind = pickKind(Math.random());
  const z = 0.35 + Math.random() * 0.65;
  const base = kind === "bill" ? 120 : kind === "bar" ? 80 : kind === "glint" ? 34 : 70;
  // Smaller sprites on narrow screens so a phone isn't filled by one bill.
  const screen = Math.min(1, Math.max(0.55, w / 1200));
  const size = base * (0.45 + z * 0.75) * screen;
  const isBill = kind === "bill";
  return {
    kind,
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -size - Math.random() * h * 0.3,
    z,
    size,
    // Slow fall, nearer items fall a bit faster (parallax). Bills float.
    vy: (isBill ? 16 : 24) * (0.55 + z * 0.9),
    swayAmp: isBill ? 22 + Math.random() * 30 : 6 + Math.random() * 12,
    swayFreq: isBill ? 0.35 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * (isBill ? 0.25 : 0.6),
    flip: Math.random() * Math.PI * 2,
    vflip: kind === "glint" ? 0 : (0.6 + Math.random() * 1.2) * (Math.random() < 0.5 ? -1 : 1),
    soft: z < 0.55,
  };
}

export function MoneyRain({
  className,
  density = 1,
  opacity = 0.55,
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Far to near so near items overlap far ones.
      const sorted = [...items].sort((a, b) => a.z - b.z);
      for (const it of sorted) {
        const sprite = it.soft ? sprites[it.kind].soft : sprites[it.kind].sharp;
        const sway = Math.sin(t * it.swayFreq + it.phase) * it.swayAmp;
        const flipScale = Math.cos(it.flip);
        const isBill = it.kind === "bill";
        // Bills rock like a falling leaf; coins spin flat and flip edge-on.
        const angle = isBill ? it.rot + Math.sin(t * it.swayFreq * 1.3 + it.phase) * 0.5 : it.rot;
        const sx = isBill ? 1 : Math.max(0.08, Math.abs(flipScale));
        const sy = isBill ? Math.max(0.25, Math.abs(Math.cos(it.flip * 0.6))) : 1;
        let alpha = 0.35 + it.z * 0.65;
        if (it.kind === "glint") alpha *= 0.5 + 0.5 * Math.sin(t * 2.4 + it.phase);
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.translate(it.x + sway, it.y);
        ctx.rotate(angle);
        ctx.scale(sx, sy);
        ctx.drawImage(sprite, -it.size / 2, -it.size / 2, it.size, it.size);
        // Darken the back face as a coin turns away
        if (!isBill && it.kind !== "glint" && flipScale < 0) {
          ctx.globalCompositeOperation = "source-atop";
          ctx.globalAlpha = Math.min(0.35, -flipScale * 0.35) * alpha;
          ctx.fillStyle = "#060e16";
          ctx.fillRect(-it.size / 2, -it.size / 2, it.size, it.size);
        }
        ctx.restore();
      }
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
