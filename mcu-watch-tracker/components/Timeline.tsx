"use client";

import { useId, useMemo, useState } from "react";

import SearchInput from "@/components/SearchInput";
import TimelineRow from "@/components/TimelineRow";
import { MOVIES_IN_RELEASE_ORDER } from "@/data/movieCatalog";
import type { MovieStatus, MovieSummary, Saga } from "@/types/movie";

type TimelineProps = {
  movies: readonly MovieSummary[];
  watchedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
};

type OrderMode = "timeline" | "release";
type WatchFilter = "all" | "watched" | "unwatched";

function SelectControl({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-[var(--muted)]">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] px-3 text-xs text-[var(--text)] transition-colors hover:border-[var(--border-strong)] focus:border-[var(--accent)]/60 focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

export default function Timeline({
  movies,
  watchedIds,
  onToggle,
}: TimelineProps) {
  const [query, setQuery] = useState("");
  const [orderMode, setOrderMode] = useState<OrderMode>("timeline");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [sagaFilter, setSagaFilter] = useState<"all" | Saga>("all");
  const [watchFilter, setWatchFilter] = useState<WatchFilter>("all");
  const searchId = useId();

  const trimmedQuery = query.trim().toLowerCase();

  const orderedMovies = orderMode === "timeline" ? movies : MOVIES_IN_RELEASE_ORDER;
  const nextVisibleOrderId = orderedMovies.find(
    (movie) => !watchedIds.has(movie.id),
  )?.id;
  const phases = useMemo(
    () => Array.from(new Set(movies.map((movie) => movie.phase))).sort((a, b) => a - b),
    [movies],
  );
  const displayOrderById = useMemo(
    () => new Map(orderedMovies.map((movie, index) => [movie.id, index + 1])),
    [orderedMovies],
  );

  const visibleMovies = useMemo(
    () =>
      orderedMovies.filter((movie) => {
        const matchesQuery =
          !trimmedQuery ||
          movie.title.toLowerCase().includes(trimmedQuery) ||
          movie.titleHe?.includes(trimmedQuery);
        const matchesPhase =
          phaseFilter === "all" || movie.phase === Number(phaseFilter);
        const matchesSaga = sagaFilter === "all" || movie.saga === sagaFilter;
        const matchesWatch =
          watchFilter === "all" ||
          (watchFilter === "watched"
            ? watchedIds.has(movie.id)
            : !watchedIds.has(movie.id));
        return matchesQuery && matchesPhase && matchesSaga && matchesWatch;
      }),
    [
      orderedMovies,
      phaseFilter,
      sagaFilter,
      trimmedQuery,
      watchFilter,
      watchedIds,
    ],
  );

  const statusOf = (movie: MovieSummary): MovieStatus => {
    if (watchedIds.has(movie.id)) return "watched";
    if (movie.id === nextVisibleOrderId) return "next";
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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div
          className="flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1"
          aria-label="סדר הצגת הסרטים"
        >
          {(["timeline", "release"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={orderMode === mode}
              onClick={() => setOrderMode(mode)}
              className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                orderMode === mode
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {mode === "timeline" ? "כרונולוגי" : "סדר יציאה"}
            </button>
          ))}
        </div>

        <SelectControl label="סינון לפי Phase" value={phaseFilter} onChange={setPhaseFilter}>
          <option value="all">כל השלבים</option>
          {phases.map((phase) => (
            <option key={phase} value={phase}>
              Phase {phase}
            </option>
          ))}
        </SelectControl>

        <SelectControl
          label="סינון לפי Saga"
          value={sagaFilter}
          onChange={(value) => setSagaFilter(value as "all" | Saga)}
        >
          <option value="all">כל הסאגות</option>
          <option value="infinity">Infinity Saga</option>
          <option value="multiverse">Multiverse Saga</option>
        </SelectControl>

        <SelectControl
          label="סינון לפי מצב צפייה"
          value={watchFilter}
          onChange={(value) => setWatchFilter(value as WatchFilter)}
        >
          <option value="all">הכול</option>
          <option value="watched">נצפו</option>
          <option value="unwatched">טרם נצפו</option>
        </SelectControl>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/60">
        {!trimmedQuery && phaseFilter === "all" && sagaFilter === "all" && watchFilter === "all" ? (
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
                displayOrder={displayOrderById.get(movie.id) ?? movie.timelineOrder}
                orderMode={orderMode}
                status={statusOf(movie)}
                onToggle={onToggle}
              />
            ))}
          </ul>
        )}
      </div>

      <p aria-live="polite" className="mt-3 text-xs text-[var(--muted)]">
        {visibleMovies.length === movies.length
          ? `${movies.length} סרטים`
          : `${visibleMovies.length} תוצאות מתוך ${movies.length}`}
      </p>
    </section>
  );
}
