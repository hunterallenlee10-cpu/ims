import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Item = { icon: IconName; name: string; text: string; tiers?: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Every signal shown at once, one row per signal. Each row pairs the words
 * (number and name) with a box (icon, description, tiers); the sides swap
 * on every other row. On small screens the words sit above the box.
 */
export function SignalRows({ items }: { items: Item[] }) {
  return (
    <ol className="space-y-12 lg:space-y-20">
      {items.map((item, i) => {
        const flip = i % 2 === 1;
        return (
          <li key={item.name} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14" data-reveal>
            <div className={cn(flip && "lg:order-2 lg:text-right")}>
              <p className="mono-label text-accent-light">
                {pad(i + 1)} / {pad(items.length)}
              </p>
              <h3 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.95]">{item.name}</h3>
              <span
                aria-hidden="true"
                className={cn("mt-6 block h-0.5 w-24 bg-accent-light", flip && "lg:ml-auto")}
              />
            </div>

            <div
              className={cn("frame flex flex-col p-7 [--cut:22px] sm:p-9", flip && "lg:order-1")}
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <span className="inline-flex h-14 w-14 items-center justify-center border border-panel-line bg-bg/40 text-accent-light">
                <Icon name={item.icon} size={26} />
              </span>
              <p className="mt-6 flex-1 text-lg text-body">{item.text}</p>
              <p className="mono-label mt-8 border-t border-panel-line pt-5 text-muted">
                {item.tiers ? `Included in ${item.tiers}` : "Included with membership"}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
