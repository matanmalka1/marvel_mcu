"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  DEFAULT_WATCHED_IDS,
  ENDGAME_ID,
  MOVIES_IN_TIMELINE_ORDER,
  MOVIE_IDS,
} from "@/data/movieCatalog";
import type { MovieSummary } from "@/types/movie";

/** Versioned: bumping the suffix invalidates older, incompatible payloads. */
const STORAGE_KEY = "mcu-watch-progress-v1";
const STORAGE_VERSION = 1;
const MAX_HISTORY = 25;

type StoredProgress = {
  version: number;
  watched: string[];
};

const ENDGAME_ORDER =
  MOVIES_IN_TIMELINE_ORDER.find((movie) => movie.id === ENDGAME_ID)
    ?.timelineOrder ?? MOVIES_IN_TIMELINE_ORDER.length;

/** Keeps only known ids, drops duplicates. Returns null when the payload is unusable. */
function sanitizeWatched(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const cleaned = value.filter(
    (id): id is string => typeof id === "string" && MOVIE_IDS.has(id),
  );
  return Array.from(new Set(cleaned));
}

function parseStoredProgress(value: unknown): string[] | null {
  if (typeof value !== "object" || value === null) return null;
  const stored = value as Partial<StoredProgress>;
  if (stored.version !== STORAGE_VERSION) return null;
  return sanitizeWatched(stored.watched);
}

function readStoredProgress(): string[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return parseStoredProgress(parsed);
  } catch {
    // Corrupt or unavailable storage: fall back to the known progress.
    return null;
  }
}

export type WatchProgress = {
  /** True once localStorage has been read — the first paint uses the default progress. */
  hydrated: boolean;
  watchedIds: string[];
  watchedSet: ReadonlySet<string>;
  nextMovie: MovieSummary | null;
  totalMovies: number;
  watchedCount: number;
  remainingCount: number;
  percentWatched: number;
  endgameWatched: number;
  endgameTotal: number;
  endgamePercent: number;
  canUndo: boolean;
  toggleWatched: (id: string) => void;
  completeNextMovie: () => void;
  undo: () => void;
  reset: () => void;
  exportProgress: () => string;
  importProgress: (value: unknown) => boolean;
};

export function useWatchProgress(): WatchProgress {
  const [watchedIds, setWatchedIds] = useState<string[]>(() => [
    ...DEFAULT_WATCHED_IDS,
  ]);
  const [hydrated, setHydrated] = useState(false);

  // Mirrors state so actions can read the latest value without stale closures,
  // and so history is pushed exactly once per action (state updaters stay pure).
  const watchedRef = useRef<string[]>(watchedIds);
  const historyRef = useRef<string[][]>([]);
  const [historyDepth, setHistoryDepth] = useState(0);

  useEffect(() => {
    const stored = readStoredProgress();
    if (stored) {
      watchedRef.current = stored;
      setWatchedIds(stored);
    }
    setHydrated(true);
  }, []);

  // Keeps tabs in sync: fires in other tabs whenever this key changes in localStorage.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const stored = readStoredProgress();
      const next = stored ?? [...DEFAULT_WATCHED_IDS];

      // Remote changes establish a new source of truth. Keeping local undo
      // entries here could restore stale progress and overwrite the other tab.
      historyRef.current = [];
      setHistoryDepth(0);
      watchedRef.current = next;
      setWatchedIds(next);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: StoredProgress = {
        version: STORAGE_VERSION,
        watched: watchedIds,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage full or blocked — progress simply stays in memory for this session.
    }
  }, [watchedIds, hydrated]);

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

  const nextMovie = useMemo(
    () =>
      MOVIES_IN_TIMELINE_ORDER.find((movie) => !watchedSet.has(movie.id)) ??
      null,
    [watchedSet],
  );

  const completeNextMovie = useCallback(() => {
    commit((previous) => {
      const currentSet = new Set(previous);
      const next = MOVIES_IN_TIMELINE_ORDER.find(
        (movie) => !currentSet.has(movie.id),
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

  const exportProgress = useCallback(
    () =>
      JSON.stringify(
        { version: STORAGE_VERSION, watched: watchedRef.current },
        null,
        2,
      ),
    [],
  );

  const importProgress = useCallback(
    (value: unknown) => {
      const imported = parseStoredProgress(value);
      if (!imported) return false;
      commit(() => imported);
      return true;
    },
    [commit],
  );

  const totalMovies = MOVIES_IN_TIMELINE_ORDER.length;
  const watchedCount = watchedSet.size;
  const endgameWatched = useMemo(
    () =>
      MOVIES_IN_TIMELINE_ORDER.filter(
        (movie) =>
          movie.timelineOrder <= ENDGAME_ORDER && watchedSet.has(movie.id),
      ).length,
    [watchedSet],
  );

  return {
    hydrated,
    watchedIds,
    watchedSet,
    nextMovie,
    totalMovies,
    watchedCount,
    remainingCount: totalMovies - watchedCount,
    percentWatched: totalMovies
      ? Math.round((watchedCount / totalMovies) * 100)
      : 0,
    endgameWatched,
    endgameTotal: ENDGAME_ORDER,
    endgamePercent: ENDGAME_ORDER
      ? Math.round((endgameWatched / ENDGAME_ORDER) * 100)
      : 0,
    canUndo: historyDepth > 0,
    toggleWatched,
    completeNextMovie,
    undo,
    reset,
    exportProgress,
    importProgress,
  };
}
