"use client";

import { Check, PartyPopper } from "lucide-react";

import { TIMELINE_FLAG_LABELS } from "@/data/movieCatalog";
import type { MovieSummary } from "@/types/movie";

type NextUpCardProps = {
  movie: MovieSummary | null;
  totalMovies: number;
  onComplete: () => void;
};

export default function NextUpCard({ movie, totalMovies, onComplete }: NextUpCardProps) {
  if (!movie) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-6 sm:p-8">
        <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
          Timeline complete
        </p>
        <h2 className="font-display mt-4 flex items-center gap-2 text-2xl font-bold">
          <PartyPopper className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
          סיימת את כל {totalMovies} הסרטים
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          אפשר להסיר סימון מכל סרט בציר הזמן כדי לחזור אליו, או לאפס את ההתקדמות מהכותרת
          העליונה.
        </p>
      </div>
    );
  }

  const slateNumber = String(movie.timelineOrder).padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--accent)]/35 bg-gradient-to-b from-[#14060a] to-[var(--bg-raised)] p-6 shadow-[0_0_60px_-25px_rgba(229,18,46,0.7)] sm:p-8">
      <span
        aria-hidden="true"
        className="font-slate pointer-events-none absolute -top-6 start-4 select-none text-[7rem] font-bold leading-none text-white/[0.04]"
      >
        {slateNumber}
      </span>

      <div className="relative">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
          הסרט הבא · Movie {slateNumber}
        </p>

        <h2
          dir="ltr"
          className="font-display mt-4 text-3xl font-extrabold leading-tight sm:text-[2.1rem]"
        >
          {movie.title}
        </h2>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[var(--border)] pt-5 text-xs sm:grid-cols-3">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              מיקום בציר
            </dt>
            <dd className="mt-1.5 text-sm text-[var(--text)]">
              {movie.timelineOrder} מתוך {totalMovies}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Phase
            </dt>
            <dd className="mt-1.5 text-sm text-[var(--text)]">{movie.phase}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              תקופה
            </dt>
            <dd className="mt-1.5 text-sm text-[var(--text)]">
              {movie.timelineLabel ?? "—"}
            </dd>
          </div>
        </dl>

        {movie.timelineFlags && movie.timelineFlags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {movie.timelineFlags.map((flag) => (
              <li
                key={flag}
                className="rounded border border-[var(--border)] px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--muted)]"
              >
                {TIMELINE_FLAG_LABELS[flag]}
              </li>
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          onClick={onComplete}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-soft)]"
        >
          <Check className="h-4 w-4" aria-hidden="true" />
          סיימתי את הסרט
        </button>

        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          הסימון מקדם אוטומטית לסרט הבא בציר הזמן וניתן לביטול
        </p>
      </div>
    </div>
  );
}
