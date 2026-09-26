import { describe, expect, it } from "vitest";

import {
  DEFAULT_PREFERENCES,
  parseStoredProgress,
  sanitizeWatched,
  serializeProgress,
  WATCH_PROGRESS_STORAGE_VERSION,
  type Snapshot,
} from "@/lib/watchProgressStorage";

describe("watch progress serialization", () => {
  it("keeps known ids and removes duplicates", () => {
    expect(sanitizeWatched(["iron-man", "unknown", "iron-man", 42])).toEqual([
      "iron-man",
    ]);
  });

  it("rejects a non-empty list where no id is recognized, but keeps a genuine empty list", () => {
    expect(sanitizeWatched(["not-a-real-movie", "also-fake"])).toBeNull();
    expect(sanitizeWatched([])).toEqual([]);
  });

  it("rejects malformed and incompatible payloads", () => {
    expect(parseStoredProgress(null)).toBeNull();
    expect(parseStoredProgress({ version: 999, watched: [] })).toBeNull();
    expect(
      parseStoredProgress({
        version: WATCH_PROGRESS_STORAGE_VERSION,
        watched: "iron-man",
      }),
    ).toBeNull();
  });

  it("round-trips progress, episodes, dates, journal and preferences", () => {
    const snapshot: Snapshot = {
      progress: {
        watched: ["iron-man", "wandavision"],
        episodes: { hawkeye: [1, 2] },
        watchedAt: { "iron-man": "2026-09-01T20:00:00.000Z" },
      },
      journal: { "iron-man": { rating: 5, note: "הכול התחיל כאן" } },
      preferences: { orderMode: "release", includeSeries: true },
    };
    expect(parseStoredProgress(JSON.parse(serializeProgress(snapshot)))).toEqual(
      snapshot,
    );
  });

  it("migrates v1 payloads to a films-only chronological view", () => {
    expect(parseStoredProgress({ version: 1, watched: ["iron-man", "thor"] })).toEqual({
      progress: { watched: ["iron-man", "thor"], episodes: {}, watchedAt: {} },
      journal: {},
      preferences: { orderMode: "timeline", includeSeries: false },
    });
  });

  it("keeps v2 preferences when upgrading", () => {
    expect(
      parseStoredProgress({
        version: 2,
        watched: ["thor"],
        orderMode: "release",
        includeSeries: true,
      })?.preferences,
    ).toEqual({ orderMode: "release", includeSeries: true });
  });

  it("drops invalid episodes, dates and journal entries", () => {
    const parsed = parseStoredProgress({
      version: WATCH_PROGRESS_STORAGE_VERSION,
      watched: ["loki-season-1"],
      episodes: {
        "loki-season-1": [1],
        hawkeye: [0, 2, 2, 99, "3"],
        "iron-man": [1],
        wandavision: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      watchedAt: { "loki-season-1": "not a date", thor: "2026-01-01T00:00:00Z" },
      journal: {
        thor: { rating: 9, note: "  " },
        "iron-man": { rating: 4 },
        fake: { rating: 3 },
      },
    });
    expect(parsed?.progress.episodes).toEqual({ hawkeye: [2] });
    expect(parsed?.progress.watchedAt).toEqual({});
    expect(parsed?.journal).toEqual({ "iron-man": { rating: 4 } });
  });

  it("falls back to default preferences for invalid preference values", () => {
    expect(
      parseStoredProgress({
        version: WATCH_PROGRESS_STORAGE_VERSION,
        watched: [],
        orderMode: "sideways",
        includeSeries: "yes",
      })?.preferences,
    ).toEqual(DEFAULT_PREFERENCES);
  });
});
