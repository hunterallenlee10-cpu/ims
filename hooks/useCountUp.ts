"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Server render and reduced-motion visitors see the final number.
 */
export function useCountUp<T extends Element>(target: number, duration = 1600) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Only animate numbers that start below the fold, so nothing visibly resets.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    // Zero the number before the user scrolls to it (it is still off-screen here).
    frame = requestAnimationFrame(() => setValue(0));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}
