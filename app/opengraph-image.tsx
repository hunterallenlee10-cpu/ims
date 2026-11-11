import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ribbonPath } from "@/lib/wave";

export const alt = "Investing Mastery Signals: rules-based crypto signals in private Telegram groups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Waves({ seed, top, left, opacity }: { seed: number; top: number; left: number; opacity: number }) {
  const lines = Array.from({ length: 11 }, (_, i) => ribbonPath(i, 11, seed, 900, 420));
  return (
    <svg width="1800" height="420" viewBox="0 0 1800 420" style={{ position: "absolute", top, left, opacity }}>
      <defs>
        <linearGradient id={`g${seed}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2FF0FE" />
          <stop offset="0.5" stopColor="#1697F4" />
          <stop offset="1" stopColor="#8A1EF1" />
        </linearGradient>
      </defs>
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={`url(#g${seed})`} strokeWidth={i === 5 ? 2 : 1.1} strokeOpacity={0.35 + 0.6 * Math.sin((Math.PI * (i + 1)) / 12)} />
      ))}
    </svg>
  );
}

export default async function OpengraphImage() {
  const [cinzel, inter, mark] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Cinzel.ttf")),
    readFile(path.join(process.cwd(), "assets/fonts/Inter.ttf")),
    readFile(path.join(process.cwd(), "public/brand/logo-mark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#060E16",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(138,30,241,0.30), rgba(6,14,22,0) 70%), radial-gradient(ellipse 60% 60% at 100% 0%, #12273B, rgba(6,14,22,0) 70%)",
          fontFamily: "Inter",
        }}
      >
        <Waves seed={0.6} top={-150} left={420} opacity={0.55} />
        <Waves seed={3.3} top={380} left={-760} opacity={0.4} />

        <img src={markSrc} width={199} height={120} alt="" style={{ marginBottom: 26 }} />
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 9, color: "#B7BFD3", textTransform: "uppercase", marginBottom: 30 }}>
          Rules-Based Crypto Research
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Cinzel",
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: 4,
            backgroundImage: "linear-gradient(180deg, #F9F9FB 0%, #C5CEDE 58%, #9CA2AB 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          INVESTING MASTERY
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 26, width: 860 }}>
          <div style={{ display: "flex", flex: 1, height: 2, backgroundImage: "linear-gradient(90deg, rgba(185,70,251,0), #B946FB)" }} />
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 22, color: "#B946FB", padding: "0 18px 0 40px" }}>SIGNALS</div>
          <div style={{ display: "flex", flex: 1, height: 2, backgroundImage: "linear-gradient(90deg, #B946FB, rgba(185,70,251,0))" }} />
        </div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 26, color: "#C5CEDE" }}>
          Rules-based crypto signals, reasoning written out. Private Telegram groups.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cinzel", data: cinzel, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
