"use client";

import { Check, Flag } from "lucide-react";
import { useRef } from "react";

import { TIMELINE_FLAG_LABELS } from "@/data/movies";
import type { Movie, MovieStatus } from "@/types/movie";

type TimelineRowProps = {
  movie: Movie;
  status: MovieStatus;
  onToggle: (id: string) => void;
};

const ROW_STYLES: Record<MovieStatus, string> = {
  watched: "border-[var(--accent)]/40 hover:bg-white/[0.03]",
  next: "border-[var(--accent)] bg-[var(--accent)]/[0.07] hover:bg-[var(--accent)]/[0.11]",
  upcoming: "border-transparent hover:bg-white/[0.03]",
};

const BADGE_STYLES: Record<MovieStatus, string> = {
  watched: "border-[var(--accent)]/35 bg-[#170a0e] text-[var(--accent-soft)]",
  next: "border-[var(--accent)] bg-[var(--accent)] text-white",
  upcoming: "border-[var(--border)] bg-[var(--bg-raised)] text-[var(--muted)]",
};

const STATUS_LABELS: Record<MovieStatus, string> = {
  watched: "נצפה",
  next: "הבא",
  upcoming: "ממתין",
};

const STATUS_PILL_STYLES: Record<MovieStatus, string> = {
  watched: "border-[var(--border)] text-[var(--text)]",
  next: "border-[var(--accent)] bg-[var(--accent)] text-white",
  upcoming: "border-[var(--border)] text-[var(--muted)]",
};

export default function TimelineRow({
  movie,
  status,
  onToggle,
}: TimelineRowProps) {
  const isWatched = status === "watched";
  const slateNumber = String(movie.timelineOrder).padStart(2, "0");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Toggling watched state resizes sections above the timeline (new knowledge
  // card, updated "next up" panel), which shifts this row on screen even
  // though scrollY doesn't change. Re-anchor the viewport to this row so the
  // click doesn't produce a visible jump.
  const handleClick = () => {
    const before = buttonRef.current?.getBoundingClientRect().top;
    onToggle(movie.id);
    requestAnimationFrame(() => {
      const after = buttonRef.current?.getBoundingClientRect().top;
      if (before === undefined || after === undefined) return;
      const delta = after - before;
      if (delta !== 0) window.scrollBy(0, delta);
    });
  };

  return (
    <li>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        aria-pressed={isWatched}
        aria-label={
          isWatched
            ? `${movie.title} — נצפה. לחיצה תסיר את הסימון`
            : `${movie.title} — לא נצפה. לחיצה תסמן כנצפה`
        }
        className={[
          "flex w-full items-center gap-3 border-s-2 px-3 py-3 text-start transition-colors sm:gap-4 sm:px-4",
          ROW_STYLES[status],
        ].join(" ")}
      >
        <span
          className={[
            "font-slate relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-xs font-semibold",
            BADGE_STYLES[status],
          ].join(" ")}
          aria-hidden="true"
        >
          {isWatched ? <Check className="h-4 w-4" /> : slateNumber}
        </span>

        <span className="min-w-0 flex-1">
          <span
            dir="ltr"
            className={[
              "font-display block truncate text-sm font-semibold sm:text-[15px]",
              status === "upcoming" ? "text-[var(--muted)]" : "text-[var(--text)]",
            ].join(" ")}
          >
            {movie.title}
          </span>

          <span className="font-slate mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[var(--muted)]">
            <span>Phase {movie.phase}</span>
            {movie.timelineLabel ? (
              <>
                <span aria-hidden="true" className="text-[var(--border-strong)]">
                  ·
                </span>
                <span>{movie.timelineLabel}</span>
              </>
            ) : null}
            {movie.timelineFlags?.map((flag) => (
              <span
                key={flag}
                className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide"
              >
                {TIMELINE_FLAG_LABELS[flag]}
              </span>
            ))}
            {movie.milestone ? (
              <span className="flex items-center gap-1 rounded border border-[var(--milestone)]/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--milestone)]">
                <Flag className="h-2.5 w-2.5" aria-hidden="true" />
                אבן דרך
              </span>
            ) : null}
          </span>
        </span>

        <span
          className={[
            "shrink-0 rounded-full border px-2 py-1 text-center text-[11px] w-[58px]",
            STATUS_PILL_STYLES[status],
          ].join(" ")}
        >
          {STATUS_LABELS[status]}
        </span>
      </button>
    </li>
  );
}
