"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  CATALOG_AS_OF,
  getMovieSummaryById,
  getOrderedTitles,
  isReleased,
  MOVIE_IDS,
  toIsoDate,
} from "@/data/movieCatalog";
import {
  EMPTY_PROGRESS,
  nextEpisodeOf,
  toggleEpisode as toggleEpisodeIn,
  toggleTitle,
  type ProgressState,
} from "@/lib/progressState";
import { computeProgress, type ProgressStats } from "@/lib/progressStats";
import {
  DEFAULT_PREFERENCES,
  MAX_NOTE_LENGTH,
  parseStoredProgress,
  serializeProgress,
  WATCH_PROGRESS_STORAGE_KEY,
  type Journal,
  type Snapshot,
} from "@/lib/watchProgressStorage";
import type {
  JournalEntry,
  MovieSummary,
  OrderMode,
  ViewPreferences,
} from "@/types/movie";

const MAX_HISTORY = 25;

function readStoredProgress(): Snapshot | null {
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

function sameProgress(a: ProgressState, b: ProgressState): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export type WatchProgress = {
  /** True once localStorage has been read — the first paint uses the default progress. */
  hydrated: boolean;
  /** Today's local date (YYYY-MM-DD); the catalog date until hydration. */
  today: string;
  progress: ProgressState;
  watchedIds: string[];
  watchedSet: ReadonlySet<string>;
  journal: Journal;
  preferences: ViewPreferences;
  /** Tracked titles in the chosen order, series filtered out when they are excluded. */
  titles: readonly MovieSummary[];
  stats: ProgressStats;
  canUndo: boolean;
  toggleWatched: (id: string) => void;
  toggleEpisode: (id: string, episode: number) => void;
  /** Marks the next title watched — or, for a series, its next episode. */
  completeNextMovie: () => void;
  updateJournal: (id: string, patch: JournalEntry) => void;
  undo: () => void;
  reset: () => void;
  setOrderMode: (mode: OrderMode) => void;
  setIncludeSeries: (include: boolean) => void;
};

export function useWatchProgress(): WatchProgress {
  const [progress, setProgress] = useState<ProgressState>(EMPTY_PROGRESS);
  const [journal, setJournal] = useState<Journal>({});
  const [preferences, setPreferences] = useState<ViewPreferences>(DEFAULT_PREFERENCES);
  const [today, setToday] = useState(CATALOG_AS_OF);
  const [hydrated, setHydrated] = useState(false);

  // Mirrors state so actions can read the latest value without stale closures,
  // and so history is pushed exactly once per action (state updaters stay pure).
  const progressRef = useRef<ProgressState>(progress);
  const preferencesRef = useRef<ViewPreferences>(preferences);
  const todayRef = useRef(today);
  const historyRef = useRef<ProgressState[]>([]);
  const [historyDepth, setHistoryDepth] = useState(0);

  useEffect(() => {
    const stored = readStoredProgress();
    const localToday = toIsoDate(new Date());
    todayRef.current = localToday;
    // One-time hydration from localStorage and the clock (external systems) on
    // mount, not state derived from props/state — the pattern this rule guards
    // against doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(localToday);
    if (stored) {
      progressRef.current = stored.progress;
      preferencesRef.current = stored.preferences;
      setProgress(stored.progress);
      setJournal(stored.journal);
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
      const nextProgress = stored?.progress ?? EMPTY_PROGRESS;
      const nextPreferences = stored?.preferences ?? DEFAULT_PREFERENCES;

      preferencesRef.current = nextPreferences;
      setPreferences(nextPreferences);
      setJournal(stored?.journal ?? {});

      // A preference- or journal-only change leaves progress (and its undo history) alone.
      if (sameProgress(nextProgress, progressRef.current)) return;

      // Remote progress changes establish a new source of truth. Keeping local
      // undo entries here could restore stale progress and overwrite the other tab.
      historyRef.current = [];
      setHistoryDepth(0);
      progressRef.current = nextProgress;
      setProgress(nextProgress);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        WATCH_PROGRESS_STORAGE_KEY,
        serializeProgress({ progress, journal, preferences }),
      );
    } catch {
      // Storage full or blocked — progress simply stays in memory for this session.
    }
  }, [progress, journal, preferences, hydrated]);

  const commit = useCallback((compute: (previous: ProgressState) => ProgressState) => {
    const previous = progressRef.current;
    const next = compute(previous);
    if (next === previous) return;

    historyRef.current = [...historyRef.current, previous].slice(-MAX_HISTORY);
    setHistoryDepth(historyRef.current.length);

    progressRef.current = next;
    setProgress(next);
  }, []);

  /** Only known, already released titles can be marked. */
  const isMarkable = useCallback((id: string) => {
    const movie = getMovieSummaryById(id);
    return MOVIE_IDS.has(id) && !!movie && isReleased(movie, todayRef.current);
  }, []);

  const toggleWatched = useCallback(
    (id: string) => {
      if (!isMarkable(id)) return;
      commit((previous) => toggleTitle(previous, id, new Date().toISOString()));
    },
    [commit, isMarkable],
  );

  const toggleEpisode = useCallback(
    (id: string, episode: number) => {
      if (!isMarkable(id)) return;
      commit((previous) =>
        toggleEpisodeIn(previous, id, episode, new Date().toISOString()),
      );
    },
    [commit, isMarkable],
  );

  const watchedSet = useMemo(() => new Set(progress.watched), [progress.watched]);
  const titles = getOrderedTitles(preferences.orderMode, preferences.includeSeries);
  const stats = useMemo(
    () => computeProgress(titles, progress, today),
    [titles, progress, today],
  );

  const completeNextMovie = useCallback(() => {
    commit((previous) => {
      const { orderMode, includeSeries } = preferencesRef.current;
      const currentSet = new Set(previous.watched);
      const next = getOrderedTitles(orderMode, includeSeries).find(
        (title) => isReleased(title, todayRef.current) && !currentSet.has(title.id),
      );
      if (!next) return previous;
      const now = new Date().toISOString();
      const episode = nextEpisodeOf(previous, next.id);
      return episode === null
        ? toggleTitle(previous, next.id, now)
        : toggleEpisodeIn(previous, next.id, episode, now);
    });
  }, [commit]);

  const updateJournal = useCallback((id: string, patch: JournalEntry) => {
    if (!MOVIE_IDS.has(id)) return;
    setJournal((current) => {
      const merged: JournalEntry = { ...current[id], ...patch };
      const entry: JournalEntry = {};
      if (merged.rating)
        entry.rating = Math.min(5, Math.max(1, Math.round(merged.rating)));
      if (merged.note?.trim()) entry.note = merged.note.slice(0, MAX_NOTE_LENGTH);
      const next = { ...current };
      if (entry.rating === undefined && entry.note === undefined) delete next[id];
      else next[id] = entry;
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    const previous = historyRef.current[historyRef.current.length - 1];
    if (!previous) return;

    historyRef.current = historyRef.current.slice(0, -1);
    setHistoryDepth(historyRef.current.length);

    progressRef.current = previous;
    setProgress(previous);
  }, []);

  const reset = useCallback(() => {
    commit(() => EMPTY_PROGRESS);
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
    today,
    progress,
    watchedIds: progress.watched,
    watchedSet,
    journal,
    preferences,
    titles,
    stats,
    canUndo: historyDepth > 0,
    toggleWatched,
    toggleEpisode,
    completeNextMovie,
    updateJournal,
    undo,
    reset,
    setOrderMode,
    setIncludeSeries,
  };
}
