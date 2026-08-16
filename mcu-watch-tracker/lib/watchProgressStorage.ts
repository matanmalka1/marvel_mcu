import { MOVIE_IDS } from "@/data/movieCatalog";

export const WATCH_PROGRESS_STORAGE_KEY = "mcu-watch-progress-v1";
export const WATCH_PROGRESS_STORAGE_VERSION = 1;

export type StoredProgress = {
  version: number;
  watched: string[];
};

/** Keeps only known ids, drops duplicates, and rejects non-array values. */
export function sanitizeWatched(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const cleaned = value.filter(
    (id): id is string => typeof id === "string" && MOVIE_IDS.has(id),
  );
  return Array.from(new Set(cleaned));
}

export function parseStoredProgress(value: unknown): string[] | null {
  if (typeof value !== "object" || value === null) return null;
  const stored = value as Partial<StoredProgress>;
  if (stored.version !== WATCH_PROGRESS_STORAGE_VERSION) return null;
  return sanitizeWatched(stored.watched);
}

export function serializeProgress(watched: readonly string[]): string {
  return JSON.stringify(
    {
      version: WATCH_PROGRESS_STORAGE_VERSION,
      watched: [...watched],
    } satisfies StoredProgress,
    null,
    2,
  );
}
