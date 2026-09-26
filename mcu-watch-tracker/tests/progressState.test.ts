import { describe, expect, it } from "vitest";

import {
  EMPTY_PROGRESS,
  nextEpisodeOf,
  toggleEpisode,
  toggleTitle,
} from "@/lib/progressState";

const NOW = "2026-09-26T18:00:00.000Z";

describe("progress state transitions", () => {
  it("records when a title was completed and clears it on untick", () => {
    const watched = toggleTitle(EMPTY_PROGRESS, "thor", NOW);
    expect(watched.watchedAt.thor).toBe(NOW);
    const cleared = toggleTitle(watched, "thor", NOW);
    expect(cleared).toEqual(EMPTY_PROGRESS);
  });

  it("reopens a completed season when one episode is unticked", () => {
    const complete = toggleTitle(EMPTY_PROGRESS, "hawkeye", NOW);
    const reopened = toggleEpisode(complete, "hawkeye", 6, NOW);
    expect(reopened.watched).toEqual([]);
    expect(reopened.episodes.hawkeye).toEqual([1, 2, 3, 4, 5]);
    expect(nextEpisodeOf(reopened, "hawkeye")).toBe(6);
  });

  it("ignores out-of-range episodes and films", () => {
    expect(toggleEpisode(EMPTY_PROGRESS, "hawkeye", 7, NOW)).toBe(EMPTY_PROGRESS);
    expect(toggleEpisode(EMPTY_PROGRESS, "iron-man", 1, NOW)).toBe(EMPTY_PROGRESS);
    expect(nextEpisodeOf(EMPTY_PROGRESS, "iron-man")).toBeNull();
  });

  it("drops the episode list when the last watched episode is unticked", () => {
    const one = toggleEpisode(EMPTY_PROGRESS, "echo", 2, NOW);
    expect(toggleEpisode(one, "echo", 2, NOW).episodes).toEqual({});
  });
});
