"use client";

import { Check } from "lucide-react";

type EpisodeTrackerProps = {
  title: string;
  total: number;
  /** Watched episode numbers. */
  watched: readonly number[];
  onToggle: (episode: number) => void;
  size?: "sm" | "md";
};

/** One toggle chip per episode, plus a thin progress bar for the season. */
export default function EpisodeTracker({
  title,
  total,
  watched,
  onToggle,
  size = "md",
}: EpisodeTrackerProps) {
  const watchedSet = new Set(watched);
  const percent = Math.round((watchedSet.size / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--muted)]">
        <span>פרקים</span>
        <span className="font-slate" dir="ltr">
          {watchedSet.size}/{total}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-[var(--series)] transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul
        role="group"
        aria-label={`פרקים של ${title}`}
        className="mt-3 flex flex-wrap gap-1.5"
      >
        {Array.from({ length: total }, (_, index) => index + 1).map((episode) => {
          const isWatched = watchedSet.has(episode);
          return (
            <li key={episode}>
              <button
                type="button"
                aria-pressed={isWatched}
                aria-label={`פרק ${episode}${isWatched ? " — נצפה" : ""}`}
                onClick={() => onToggle(episode)}
                className={`font-slate grid place-items-center rounded-lg border font-semibold transition-all ${
                  size === "sm" ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-xs"
                } ${
                  isWatched
                    ? "border-[var(--series)] bg-[var(--series)] text-[#04111f]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--series)]/60 hover:text-[var(--text)]"
                }`}
              >
                {isWatched ? (
                  <Check
                    className="animate-pop-in h-3.5 w-3.5"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                ) : (
                  episode
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
