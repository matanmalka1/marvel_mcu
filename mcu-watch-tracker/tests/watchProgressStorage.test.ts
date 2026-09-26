import { describe, expect, it } from "vitest";

import {
  DEFAULT_PREFERENCES,
  parseStoredProgress,
  sanitizeWatched,
  serializeProgress,
  WATCH_PROGRESS_STORAGE_VERSION,
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

  it("round-trips progress and preferences", () => {
    const serialized = serializeProgress(["iron-man", "wandavision"], {
      orderMode: "release",
      includeSeries: true,
    });
    expect(parseStoredProgress(JSON.parse(serialized))).toEqual({
      watched: ["iron-man", "wandavision"],
      preferences: { orderMode: "release", includeSeries: true },
    });
  });

  it("migrates v1 payloads to a films-only chronological view", () => {
    expect(parseStoredProgress({ version: 1, watched: ["iron-man", "thor"] })).toEqual({
      watched: ["iron-man", "thor"],
      preferences: { orderMode: "timeline", includeSeries: false },
    });
  });

  it("falls back to default preferences for invalid preference values", () => {
    expect(
      parseStoredProgress({
        version: WATCH_PROGRESS_STORAGE_VERSION,
        watched: [],
        orderMode: "sideways",
        includeSeries: "yes",
      }),
    ).toEqual({ watched: [], preferences: DEFAULT_PREFERENCES });
  });
});
