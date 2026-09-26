import { getMovieSummaryById, MOVIE_IDS } from "@/data/movieCatalog";
import { EMPTY_PROGRESS, type ProgressState } from "@/lib/progressState";
import type { JournalEntry, OrderMode, ViewPreferences } from "@/types/movie";

/** Key name predates versioned payloads; the version lives inside the value. */
export const WATCH_PROGRESS_STORAGE_KEY = "mcu-watch-progress-v1";
export const WATCH_PROGRESS_STORAGE_VERSION = 3;

export const MAX_NOTE_LENGTH = 500;

/** New visitors track everything, including Disney+ series. */
export const DEFAULT_PREFERENCES: ViewPreferences = {
  orderMode: "timeline",
  includeSeries: true,
};

/**
 * v1 only knew about films. Visitors who saved progress then keep a films-only
 * view after the upgrade, so their totals and "next up" don't change under them.
 */
const LEGACY_V1_PREFERENCES: ViewPreferences = {
  orderMode: "timeline",
  includeSeries: false,
};

export type Journal = Record<string, JournalEntry>;

export type StoredProgress = {
  version: number;
  watched: string[];
  episodes?: Record<string, number[]>;
  watchedAt?: Record<string, string>;
  journal?: Journal;
  orderMode?: OrderMode;
  includeSeries?: boolean;
};

export type Snapshot = {
  progress: ProgressState;
  journal: Journal;
  preferences: ViewPreferences;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Keeps only known ids, drops duplicates, and rejects non-array values.
 * A non-empty input where every id is unrecognized (wrong app's export,
 * corrupted file) is treated as invalid rather than silently importing
 * as "nothing watched".
 */
export function sanitizeWatched(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const cleaned = value.filter(
    (id): id is string => typeof id === "string" && MOVIE_IDS.has(id),
  );
  if (cleaned.length === 0 && value.length > 0) return null;
  return Array.from(new Set(cleaned));
}

/** Partial episode lists for known series only, within range, never for completed titles. */
function sanitizeEpisodes(value: unknown, watched: ReadonlySet<string>) {
  const episodes: Record<string, number[]> = {};
  if (!isRecord(value)) return episodes;
  for (const [id, list] of Object.entries(value)) {
    const total = getMovieSummaryById(id)?.episodes;
    if (!total || watched.has(id) || !Array.isArray(list)) continue;
    const cleaned = Array.from(
      new Set(
        list.filter(
          (episode): episode is number =>
            Number.isInteger(episode) && episode >= 1 && episode <= total,
        ),
      ),
    ).sort((a, b) => a - b);
    if (cleaned.length > 0 && cleaned.length < total) episodes[id] = cleaned;
  }
  return episodes;
}

function sanitizeWatchedAt(value: unknown, watched: ReadonlySet<string>) {
  const watchedAt: Record<string, string> = {};
  if (!isRecord(value)) return watchedAt;
  for (const [id, stamp] of Object.entries(value)) {
    if (
      watched.has(id) &&
      typeof stamp === "string" &&
      !Number.isNaN(Date.parse(stamp))
    ) {
      watchedAt[id] = stamp;
    }
  }
  return watchedAt;
}

function sanitizeJournal(value: unknown): Journal {
  const journal: Journal = {};
  if (!isRecord(value)) return journal;
  for (const [id, raw] of Object.entries(value)) {
    if (!MOVIE_IDS.has(id) || !isRecord(raw)) continue;
    const entry: JournalEntry = {};
    if (
      Number.isInteger(raw.rating) &&
      Number(raw.rating) >= 1 &&
      Number(raw.rating) <= 5
    ) {
      entry.rating = Number(raw.rating);
    }
    if (typeof raw.note === "string" && raw.note.trim()) {
      entry.note = raw.note.slice(0, MAX_NOTE_LENGTH);
    }
    if (entry.rating !== undefined || entry.note !== undefined) journal[id] = entry;
  }
  return journal;
}

function parsePreferences(stored: Partial<StoredProgress>): ViewPreferences {
  return {
    orderMode:
      stored.orderMode === "timeline" || stored.orderMode === "release"
        ? stored.orderMode
        : DEFAULT_PREFERENCES.orderMode,
    includeSeries:
      typeof stored.includeSeries === "boolean"
        ? stored.includeSeries
        : DEFAULT_PREFERENCES.includeSeries,
  };
}

/** Reads v1–v3 payloads. Older versions simply have no episodes, dates or journal. */
export function parseStoredProgress(value: unknown): Snapshot | null {
  if (!isRecord(value)) return null;
  const stored = value as Partial<StoredProgress>;
  if (
    typeof stored.version !== "number" ||
    stored.version < 1 ||
    stored.version > WATCH_PROGRESS_STORAGE_VERSION
  ) {
    return null;
  }

  const watched = sanitizeWatched(stored.watched);
  if (!watched) return null;
  const watchedSet = new Set(watched);

  return {
    progress: {
      watched,
      episodes: sanitizeEpisodes(stored.episodes, watchedSet),
      watchedAt: sanitizeWatchedAt(stored.watchedAt, watchedSet),
    },
    journal: sanitizeJournal(stored.journal),
    preferences:
      stored.version === 1 ? { ...LEGACY_V1_PREFERENCES } : parsePreferences(stored),
  };
}

export function serializeProgress({
  progress = EMPTY_PROGRESS,
  journal = {},
  preferences = DEFAULT_PREFERENCES,
}: Partial<Snapshot> = {}): string {
  return JSON.stringify({
    version: WATCH_PROGRESS_STORAGE_VERSION,
    watched: [...progress.watched],
    episodes: progress.episodes,
    watchedAt: progress.watchedAt,
    journal,
    orderMode: preferences.orderMode,
    includeSeries: preferences.includeSeries,
  } satisfies StoredProgress);
}
