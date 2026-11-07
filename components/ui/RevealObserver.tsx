"use client";

import { usePathname } from "next/navigation";
import { useReveal } from "@/hooks/useReveal";

/** Mounted once in the root layout; animates [data-reveal] elements on every route. */
export function RevealObserver() {
  const pathname = usePathname();
  useReveal(pathname);
  return null;
}
