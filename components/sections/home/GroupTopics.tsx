import { home } from "@/content/home";

/**
 * Compact "what's in the group" list: the main group's seven topics in their Telegram order,
 * then the separate Core group. Sits beside the example posts on wide screens, above them on phones.
 */
export function GroupTopics({ className }: { className?: string }) {
  const t = home.sample.topics;
  return (
    <div className={className}>
      <h3 className="mono-label text-sm text-heading sm:text-base">{t.title}</h3>

      <div className="mt-5 border border-panel-line bg-panel/60 p-5">
        <p className="mono-label text-accent-light">{t.main.tiers}</p>
        <p className="mt-2 font-semibold text-heading">{t.main.name}</p>
        <ol className="mt-4 space-y-3">
          {t.items.map((item, i) => (
            <li key={item.name} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2 text-sm">
              <span aria-hidden="true">{item.emoji}</span>
              <span>
                <span className="font-semibold text-heading">
                  <span className="sr-only">{i + 1}. </span>
                  {item.name}
                </span>
                <span className="block text-body">{item.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 border-t border-panel-line pt-3 text-xs text-muted">{t.postedBy}</p>
      </div>

      <div className="mt-4 border border-panel-line p-5">
        <p className="mono-label text-accent-light">{t.core.tiers}</p>
        <p className="mt-2 font-semibold text-heading">{t.core.name}</p>
        <p className="mt-2 text-sm text-body">{t.core.text}</p>
      </div>
    </div>
  );
}
