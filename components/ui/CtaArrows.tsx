import type { ReactNode } from "react";

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 96 56"
      className="hidden h-12 w-20 shrink-0 text-accent-light sm:block"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hand-drawn style looping arrow pointing at the button */}
      <path d="M6 6c4 18 16 30 34 30 9 0 12-8 6-11s-12 3-7 9c6 7 22 10 44 8" strokeDasharray="5 5" />
      <path d="M78 34l9 8-11 5" />
    </svg>
  );
}

/** Dashed arrows pointing in at the main call to action. Decorative. */
export function CtaArrows({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
      <Arrow />
      <div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{children}</div>
      <Arrow flip />
    </div>
  );
}
