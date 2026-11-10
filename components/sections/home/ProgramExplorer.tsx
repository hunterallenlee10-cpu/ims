"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Item = { icon: IconName; name: string; text: string; tiers?: string };

/**
 * Numbered list on the left, detail panel on the right. Built as an accessible
 * vertical tab list (arrow keys move between items).
 */
export function ProgramExplorer({ items, hint }: { items: Item[]; hint: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const base = useId();
  const item = items[active];
  const pad = (n: number) => String(n).padStart(2, "0");

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % items.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + items.length) % items.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? items.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div data-reveal>
        <p className="mono-label mb-4 flex items-center gap-2 text-eyebrow">
          <Icon name="spark" size={14} className="text-accent-light" />
          {hint}
        </p>
        <div role="tablist" aria-orientation="vertical" aria-label="The signals" className="border-t border-panel-line">
          {items.map((it, i) => {
            const selected = i === active;
            return (
              <button
                key={it.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${base}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "relative flex min-h-16 w-full items-center gap-5 border-b border-panel-line py-4 text-left transition-colors",
                  selected ? "text-heading" : "text-muted hover:text-body",
                )}
              >
                <span className={cn("font-mono text-xs", selected ? "text-accent-light" : "text-muted")}>{pad(i + 1)}</span>
                <span className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] uppercase leading-none">{it.name}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-px left-0 h-0.5 bg-accent-light transition-all duration-500",
                    selected ? "w-24" : "w-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${active}`}
        data-reveal
        style={{ ["--reveal-delay" as string]: "120ms" }}
        className="frame flex min-h-[22rem] flex-col p-7 [--cut:22px] sm:p-10"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center border border-panel-line bg-bg/40 text-accent-light">
          <Icon name={item.icon} size={26} />
        </span>
        <h3 key={item.name} className="mt-8 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.95]">
          {item.name}
        </h3>
        <p className="mt-5 flex-1 text-lg text-body">{item.text}</p>
        <div className="mono-label mt-8 flex justify-between border-t border-panel-line pt-5 text-muted">
          <span>{item.tiers ? `Included in ${item.tiers}` : "Included with membership"}</span>
          <span>
            {pad(active + 1)} / {pad(items.length)}
          </span>
        </div>
      </div>
    </div>
  );
}
