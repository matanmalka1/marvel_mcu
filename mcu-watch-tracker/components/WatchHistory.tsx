"use client";

import { CalendarCheck, Clock, History, Star, Tv } from "lucide-react";
import { useMemo, useState } from "react";

import PosterArt from "@/components/PosterArt";
import StarRating from "@/components/StarRating";
import { getMovieSummaryById, toIsoDate } from "@/data/movieCatalog";
import { formatWatchedAt } from "@/lib/dates";
import type { ProgressState } from "@/lib/progressState";
import { formatDuration } from "@/lib/progressStats";
import type { Journal } from "@/lib/watchProgressStorage";

const COLLAPSED_COUNT = 6;

type WatchHistoryProps = {
  progress: ProgressState;
  journal: Journal;
  /** Ids visible under the current preferences (series hidden when excluded). */
  visibleIds: ReadonlySet<string>;
  watchedMinutes: number;
  today: string;
};

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </p>
      <p className="font-slate mt-2 text-2xl font-semibold leading-none">{value}</p>
    </div>
  );
}

export default function WatchHistory({
  progress,
  journal,
  visibleIds,
  watchedMinutes,
  today,
}: WatchHistoryProps) {
  const [showAll, setShowAll] = useState(false);

  const entries = useMemo(() => {
    const list = progress.watched
      .filter((id) => visibleIds.has(id))
      .flatMap((id) => {
        const movie = getMovieSummaryById(id);
        return movie ? [{ movie, watchedAt: progress.watchedAt[id] }] : [];
      });
    // Newest first; titles marked before dates were recorded go last.
    return list.sort((a, b) => (b.watchedAt ?? "").localeCompare(a.watchedAt ?? ""));
  }, [progress, visibleIds]);

  const inProgress = Object.entries(progress.episodes)
    .filter(([id]) => visibleIds.has(id))
    .flatMap(([id, episodes]) => {
      const movie = getMovieSummaryById(id);
      return movie ? [{ movie, episodes }] : [];
    });

  const month = today.slice(0, 7);
  // Compare in local time: the stored timestamps are UTC.
  const thisMonth = entries.filter(
    (entry) => entry.watchedAt && toIsoDate(new Date(entry.watchedAt)).startsWith(month),
  ).length;
  const ratings = entries
    .map((entry) => journal[entry.movie.id]?.rating)
    .filter((rating): rating is number => rating !== undefined);
  const average = ratings.length
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
    : "—";
  const shown = showAll ? entries : entries.slice(0, COLLAPSED_COUNT);

  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
    >
      <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
        Journal
      </p>
      <h2
        id="history-heading"
        className="font-display mt-2 text-2xl font-bold sm:text-3xl"
      >
        היסטוריית הצפייה שלך
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        מתי צפית בכל כותר, הדירוג וההערות שלך. דירוג והערה מוסיפים מכרטיס הכותר בקטע „מה
        הבנת”.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          icon={Clock}
          label="זמן צפייה"
          value={`כ־${formatDuration(watchedMinutes)}`}
        />
        <StatTile icon={CalendarCheck} label="החודש" value={String(thisMonth)} />
        <StatTile icon={Star} label="דירוג ממוצע" value={average} />
        <StatTile icon={Tv} label="בצפייה כעת" value={String(inProgress.length)} />
      </div>

      {inProgress.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {inProgress.map(({ movie, episodes }) => (
            <li
              key={movie.id}
              className="flex items-center gap-2 rounded-full border border-[var(--series)]/30 bg-[var(--series)]/[0.06] py-1 pe-3 ps-1 text-xs"
            >
              <PosterArt movie={movie} size="xs" className="!w-6" />
              <span dir="ltr" className="font-medium">
                {movie.title}
              </span>
              <span className="font-slate text-[var(--series)]" dir="ltr">
                {episodes.length}/{movie.episodes}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {entries.length === 0 ? (
        <p className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          <History className="h-4 w-4" aria-hidden="true" />
          עוד לא סימנת צפייה. כל כותר שתסמן יופיע כאן עם התאריך.
        </p>
      ) : (
        <>
          <ol className="mt-6 divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/70">
            {shown.map(({ movie, watchedAt }) => {
              const entry = journal[movie.id];
              return (
                <li key={movie.id} className="flex items-center gap-3 px-4 py-3">
                  <PosterArt movie={movie} size="xs" />
                  <div className="min-w-0 flex-1">
                    <p dir="ltr" className="font-display truncate text-sm font-semibold">
                      {movie.title}
                    </p>
                    {entry?.note ? (
                      <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
                        “{entry.note}”
                      </p>
                    ) : null}
                  </div>
                  {entry?.rating ? (
                    <StarRating
                      label={`הדירוג שלך ל-${movie.title}`}
                      value={entry.rating}
                      size="sm"
                    />
                  ) : null}
                  <span className="w-24 shrink-0 text-end text-[11px] text-[var(--muted)]">
                    {watchedAt ? formatWatchedAt(watchedAt) : "ללא תאריך"}
                  </span>
                </li>
              );
            })}
          </ol>
          {entries.length > COLLAPSED_COUNT ? (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="mt-3 text-xs text-[var(--accent-soft)] underline underline-offset-4"
            >
              {showAll ? "הצג פחות" : `הצג את כל ${entries.length} הכותרים`}
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}
