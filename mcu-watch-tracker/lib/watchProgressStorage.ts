import { MOVIE_IDS } from "@/data/movieCatalog";
import type { OrderMode, ViewPreferences } from "@/types/movie";

/** Key name predates versioned payloads; the version lives inside the value. */
export const WATCH_PROGRESS_STORAGE_KEY = "mcu-watch-progress-v1";
export const WATCH_PROGRESS_STORAGE_VERSION = 2;

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

export type StoredProgress = {
  version: number;
  watched: string[];
  orderMode?: OrderMode;
  includeSeries?: boolean;
};

export type ParsedProgress = {
  watched: string[];
  preferences: ViewPreferences;
};

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

export function parseStoredProgress(value: unknown): ParsedProgress | null {
  if (typeof value !== "object" || value === null) return null;
  const stored = value as Partial<StoredProgress>;

  if (stored.version === 1) {
    const watched = sanitizeWatched(stored.watched);
    return watched ? { watched, preferences: { ...LEGACY_V1_PREFERENCES } } : null;
  }
  if (stored.version !== WATCH_PROGRESS_STORAGE_VERSION) return null;

  const watched = sanitizeWatched(stored.watched);
  return watched ? { watched, preferences: parsePreferences(stored) } : null;
}

export function serializeProgress(
  watched: readonly string[],
  preferences: ViewPreferences = DEFAULT_PREFERENCES,
): string {
  return JSON.stringify(
    {
      version: WATCH_PROGRESS_STORAGE_VERSION,
      watched: [...watched],
      orderMode: preferences.orderMode,
      includeSeries: preferences.includeSeries,
    } satisfies StoredProgress,
    null,
    2,
  );
}
