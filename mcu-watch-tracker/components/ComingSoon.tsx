import { CalendarClock } from "lucide-react";

import KindBadge from "@/components/KindBadge";
import { daysUntilRelease } from "@/data/movieCatalog";
import { formatCountdown, formatReleaseDate } from "@/lib/dates";
import type { MovieSummary } from "@/types/movie";

/** Announced titles that haven't been released yet, with a countdown. */
export default function ComingSoon({
  titles,
  today,
}: {
  titles: readonly MovieSummary[];
  today: string;
}) {
  if (titles.length === 0) return null;

  return (
    <section
      id="coming-soon"
      aria-labelledby="coming-soon-heading"
      className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
    >
      <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--milestone)]">
        Coming soon
      </p>
      <h2
        id="coming-soon-heading"
        className="font-display mt-2 text-2xl font-bold sm:text-3xl"
      >
        בקרוב
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        כותרים שהוכרזו ועוד לא יצאו. הם לא נספרים בהתקדמות, ויצטרפו לציר הזמן אוטומטית
        ביום היציאה.
      </p>

      <ul className="no-scrollbar -mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {titles.map((title) => {
          const days = daysUntilRelease(title, today);
          return (
            <li
              key={title.id}
              className="flex w-[85%] shrink-0 snap-start rounded-2xl border border-[var(--milestone)]/25 bg-gradient-to-bl from-[var(--milestone)]/[0.08] to-transparent p-4 sm:w-auto"
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="self-start">
                  <KindBadge movie={title} />
                </div>
                <h3
                  dir="ltr"
                  className="font-display mt-2 text-lg font-bold leading-snug"
                >
                  {title.title}
                </h3>
                {title.titleHe ? (
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{title.titleHe}</p>
                ) : null}
                <div className="mt-auto pt-4">
                  <p className="font-slate text-3xl font-semibold leading-none text-[var(--milestone)]">
                    {days}
                    <span className="ms-1.5 text-xs font-normal text-[var(--muted)]">
                      {days === 1 ? "יום" : "ימים"}
                    </span>
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatReleaseDate(title.releaseDate)} · {formatCountdown(days)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
