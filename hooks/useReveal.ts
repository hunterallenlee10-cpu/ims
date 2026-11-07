"use client";

import { useEffect } from "react";

/**
 * Watches every [data-reveal] element under `root` and adds `.is-in` when it
 * scrolls into view. Re-runs when `key` changes (e.g. the route).
 * Elements can set style="--reveal-delay: 120ms" to stagger.
 */
export function useReveal(key: unknown, root: () => ParentNode = () => document) {
  useEffect(() => {
    const elements = Array.from(root().querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
