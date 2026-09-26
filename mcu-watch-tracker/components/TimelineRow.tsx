"use client";

import { CalendarClock, Check, ChevronDown, Flag } from "lucide-react";
import { useId, useRef, useState } from "react";

import EpisodeTracker from "@/components/EpisodeTracker";
import KindBadge from "@/components/KindBadge";
import PosterArt from "@/components/PosterArt";
import { TIMELINE_FLAG_LABELS } from "@/data/movieCatalog";
import { formatReleaseDate, formatCountdown } from "@/lib/dates";
import { phaseColor } from "@/lib/phase";
import type { MovieStatus, MovieSummary, OrderMode } from "@/types/movie";

type TimelineRowProps = {
  movie: MovieSummary;
  displayOrder: number;
  orderMode: OrderMode;
  status: MovieStatus;
  /** Watched episode numbers (series only). */
  watchedEpisodes: readonly number[];
  /** Days until release, for unreleased titles. */
  daysUntil: number;
  /**
   * Rail segments above and below this row's node: `true` = lit (watched run),
   * `false` = dim, `null` = no segment (first/last row, or rail hidden).
   */
  railAbove: boolean | null;
  railBelow: boolean | null;
  onToggle: (id: string) => void;
  onToggleEpisode: (id: string, episode: number) => void;
};

const ROW_STYLES: Record<MovieStatus, string> = {
  watched: "hover:bg-white/[0.025]",
  "in-progress": "bg-[var(--series)]/[0.04] hover:bg-[var(--series)]/[0.07]",
  next: "bg-[var(--accent)]/[0.07] hover:bg-[var(--accent)]/[0.11]",
  upcoming: "hover:bg-white/[0.025]",
  unreleased: "",
};

const STATUS_LABELS: Record<
  Exclude<MovieStatus, "in-progress" | "unreleased">,
  string
> = {
  watched: "נצפה",
  next: "הבא",
  upcoming: "ממתין",
};

const STATUS_PILL_STYLES: Record<MovieStatus, string> = {
  watched: "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-soft)]",
  "in-progress": "border-[var(--series)]/40 bg-[var(--series)]/10 text-[var(--series)]",
  next: "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_0_18px_-4px_rgba(229,18,46,0.9)]",
  upcoming: "border-[var(--border)] text-[var(--muted)]",
  unreleased:
    "border-[var(--milestone)]/40 bg-[var(--milestone)]/10 text-[var(--milestone)]",
};

function Dot() {
  return (
    <span aria-hidden="true" className="text-[var(--border-strong)]">
      ·
    </span>
  );
}

