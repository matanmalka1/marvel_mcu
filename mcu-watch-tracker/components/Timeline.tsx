"use client";

import { FilterX } from "lucide-react";
import { useId, useMemo } from "react";

import SearchInput from "@/components/SearchInput";
import SegmentedControl from "@/components/SegmentedControl";
import TimelineRow from "@/components/TimelineRow";
import { ENDGAME_ID } from "@/data/movieCatalog";
import {
  hasActiveFilters,
  useTimelineFilters,
  type KindFilter,
  type WatchFilter,
} from "@/hooks/useTimelineFilters";
import { phaseColor } from "@/lib/phase";
import type { MovieStatus, MovieSummary, OrderMode, Saga } from "@/types/movie";

type TimelineProps = {
  /** Tracked titles, already in the viewer's chosen order. */
  movies: readonly MovieSummary[];
  watchedIds: ReadonlySet<string>;
  nextMovieId: string | undefined;
  orderMode: OrderMode;
  includeSeries: boolean;
  onOrderModeChange: (mode: OrderMode) => void;
  onToggle: (id: string) => void;
};

type Group = {
  key: string;
  label: string;
  color: string;
  items: MovieSummary[];
};

const ORDER_OPTIONS = [
  { value: "timeline", label: "כרונולוגי" },
  { value: "release", label: "סדר יציאה" },
] as const;

const STATUS_OPTIONS = [
  { value: "all", label: "הכול" },
  { value: "unwatched", label: "טרם נצפו" },
  { value: "watched", label: "נצפו" },
] as const satisfies ReadonlyArray<{ value: WatchFilter; label: string }>;

const KIND_OPTIONS = [
  { value: "all", label: "הכול" },
  { value: "movie", label: "סרטים" },
  { value: "series", label: "סדרות" },
] as const satisfies ReadonlyArray<{ value: KindFilter; label: string }>;

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
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] px-3 text-xs text-[var(--text)] transition-colors hover:border-[var(--border-strong)] focus:border-[var(--accent)]/60 focus:outline-none"
    >
      {children}
    </select>
  );
}

/**
 * Splits the visible rows into consecutive runs: story eras (before / after Endgame)
 * in chronological order, release phases in release order.
 */
function groupTitles(
  visible: readonly MovieSummary[],
  all: readonly MovieSummary[],
  orderMode: OrderMode,
): Group[] {
  const endgameIndex = all.findIndex((movie) => movie.id === ENDGAME_ID);
  const indexById = new Map(all.map((movie, index) => [movie.id, index]));
  const groups: Group[] = [];

  for (const movie of visible) {
    let key: string;
    let label: string;
    let color: string;
    if (orderMode === "release") {
      key = `phase-${movie.phase}`;
      label = `Phase ${movie.phase}`;
      color = phaseColor(movie.phase);
    } else if ((indexById.get(movie.id) ?? 0) <= endgameIndex) {
      key = "infinity";
      label = "The Infinity Saga · עד Endgame";
      color = "var(--milestone)";
    } else {
      key = "after-endgame";
      label = "אחרי Endgame · The Multiverse Saga";
      color = "var(--series)";
    }

    const last = groups[groups.length - 1];
    if (last?.key === key) last.items.push(movie);
    else groups.push({ key, label, color, items: [movie] });
  }
  return groups;
}

