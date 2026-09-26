"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_WATCHED_IDS, getOrderedTitles, MOVIE_IDS } from "@/data/movieCatalog";
import { computeProgress, type ProgressStats } from "@/lib/progressStats";
import {
  DEFAULT_PREFERENCES,
  parseStoredProgress,
  serializeProgress,
  WATCH_PROGRESS_STORAGE_KEY,
  type ParsedProgress,
} from "@/lib/watchProgressStorage";
import type { MovieSummary, OrderMode, ViewPreferences } from "@/types/movie";

const MAX_HISTORY = 25;

function readStoredProgress(): ParsedProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(WATCH_PROGRESS_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return parseStoredProgress(parsed);
  } catch {
    // Corrupt or unavailable storage: fall back to the known progress.
    return null;
  }
}

function sameIds(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

export type WatchProgress = {
  /** True once localStorage has been read — the first paint uses the default progress. */
  hydrated: boolean;
  watchedIds: string[];
  watchedSet: ReadonlySet<string>;
  preferences: ViewPreferences;
  /** Tracked titles in the chosen order, series filtered out when they are excluded. */
  titles: readonly MovieSummary[];
  stats: ProgressStats;
  canUndo: boolean;
  toggleWatched: (id: string) => void;
  completeNextMovie: () => void;
  undo: () => void;
  reset: () => void;
  setOrderMode: (mode: OrderMode) => void;
  setIncludeSeries: (include: boolean) => void;
};

export function useWatchProgress(): WatchProgress {
  const [watchedIds, setWatchedIds] = useState<string[]>(() => [...DEFAULT_WATCHED_IDS]);
  const [preferences, setPreferences] = useState<ViewPreferences>(DEFAULT_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);

  // Mirrors state so actions can read the latest value without stale closures,
  // and so history is pushed exactly once per action (state updaters stay pure).
  const watchedRef = useRef<string[]>(watchedIds);
  const preferencesRef = useRef<ViewPreferences>(preferences);
  const historyRef = useRef<string[][]>([]);
  const [historyDepth, setHistoryDepth] = useState(0);

  useEffect(() => {
    const stored = readStoredProgress();
    if (stored) {
      watchedRef.current = stored.watched;
      preferencesRef.current = stored.preferences;
      // One-time hydration from localStorage (an external system) on mount,
      // not state derived from props/state — the pattern this rule guards
      // against doesn't apply here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWatchedIds(stored.watched);
      setPreferences(stored.preferences);
    }
    setHydrated(true);
  }, []);

  // Keeps tabs in sync: fires in other tabs whenever this key changes in localStorage.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      // event.key is null when the tab called localStorage.clear() rather
      // than removing this key specifically — treat that as a remote change too.
      if (event.key !== null && event.key !== WATCH_PROGRESS_STORAGE_KEY) return;
      const stored = readStoredProgress();
      const nextWatched = stored?.watched ?? [...DEFAULT_WATCHED_IDS];
      const nextPreferences = stored?.preferences ?? DEFAULT_PREFERENCES;

      preferencesRef.current = nextPreferences;
      setPreferences(nextPreferences);

      // A preference-only change leaves progress (and its undo history) alone.
      if (sameIds(nextWatched, watchedRef.current)) return;

      // Remote progress changes establish a new source of truth. Keeping local
      // undo entries here could restore stale progress and overwrite the other tab.
      historyRef.current = [];
      setHistoryDepth(0);
      watchedRef.current = nextWatched;
      setWatchedIds(nextWatched);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        WATCH_PROGRESS_STORAGE_KEY,
        serializeProgress(watchedIds, preferences),
      );
    } catch {
      // Storage full or blocked — progress simply stays in memory for this session.
    }
  }, [watchedIds, preferences, hydrated]);

  const commit = useCallback((compute: (previous: string[]) => string[]) => {
    const previous = watchedRef.current;
    const next = compute(previous);
    if (next === previous) return;

    historyRef.current = [...historyRef.current, previous].slice(-MAX_HISTORY);
    setHistoryDepth(historyRef.current.length);

    watchedRef.current = next;
    setWatchedIds(next);
  }, []);

  const toggleWatched = useCallback(
    (id: string) => {
      if (!MOVIE_IDS.has(id)) return;
      commit((previous) =>
        previous.includes(id)
          ? previous.filter((watchedId) => watchedId !== id)
          : [...previous, id],
      );
    },
    [commit],
  );

  const watchedSet = useMemo(() => new Set(watchedIds), [watchedIds]);
  const titles = getOrderedTitles(preferences.orderMode, preferences.includeSeries);
  const stats = useMemo(() => computeProgress(titles, watchedSet), [titles, watchedSet]);

  const completeNextMovie = useCallback(() => {
    commit((previous) => {
      const { orderMode, includeSeries } = preferencesRef.current;
      const currentSet = new Set(previous);
      const next = getOrderedTitles(orderMode, includeSeries).find(
        (title) => !currentSet.has(title.id),
      );
      return next ? [...previous, next.id] : previous;
    });
  }, [commit]);

  const undo = useCallback(() => {
    const previous = historyRef.current[historyRef.current.length - 1];
    if (!previous) return;

    historyRef.current = historyRef.current.slice(0, -1);
    setHistoryDepth(historyRef.current.length);

    watchedRef.current = previous;
    setWatchedIds(previous);
  }, []);

  const reset = useCallback(() => {
    commit(() => [...DEFAULT_WATCHED_IDS]);
  }, [commit]);

  const updatePreferences = useCallback((patch: Partial<ViewPreferences>) => {
    const next = { ...preferencesRef.current, ...patch };
    preferencesRef.current = next;
    setPreferences(next);
  }, []);

  const setOrderMode = useCallback(
    (orderMode: OrderMode) => updatePreferences({ orderMode }),
    [updatePreferences],
  );
  const setIncludeSeries = useCallback(
    (includeSeries: boolean) => updatePreferences({ includeSeries }),
    [updatePreferences],
  );

  return {
    hydrated,
    watchedIds,
    watchedSet,
    preferences,
    titles,
    stats,
    canUndo: historyDepth > 0,
    toggleWatched,
    completeNextMovie,
    undo,
    reset,
    setOrderMode,
    setIncludeSeries,
  };
}