function RailSegment({
  lit,
  position,
}: {
  lit: boolean;
  position: "above" | "below" | "full";
}) {
  const placement =
    position === "above"
      ? "top-0 bottom-1/2"
      : position === "below"
        ? "top-1/2 bottom-0"
        : "inset-y-0";
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute start-[29px] w-0.5 sm:start-[33px] ${placement}`}
      style={{ backgroundColor: lit ? "var(--accent)" : "rgba(255,255,255,0.08)" }}
    />
  );
}

export default function TimelineRow({
  movie,
  displayOrder,
  orderMode,
  status,
  watchedEpisodes,
  daysUntil,
  railAbove,
  railBelow,
  onToggle,
  onToggleEpisode,
}: TimelineRowProps) {
  const isWatched = status === "watched";
  const isUnreleased = status === "unreleased";
  const slateNumber = String(displayOrder).padStart(2, "0");
  const color = phaseColor(movie.phase);
  const rowRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const hasEpisodes = !!movie.episodes && !isUnreleased;
  const episodeCount = isWatched ? (movie.episodes ?? 0) : watchedEpisodes.length;

  // Toggling watched state resizes sections above the timeline (new knowledge
  // card, updated "next up" panel), which shifts this row on screen even
  // though scrollY doesn't change. Re-anchor the viewport to this row so the
  // click doesn't produce a visible jump.
  const keepInPlace = (action: () => void) => {
    const before = rowRef.current?.getBoundingClientRect().top;
    action();
    requestAnimationFrame(() => {
      const after = rowRef.current?.getBoundingClientRect().top;
      if (before === undefined || after === undefined) return;
      const delta = after - before;
      // "instant" overrides the page's smooth scrolling, which would animate the jump.
      if (delta !== 0) window.scrollBy({ top: delta, behavior: "instant" });
    });
  };

  const pillLabel =
    status === "in-progress"
      ? `${episodeCount}/${movie.episodes}`
      : status === "unreleased"
        ? "בקרוב"
        : STATUS_LABELS[status];

  const body = (
    <>
      <span
        aria-hidden="true"
        className={`font-slate relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-[11px] font-semibold transition-all ${
          isWatched
            ? "border-[var(--accent)] bg-[var(--accent)] text-white"
            : status === "next"
              ? "border-[var(--accent)] bg-[var(--bg)] text-[var(--text)] ring-4 ring-[var(--accent)]/20"
              : status === "in-progress"
                ? "border-[var(--series)] bg-[var(--bg)] text-[var(--series)]"
                : isUnreleased
                  ? "border-dashed border-[var(--milestone)]/60 bg-[var(--bg)] text-[var(--milestone)]"
                  : "bg-[var(--bg)] text-[var(--muted)] group-hover:text-[var(--text)]"
        }`}
        style={status === "upcoming" ? { borderColor: `${color}66` } : undefined}
      >
        {isWatched ? (
          <Check key="check" className="animate-pop-in h-4 w-4" strokeWidth={3} />
        ) : isUnreleased ? (
          <CalendarClock className="h-4 w-4" />
        ) : (
          slateNumber
        )}
      </span>

      <PosterArt
        movie={movie}
        size="xs"
        muted={isUnreleased}
        className="hidden sm:block"
      />

      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 items-baseline gap-2">
          <span
            dir="ltr"
            className={`font-display truncate text-sm font-semibold sm:text-[15px] ${
              status === "upcoming" || isUnreleased
                ? "text-[var(--text)]/75"
                : "text-[var(--text)]"
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
          {isUnreleased ? (
            <>
              <Dot />
              <span className="text-[var(--milestone)]">
                {formatReleaseDate(movie.releaseDate)} · {formatCountdown(daysUntil)}
              </span>
            </>
          ) : orderMode === "release" ? (
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
        dir={status === "in-progress" ? "ltr" : undefined}
        className={`font-slate w-[58px] shrink-0 rounded-full border px-2 py-1 text-center text-[11px] font-medium transition-colors ${STATUS_PILL_STYLES[status]}`}
      >
        {pillLabel}
      </span>
    </>
  );

  return (
    <li>
      <div ref={rowRef} className={`relative flex items-stretch ${ROW_STYLES[status]}`}>
        {railAbove !== null ? <RailSegment lit={railAbove} position="above" /> : null}
        {railBelow !== null ? <RailSegment lit={railBelow} position="below" /> : null}

        {isUnreleased ? (
          <div
            className="relative flex w-full items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4"
            aria-label={`${movie.title} — ייצא ב-${formatReleaseDate(movie.releaseDate)}`}
          >
            {body}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => keepInPlace(() => onToggle(movie.id))}
            aria-pressed={isWatched}
            aria-label={
              isWatched
                ? `${movie.title} — נצפה. לחיצה תסיר את הסימון`
                : `${movie.title} — לא נצפה. לחיצה תסמן ${movie.episodes ? "את כל העונה " : ""}כנצפה`
            }
            className="group relative flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-start sm:gap-4 sm:px-4"
          >
            {body}
          </button>
        )}

        {hasEpisodes ? (
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-label={`${expanded ? "הסתרת" : "הצגת"} הפרקים של ${movie.title}`}
            className="grid w-11 shrink-0 place-items-center border-s border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-white/[0.04] hover:text-[var(--series)]"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        ) : null}
      </div>

      {hasEpisodes && expanded ? (
        <div
          id={panelId}
          className="animate-rise-in relative border-t border-[var(--border)] bg-black/20"
        >
          {railBelow !== null ? <RailSegment lit={railBelow} position="full" /> : null}
          <div className="py-4 pe-4 ps-[60px] sm:ps-[68px]">
            <EpisodeTracker
              title={movie.title}
              total={movie.episodes ?? 0}
              watched={
                isWatched
                  ? Array.from({ length: movie.episodes ?? 0 }, (_, index) => index + 1)
                  : watchedEpisodes
              }
              onToggle={(episode) =>
                keepInPlace(() => onToggleEpisode(movie.id, episode))
              }
              size="sm"
            />
          </div>
        </div>
      ) : null}
    </li>
  );
}