export default function Timeline({
  movies,
  watchedIds,
  nextMovieId,
  orderMode,
  includeSeries,
  onOrderModeChange,
  onToggle,
}: TimelineProps) {
  const { filters, updateFilters, clearFilters } = useTimelineFilters();
  const searchId = useId();

  const trimmedQuery = filters.query.trim().toLowerCase();
  // The kind filter is meaningless (and hidden) when series are excluded.
  const kindFilter: KindFilter = includeSeries ? filters.kind : "all";
  const filtersActive = hasActiveFilters({ ...filters, kind: kindFilter });

  const phases = useMemo(
    () => Array.from(new Set(movies.map((movie) => movie.phase))).sort((a, b) => a - b),
    [movies],
  );
  const displayOrderById = useMemo(
    () => new Map(movies.map((movie, index) => [movie.id, index + 1])),
    [movies],
  );

  const visibleMovies = useMemo(
    () =>
      movies.filter((movie) => {
        const matchesQuery =
          !trimmedQuery ||
          movie.title.toLowerCase().includes(trimmedQuery) ||
          movie.titleHe?.includes(trimmedQuery);
        const matchesPhase = filters.phase === "all" || movie.phase === filters.phase;
        const matchesSaga = filters.saga === "all" || movie.saga === filters.saga;
        const matchesKind =
          kindFilter === "all" ||
          (kindFilter === "movie" ? movie.kind === "movie" : movie.kind !== "movie");
        const matchesWatch =
          filters.status === "all" ||
          (filters.status === "watched"
            ? watchedIds.has(movie.id)
            : !watchedIds.has(movie.id));
        return matchesQuery && matchesPhase && matchesSaga && matchesKind && matchesWatch;
      }),
    [movies, trimmedQuery, filters, kindFilter, watchedIds],
  );

  const groups = useMemo(
    () => groupTitles(visibleMovies, movies, orderMode),
    [visibleMovies, movies, orderMode],
  );

  const statusOf = (movie: MovieSummary): MovieStatus => {
    if (watchedIds.has(movie.id)) return "watched";
    if (movie.id === nextMovieId) return "next";
    return "upcoming";
  };

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
            Timeline
          </p>
          <h2
            id="timeline-heading"
            className="font-display mt-2 text-2xl font-bold sm:text-3xl"
          >
            ציר הזמן המלא
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {movies.length} {includeSeries ? "סרטים וסדרות" : "סרטים"}{" "}
            {orderMode === "timeline" ? "בסדר כרונולוגי" : "לפי סדר יציאה"}. לחיצה על שורה
            מסמנת או מבטלת צפייה.
          </p>
        </div>
      </div>

      <div className="glass z-30 -mx-4 mt-6 border-y border-[var(--border)] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border lg:sticky lg:top-[4.5rem]">
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            id={searchId}
            value={filters.query}
            onChange={(query) => updateFilters({ query })}
            label="חיפוש בציר הזמן"
            placeholder="חיפוש לפי שם, באנגלית או בעברית…"
          />
          <SegmentedControl
            label="סדר הצגה"
            value={orderMode}
            options={ORDER_OPTIONS}
            onChange={onOrderModeChange}
          />
          <SegmentedControl
            label="סינון לפי מצב צפייה"
            value={filters.status}
            options={STATUS_OPTIONS}
            onChange={(status) => updateFilters({ status })}
          />
          {includeSeries ? (
            <SegmentedControl
              label="סינון לפי סוג"
              value={kindFilter}
              options={KIND_OPTIONS}
              onChange={(kind) => updateFilters({ kind })}
            />
          ) : null}
          <SelectControl
            label="סינון לפי Phase"
            value={String(filters.phase)}
            onChange={(value) =>
              updateFilters({ phase: value === "all" ? "all" : Number(value) })
            }
          >
            <option value="all">כל השלבים</option>
            {phases.map((phase) => (
              <option key={phase} value={phase}>
                Phase {phase}
              </option>
            ))}
          </SelectControl>
          <SelectControl
            label="סינון לפי Saga"
            value={filters.saga}
            onChange={(value) => updateFilters({ saga: value as "all" | Saga })}
          >
            <option value="all">כל הסאגות</option>
            <option value="infinity">Infinity Saga</option>
            <option value="multiverse">Multiverse Saga</option>
          </SelectControl>
          {filtersActive ? (
            <button
              type="button"
              onClick={clearFilters}
              className="flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs text-[var(--accent-soft)] transition-colors hover:bg-[var(--accent)]/10"
            >
              <FilterX className="h-3.5 w-3.5" aria-hidden="true" />
              ניקוי סינון
            </button>
          ) : null}
        </div>
      </div>

      {visibleMovies.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--border)] p-10 text-center">
          <p className="text-sm text-[var(--muted)]">לא נמצא כותר שמתאים לסינון.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-xs text-[var(--accent-soft)] underline underline-offset-4"
          >
            ניקוי כל הסינונים
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {groups.map((group, groupIndex) => {
            const watchedInGroup = group.items.filter((movie) =>
              watchedIds.has(movie.id),
            ).length;
            return (
              <div
                key={`${group.key}-${groupIndex}`}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/70"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-white/[0.02] px-4 py-2.5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    {group.label}
                  </h3>
                  <span className="font-slate text-[11px] text-[var(--muted)]">
                    {watchedInGroup}/{group.items.length}
                  </span>
                </div>
                <ul className="divide-y divide-[var(--border)]">
                  {group.items.map((movie, index) => {
                    const watched = watchedIds.has(movie.id);
                    const previous = group.items[index - 1];
                    const next = group.items[index + 1];
                    return (
                      <TimelineRow
                        key={movie.id}
                        movie={movie}
                        displayOrder={
                          displayOrderById.get(movie.id) ?? movie.timelineOrder
                        }
                        orderMode={orderMode}
                        status={statusOf(movie)}
                        railAbove={
                          filtersActive || !previous
                            ? null
                            : watched && watchedIds.has(previous.id)
                        }
                        railBelow={
                          filtersActive || !next
                            ? null
                            : watched && watchedIds.has(next.id)
                        }
                        onToggle={onToggle}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      <p aria-live="polite" className="mt-3 text-xs text-[var(--muted)]">
        {visibleMovies.length === movies.length
          ? `${movies.length} כותרים`
          : `${visibleMovies.length} תוצאות מתוך ${movies.length}`}
      </p>
    </section>
  );
}
