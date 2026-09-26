"use client";

import { Check, CheckCheck, Clock, PartyPopper } from "lucide-react";

import EpisodeTracker from "@/components/EpisodeTracker";
import KindBadge from "@/components/KindBadge";
import PosterArt from "@/components/PosterArt";
import { TIMELINE_FLAG_LABELS } from "@/data/movieCatalog";
import { phaseColor } from "@/lib/phase";
import { formatDuration } from "@/lib/progressStats";
import type { MovieSummary, OrderMode } from "@/types/movie";

type NextUpCardProps = {
  movie: MovieSummary | null;
  /** For a series: the next episode to watch. */
  nextEpisode: number | null;
  /** For a series: episodes already watched. */
  watchedEpisodes: readonly number[];
  /** Unwatched titles after `movie`, in the same order. */
  queue: readonly MovieSummary[];
  /** 1-based position of `movie` in the viewer's active order. */
  position: number;
  totalMovies: number;
  orderMode: OrderMode;
  onComplete: () => void;
  onCompleteTitle: (id: string) => void;
  onToggleEpisode: (id: string, episode: number) => void;
};

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-[var(--text)]">{children}</dd>
    </div>
  );
}

export default function NextUpCard({
  movie,
  nextEpisode,
  watchedEpisodes,
  queue,
  position,
  totalMovies,
  orderMode,
  onComplete,
  onCompleteTitle,
  onToggleEpisode,
}: NextUpCardProps) {
  if (!movie) {
    return (
      <div className="rounded-3xl border border-[var(--milestone)]/30 bg-gradient-to-b from-[var(--milestone)]/[0.08] to-[var(--bg-raised)] p-6 sm:p-8">
        <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--milestone)]">
          Timeline complete
        </p>
        <h2 className="font-display mt-4 flex items-center gap-2 text-2xl font-bold">
          <PartyPopper className="h-6 w-6 text-[var(--milestone)]" aria-hidden="true" />
          סיימת את כל {totalMovies} הכותרים שיצאו
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          הכותרים הבאים מופיעים ב„בקרוב”. אפשר גם להסיר סימון מכל כותר בציר הזמן כדי לחזור
          אליו.
        </p>
      </div>
    );
  }

  const slateNumber = String(position).padStart(2, "0");
  const color = phaseColor(movie.phase);
  const isSeries = !!movie.episodes;
  // Skip a flag that only repeats the era already shown in the details grid.
  const flags = (movie.timelineFlags ?? []).filter(
    (flag) => isSeries || TIMELINE_FLAG_LABELS[flag] !== movie.timelineLabel,
  );
  const episodeMinutes =
    isSeries && movie.runtimeMinutes
      ? movie.runtimeMinutes / (movie.episodes ?? 1)
      : null;

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
        <div className="flex gap-5">
          <PosterArt movie={movie} size="md" className="hidden shadow-2xl sm:block" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--accent-soft)]">
                הבא בתור
              </p>
              <KindBadge movie={movie} />
            </div>

            <h2
              dir="ltr"
              className="font-display mt-3 text-3xl font-extrabold leading-tight sm:text-[2.1rem]"
            >
              {movie.title}
            </h2>
            {movie.titleHe ? (
              <p className="mt-1 text-sm text-[var(--muted)]">{movie.titleHe}</p>
            ) : null}
            {isSeries && nextEpisode ? (
              <p className="mt-2 text-sm font-medium text-[var(--series)]">
                פרק {nextEpisode} מתוך {movie.episodes}
              </p>
            ) : null}
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[var(--border)] pt-5 text-xs sm:grid-cols-4">
          <Detail label={orderMode === "timeline" ? "מיקום בציר" : "מיקום ביציאה"}>
            <span className="font-slate" dir="ltr">
              {position} / {totalMovies}
            </span>
          </Detail>
          <Detail label="שלב">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              Phase {movie.phase}
            </span>
          </Detail>
          <Detail label="יציאה">
            <span className="font-slate">{movie.releaseYear}</span>
          </Detail>
          <Detail label={isSeries ? "אורך פרק" : "אורך"}>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true" />
              {episodeMinutes
                ? `כ־${formatDuration(episodeMinutes)}`
                : movie.runtimeMinutes
                  ? formatDuration(movie.runtimeMinutes)
                  : "—"}
            </span>
          </Detail>
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

        {isSeries ? (
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-black/20 p-4">
            <EpisodeTracker
              title={movie.title}
              total={movie.episodes ?? 0}
              watched={watchedEpisodes}
              onToggle={(episode) => onToggleEpisode(movie.id, episode)}
            />
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onComplete}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(229,18,46,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] active:translate-y-0"
          >
            <Check
              className="h-4 w-4 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {isSeries && nextEpisode ? `סיימתי את פרק ${nextEpisode}` : "סיימתי לצפות"}
          </button>
          {isSeries ? (
            <button
              type="button"
              onClick={() => onCompleteTitle(movie.id)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] px-4 py-3.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--series)]/60 hover:bg-[var(--series)]/10"
            >
              <CheckCheck className="h-4 w-4 text-[var(--series)]" aria-hidden="true" />
              כל העונה
            </button>
          ) : null}
        </div>

        {queue.length > 0 ? (
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              אחר כך
            </p>
            <ol className="mt-2.5 space-y-2">
              {queue.map((title) => (
                <li key={title.id} className="flex items-center gap-2.5 text-sm">
                  <PosterArt movie={title} size="xs" />
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
