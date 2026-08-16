"use client";

import { useId, useMemo, useState } from "react";

import SearchInput from "@/components/SearchInput";
import TimelineRow from "@/components/TimelineRow";
import type { Movie, MovieStatus } from "@/types/movie";

type TimelineProps = {
  movies: readonly Movie[];
  watchedIds: ReadonlySet<string>;
  nextMovieId: string | null;
  onToggle: (id: string) => void;
};

export default function Timeline({
  movies,
  watchedIds,
  nextMovieId,
  onToggle,
}: TimelineProps) {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const trimmedQuery = query.trim().toLowerCase();

  const visibleMovies = useMemo(() => {
    if (!trimmedQuery) return movies;
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(trimmedQuery) ||
        movie.titleHe?.includes(trimmedQuery),
    );
  }, [movies, trimmedQuery]);

  const statusOf = (movie: Movie): MovieStatus => {
    if (watchedIds.has(movie.id)) return "watched";
    if (movie.id === nextMovieId) return "next";
    return "upcoming";
  };

  return (
    <section
      aria-labelledby="timeline-heading"
      className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h2
            id="timeline-heading"
            className="font-display text-2xl font-bold sm:text-3xl"
          >
            ציר הזמן המלא
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {movies.length} סרטים בסדר כרונולוגי. לחיצה על שורה מסמנת או מבטלת
            צפייה.
          </p>
        </div>

        <SearchInput
          id={searchId}
          value={query}
          onChange={setQuery}
          label="חיפוש סרט בציר הזמן"
          placeholder="חיפוש לפי שם הסרט…"
        />
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/60">
        {!trimmedQuery ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-6 start-[32px] w-px bg-white/10 sm:start-[36px]"
          />
        ) : null}

        {visibleMovies.length === 0 ? (
          <p className="p-10 text-center text-sm text-[var(--muted)]">
            לא נמצא סרט שמתאים לחיפוש. נסה שם אחר או נקה את החיפוש.
          </p>
        ) : (
          <ul className="relative divide-y divide-[var(--border)]">
            {visibleMovies.map((movie) => (
              <TimelineRow
                key={movie.id}
                movie={movie}
                status={statusOf(movie)}
                onToggle={onToggle}
              />
            ))}
          </ul>
        )}
      </div>

      <p aria-live="polite" className="mt-3 text-xs text-[var(--muted)]">
        {trimmedQuery
          ? `${visibleMovies.length} תוצאות מתוך ${movies.length}`
          : `${movies.length} סרטים`}
      </p>
    </section>
  );
}
