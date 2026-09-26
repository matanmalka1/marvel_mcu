import { describe, expect, it } from "vitest";

import { getOrderedTitles } from "@/data/movieCatalog";
import { EMPTY_PROGRESS, type ProgressState } from "@/lib/progressState";
import { computeProgress } from "@/lib/progressStats";

const TODAY = "2026-09-26";

function state(
  watched: string[],
  episodes: ProgressState["episodes"] = {},
): ProgressState {
  return { ...EMPTY_PROGRESS, watched, episodes };
}

describe("computeProgress", () => {
  const titles = getOrderedTitles("timeline", true);

  it("counts totals, kinds and phases", () => {
    const stats = computeProgress(titles, state(["iron-man", "wandavision"]), TODAY);
    expect(stats.watched).toBe(2);
    expect(stats.byKind.movie.watched).toBe(1);
    expect(stats.byKind.series.watched).toBe(1);
    expect(stats.byPhase.reduce((sum, phase) => sum + phase.total, 0)).toBe(stats.total);
    expect(stats.byPhase.find((phase) => phase.phase === 4)?.watched).toBe(1);
  });

  it("returns the next unwatched title and a short queue after it", () => {
    const stats = computeProgress(titles, state([titles[0].id, titles[2].id]), TODAY);
    expect(stats.nextTitle?.id).toBe(titles[1].id);
    expect(stats.queue.map((title) => title.id)).toEqual([
      titles[3].id,
      titles[4].id,
      titles[5].id,
    ]);
  });

  it("measures the Endgame milestone within the active order", () => {
    const stats = computeProgress(titles, state([]), TODAY);
    expect(stats.endgame.total).toBe(
      titles.findIndex((title) => title.id === "avengers-endgame") + 1,
    );
    expect(
      computeProgress(titles, state(titles.map((t) => t.id)), TODAY).nextTitle,
    ).toBeNull();
  });

  it("leaves unreleased titles out of totals and next-up", () => {
    const released = titles.filter((title) => title.releaseDate <= TODAY);
    const stats = computeProgress(titles, state(released.map((t) => t.id)), TODAY);
    expect(stats.total).toBe(released.length);
    expect(stats.nextTitle).toBeNull();
    expect(stats.unreleased.map((title) => title.id)).toEqual([
      "avengers-doomsday",
      "avengers-secret-wars",
    ]);
  });

  it("counts partial seasons in watch time and points at the next episode", () => {
    const beforeLoki = titles.slice(
      0,
      titles.findIndex((t) => t.id === "loki-season-1"),
    );
    const stats = computeProgress(
      titles,
      state(
        beforeLoki.map((t) => t.id),
        { "loki-season-1": [1, 2, 3] },
      ),
      TODAY,
    );
    expect(stats.nextTitle?.id).toBe("loki-season-1");
    expect(stats.nextEpisode).toBe(4);
    expect(stats.inProgress).toBe(1);
    const moviesMinutes = beforeLoki.reduce((sum, t) => sum + (t.runtimeMinutes ?? 0), 0);
    expect(stats.watchedMinutes).toBe(moviesMinutes + 150);
  });
});
