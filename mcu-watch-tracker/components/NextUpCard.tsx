"use client";

import { Check, PartyPopper } from "lucide-react";

import KindBadge from "@/components/KindBadge";
import { TIMELINE_FLAG_LABELS } from "@/data/movieCatalog";
import { phaseColor } from "@/lib/phase";
import type { MovieSummary, OrderMode } from "@/types/movie";

type NextUpCardProps = {
  movie: MovieSummary | null;
  /** Unwatched titles after `movie`, in the same order. */
  queue: readonly MovieSummary[];
  /** 1-based position of `movie` in the viewer's active order. */
  position: number;
  totalMovies: number;
  orderMode: OrderMode;
  onComplete: () => void;
};

export default function NextUpCard({
  movie,
  queue,
  position,
  totalMovies,
  orderMode,
  onComplete,
}: NextUpCardProps) {
  if (!movie) {
    return (
      <div className="rounded-3xl border border-[var(--milestone)]/30 bg-gradient-to-b from-[var(--milestone)]/[0.08] to-[var(--bg-raised)] p-6 sm:p-8">
        <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--milestone)]">
          Timeline complete
        </p>
        <h2 className="font-display mt-4 flex items-center gap-2 text-2xl font-bold">
          <PartyPopper className="h-6 w-6 text-[var(--milestone)]" aria-hidden="true" />
          סיימת את כל {totalMovies} הכותרים
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          אפשר להסיר סימון מכל כותר בציר הזמן כדי לחזור אליו, או לאפס את ההתקדמות
          מההגדרות.
        </p>
      </div>
    );
  }

  const slateNumber = String(position).padStart(2, "0");
  const color = phaseColor(movie.phase);
  // Skip a flag that only repeats the era already shown in the details grid.
  const flags = (movie.timelineFlags ?? []).filter(
    (flag) => movie.episodes || TIMELINE_FLAG_LABELS[flag] !== movie.timelineLabel,
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/35 bg-gradient-to-b from-[#16070b] to-[var(--bg-raised)] p-6 shadow-[0_30px_80px_-40px_rgba(229,18,46,0.8)] sm:p-8">
      <span
        aria-hidden="true"
        className="font-slate pointer-events-none absolute -top-8 end-2 select-none text-[9rem] font-bold leading-none text-white/[0.04]"
      >
        {slateNumber}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 w-1"
        style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--accent-soft)]">
            הבא בתור
          </p>
          <KindBadge movie={movie} />
        </div>

        <h2
          dir="ltr"
          className="font-display mt-4 text-3xl font-extrabold leading-tight sm:text-[2.2rem]"
        >
          {movie.title}
        </h2>
        {movie.titleHe ? (
          <p className="mt-1 text-sm text-[var(--muted)]">{movie.titleHe}</p>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[var(--border)] pt-5 text-xs sm:grid-cols-4">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {orderMode === "timeline" ? "מיקום בציר" : "מיקום ביציאה"}
            </dt>
            <dd className="font-slate mt-1.5 text-sm text-[var(--text)]">
              <span dir="ltr">
                {position} / {totalMovies}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              שלב
            </dt>
            <dd className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--text)]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              Phase {movie.phase}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              יציאה
            </dt>
            <dd className="font-slate mt-1.5 text-sm text-[var(--text)]">
              {movie.releaseYear}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {movie.episodes ? "פרקים" : "תקופה"}
            </dt>
            <dd className="mt-1.5 text-sm text-[var(--text)]">
              {movie.episodes ?? movie.timelineLabel ?? "—"}
            </dd>
          </div>
        </dl>

        {flags.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {flags.map((flag) => (
              <li
                key={flag}
                className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--muted)]"
              >
                {TIMELINE_FLAG_LABELS[flag]}
              </li>
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          onClick={onComplete}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(229,18,46,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] active:translate-y-0"
        >
          <Check
            className="h-4 w-4 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          סיימתי לצפות
        </button>

        {queue.length > 0 ? (
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              אחר כך
            </p>
            <ol className="mt-2.5 space-y-1.5">
              {queue.map((title) => (
                <li key={title.id} className="flex items-center gap-2.5 text-sm">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: phaseColor(title.phase) }}
                  />
                  <span
                    dir="ltr"
                    className="min-w-0 flex-1 truncate text-[var(--text)]/85"
                  >
                    {title.title}
                  </span>
                  <KindBadge movie={title} compact />
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </div>
  );
}
