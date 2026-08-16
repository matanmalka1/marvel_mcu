import { describe, expect, it } from "vitest";

import {
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

  it("round-trips a valid payload", () => {
    const serialized = serializeProgress(["iron-man", "thor"]);
    expect(parseStoredProgress(JSON.parse(serialized))).toEqual(["iron-man", "thor"]);
  });
});
