"use client";

import { Check, Flag } from "lucide-react";
import { useRef } from "react";

import KindBadge from "@/components/KindBadge";
import { TIMELINE_FLAG_LABELS } from "@/data/movieCatalog";
import { phaseColor } from "@/lib/phase";
import type { MovieStatus, MovieSummary, OrderMode } from "@/types/movie";

type TimelineRowProps = {
  movie: MovieSummary;
  displayOrder: number;
  orderMode: OrderMode;
  status: MovieStatus;
  /**
   * Rail segments above and below this row's node: `true` = lit (watched run),
   * `false` = dim, `null` = no segment (first/last row, or rail hidden).
   */
  railAbove: boolean | null;
  railBelow: boolean | null;
  onToggle: (id: string) => void;
};

const ROW_STYLES: Record<MovieStatus, string> = {
  watched: "hover:bg-white/[0.025]",
  next: "bg-[var(--accent)]/[0.07] hover:bg-[var(--accent)]/[0.11]",
  upcoming: "hover:bg-white/[0.025]",
};

const STATUS_LABELS: Record<MovieStatus, string> = {
  watched: "נצפה",
  next: "הבא",
  upcoming: "ממתין",
};

const STATUS_PILL_STYLES: Record<MovieStatus, string> = {
  watched: "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-soft)]",
  next: "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_0_18px_-4px_rgba(229,18,46,0.9)]",
  upcoming: "border-[var(--border)] text-[var(--muted)]",
};

function Dot() {
  return (
    <span aria-hidden="true" className="text-[var(--border-strong)]">
      ·
    </span>
  );
}

function RailSegment({ lit, position }: { lit: boolean; position: "above" | "below" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute start-[29px] w-0.5 sm:start-[33px] ${
        position === "above" ? "top-0 bottom-1/2" : "top-1/2 bottom-0"
      }`}
      style={{ backgroundColor: lit ? "var(--accent)" : "rgba(255,255,255,0.08)" }}
    />
  );
}

export default function TimelineRow({
  movie,
  displayOrder,
  orderMode,
  status,
  railAbove,
  railBelow,
  onToggle,
}: TimelineRowProps) {
  const isWatched = status === "watched";
  const slateNumber = String(displayOrder).padStart(2, "0");
  const color = phaseColor(movie.phase);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Toggling watched state resizes sections above the timeline (new knowledge
  // card, updated "next up" panel), which shifts this row on screen even
  // though scrollY doesn't change. Re-anchor the viewport to this row so the
  // click doesn't produce a visible jump.
  const commitToggle = () => {
    const before = buttonRef.current?.getBoundingClientRect().top;
    onToggle(movie.id);
    requestAnimationFrame(() => {
      const after = buttonRef.current?.getBoundingClientRect().top;
      if (before === undefined || after === undefined) return;
      const delta = after - before;
      // "instant" overrides the page's smooth scrolling, which would animate the jump.
      if (delta !== 0) window.scrollBy({ top: delta, behavior: "instant" });
    });
  };

  return (
    <li className="relative">
      {railAbove !== null ? <RailSegment lit={railAbove} position="above" /> : null}
      {railBelow !== null ? <RailSegment lit={railBelow} position="below" /> : null}
      <button
        ref={buttonRef}
        type="button"
        onClick={commitToggle}
        aria-pressed={isWatched}
        aria-label={
          isWatched
            ? `${movie.title} — נצפה. לחיצה תסיר את הסימון`
            : `${movie.title} — לא נצפה. לחיצה תסמן כנצפה`
        }
        className={`group relative flex w-full items-center gap-3 px-3 py-3 text-start transition-colors sm:gap-4 sm:px-4 ${ROW_STYLES[status]}`}
      >
        <span
          aria-hidden="true"
          className={`font-slate relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-[11px] font-semibold transition-all ${
            isWatched
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : status === "next"
                ? "border-[var(--accent)] bg-[var(--bg)] text-[var(--text)] ring-4 ring-[var(--accent)]/20"
                : "bg-[var(--bg)] text-[var(--muted)] group-hover:text-[var(--text)]"
          }`}
          style={
            isWatched || status === "next" ? undefined : { borderColor: `${color}66` }
          }
        >
          {isWatched ? (
            <Check key="check" className="animate-pop-in h-4 w-4" strokeWidth={3} />
          ) : (
            slateNumber
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-baseline gap-2">
            <span
              dir="ltr"
              className={`font-display truncate text-sm font-semibold sm:text-[15px] ${
                status === "upcoming" ? "text-[var(--text)]/75" : "text-[var(--text)]"
              }`}
            >
              {movie.title}
            </span>
            {movie.titleHe ? (
              <span className="hidden truncate text-xs text-[var(--muted)] md:inline">
                {movie.titleHe}
              </span>
            ) : null}
          </span>

          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[var(--muted)]">
            <span className="flex items-center gap-1">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              Phase {movie.phase}
            </span>
            {orderMode === "release" ? (
              <>
                <Dot />
                <span className="font-slate">{movie.releaseYear}</span>
              </>
            ) : null}
            {movie.timelineLabel ? (
              <>
                <Dot />
                <span>{movie.timelineLabel}</span>
              </>
            ) : null}
            {movie.kind !== "movie" ? <KindBadge movie={movie} /> : null}
            {movie.timelineFlags
              ?.filter((flag) => TIMELINE_FLAG_LABELS[flag] !== movie.timelineLabel)
              .map((flag) => (
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
          className={`w-[58px] shrink-0 rounded-full border px-2 py-1 text-center text-[11px] font-medium transition-colors ${STATUS_PILL_STYLES[status]}`}
        >
          {STATUS_LABELS[status]}
        </span>
      </button>
    </li>
  );
}
