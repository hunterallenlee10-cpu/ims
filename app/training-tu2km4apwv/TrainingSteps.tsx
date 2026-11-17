"use client";

import { useCallback, useSyncExternalStore } from "react";
import { training, trainingFiles } from "@/content/training";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const KEY = "ims-training-done";
const listeners = new Set<() => void>();

// Progress is a per-browser convenience only. If storage is blocked the page still works;
// ticks just last for the visit.
let memory = "";
function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}
function write(value: string) {
  memory = value;
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 border-2 px-6 text-[0.95rem] font-semibold tracking-[0.01em] transition-colors duration-200";

export function TrainingSteps() {
  const c = training;
  const b = c.briefing;
  const raw = useSyncExternalStore(subscribe, read, () => "");
  const done = new Set(raw.split(",").filter(Boolean));
  const count = c.modules.filter((m) => done.has(m.id)).length;
  const total = c.modules.length;

  const toggle = useCallback((id: string) => {
    const next = new Set(read().split(",").filter(Boolean));
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write([...next].join(","));
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="frame p-5 [--cut:14px] sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="mono-label text-accent-light">{c.progress.label}</p>
          <p className="text-sm text-body" aria-live="polite">
            <span className="font-semibold text-heading">
              {count} of {total}
            </span>{" "}
            {c.progress.of}
          </p>
        </div>
        <div
          role="progressbar"
          aria-label={c.progress.label}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={count}
          className="mt-4 h-2 w-full bg-bg"
        >
          <div className="h-full bg-accent-light transition-[width] duration-500" style={{ width: `${(count / total) * 100}%` }} />
        </div>
      </div>

      <ol className="mt-10">
        {c.modules.map((m, i) => {
          const isDone = done.has(m.id);
          const href = `${trainingFiles}/${m.file}`;
          return (
            <li key={m.id} className="relative flex gap-4 pb-10 sm:gap-6">
              <span aria-hidden="true" className="absolute bottom-0 left-6 top-12 w-px -translate-x-1/2 bg-panel-line" />
              <span
                aria-hidden="true"
                className={cn(
                  "relative flex h-12 w-12 shrink-0 items-center justify-center border-2 font-mono text-sm font-semibold text-heading shadow-[inset_0_0_0_2px_var(--bg)]",
                  isDone ? "border-accent-lighter bg-accent-hover" : "border-accent-light bg-accent",
                )}
              >
                {isDone ? <Icon name="check" size={20} /> : String(i + 1).padStart(2, "0")}
              </span>

              <article className={cn("frame min-w-0 flex-1 p-5 [--cut:18px] sm:p-7", isDone && "frame-accent")}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="mono-label text-accent-light">
                    {c.step} {i + 1} of {total}
                  </p>
                  {m.warning ? (
                    <span className="mono-label border border-accent-light/70 px-2 py-1 text-accent-lighter">{m.warning}</span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-h3">{m.title}</h3>
                <p className="mt-3 text-body">{m.description}</p>

                <p className="mono-label mt-6 text-muted">{c.coversLabel}</p>
                <ul className="mt-3 grid gap-2 text-[0.95rem] text-body sm:grid-cols-2 sm:gap-x-6">
                  {m.covers.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent-light" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className={cn(
                      btn,
                      "border-accent-light bg-accent text-heading shadow-[inset_0_0_0_2px_var(--bg)] hover:border-accent-lighter hover:bg-accent-hover",
                    )}
                  >
                    {c.open}
                    <span className="sr-only">
                      : {m.title} (PDF, opens in a new tab)
                    </span>
                    <Icon name="arrowRight" size={18} />
                  </a>
                  <a
                    href={href}
                    download
                    className="inline-flex min-h-11 items-center justify-center px-2 text-sm text-accent-light underline underline-offset-4 hover:text-accent-lighter"
                  >
                    {c.download}
                    <span className="sr-only">: {m.title}</span>
                  </a>
                </div>

                <label className="mt-6 flex min-h-12 cursor-pointer items-center gap-3 border-t border-line pt-5 text-[0.95rem] text-body">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle(m.id)}
                    className="h-6 w-6 shrink-0 cursor-pointer accent-[var(--accent-light)]"
                  />
                  <span>
                    {isDone ? c.done : c.mark}
                    <span className="sr-only">: {m.title}</span>
                  </span>
                </label>
              </article>
            </li>
          );
        })}
      </ol>

      <section aria-labelledby="training-briefing-title" className="flex gap-4 sm:gap-6">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-accent-lighter bg-accent-hover text-heading shadow-[inset_0_0_0_2px_var(--bg)]"
        >
          <Icon name="spark" size={22} />
        </span>

        <div className="frame frame-accent min-w-0 flex-1 p-5 [--cut:18px] [--fill:var(--bg-lift-2)] sm:p-7">
          <p className="mono-label text-accent-light">{b.label}</p>
          <h3 id="training-briefing-title" className="mt-3 text-h3">
            {b.title}
          </h3>
          <p className="mt-4 text-lg font-semibold text-heading">{b.welcome}</p>
          <p className="mt-2 text-body">{b.intro}</p>

          <ol className="mt-6 border-t border-panel-line">
            {b.items.map((item, i) => (
              <li key={item.text} className="flex gap-4 border-b border-panel-line py-5">
                <span aria-hidden="true" className="w-6 shrink-0 pt-0.5 font-mono text-sm font-semibold text-accent-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-body">{item.text}</p>
                  {item.videos ? (
                    <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {item.videos.map((video) => (
                        <li key={video.href}>
                          <a
                            href={video.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              btn,
                              "w-full border-accent-light bg-transparent text-accent-light hover:border-accent-lighter hover:bg-accent-light/5 hover:text-accent-lighter sm:w-auto",
                            )}
                          >
                            <Icon name="youtube" size={20} />
                            {video.label}
                            <span className="sr-only"> on YouTube (opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.note ? <p className={cn("mono-label text-muted", item.videos ? "mt-4" : "mt-2")}>{item.note}</p> : null}
                  {item.link ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        btn,
                        "mt-4 w-full border-accent-light bg-transparent text-accent-light hover:border-accent-lighter hover:bg-accent-light/5 hover:text-accent-lighter sm:w-auto",
                      )}
                    >
                      {item.link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                      <Icon name="arrowRight" size={18} />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 border border-accent-light/70 bg-bg/40 p-5 sm:p-6">
            <p className="mono-label text-accent-lighter">{b.pools.label}</p>
            <h4 className="mt-3 text-2xl leading-[1.1]">{b.pools.title}</h4>
            <p className="mt-3 text-body">{b.pools.intro}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {b.pools.items.map((pool) => (
                <div key={pool.name} className="border border-panel-line bg-bg/50 p-4">
                  <dt className="mono-label text-accent-light">{pool.name}</dt>
                  <dd className="mt-2 text-[0.95rem] text-body">{pool.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-body">{b.pools.outro}</p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{b.referral}</p>
        </div>
      </section>

      {count === total ? (
        <div role="status" className="frame frame-accent mt-10 p-6 [--cut:18px] [--fill:var(--bg-lift-2)] sm:p-8">
          <p className="mono-label text-accent-light">{c.complete.title}</p>
          <p className="mt-3 text-lg text-heading">{c.complete.text}</p>
        </div>
      ) : null}
    </div>
  );
}
