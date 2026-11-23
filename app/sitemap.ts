import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/signals", priority: 0.9 },
  { path: "/how-it-works", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.5 },
  { path: "/disclaimer", priority: 0.3 },
  { path: "/risk-disclosure", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r.path === "/" ? "" : r.path}`, priority: r.priority }));
}
