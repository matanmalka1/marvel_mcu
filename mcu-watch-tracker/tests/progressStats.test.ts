import { describe, expect, it } from "vitest";

import { getOrderedTitles } from "@/data/movieCatalog";
import { computeProgress } from "@/lib/progressStats";

describe("computeProgress", () => {
  const titles = getOrderedTitles("timeline", true);

  it("counts totals, kinds and phases", () => {
    const stats = computeProgress(titles, new Set(["iron-man", "wandavision"]));
    expect(stats.watched).toBe(2);
    expect(stats.byKind.movie.watched).toBe(1);
    expect(stats.byKind.series.watched).toBe(1);
    expect(stats.byPhase.reduce((sum, phase) => sum + phase.total, 0)).toBe(
      titles.length,
    );
    expect(stats.byPhase.find((phase) => phase.phase === 4)?.watched).toBe(1);
  });

  it("returns the next unwatched title and a short queue after it", () => {
    const stats = computeProgress(titles, new Set([titles[0].id, titles[2].id]));
    expect(stats.nextTitle?.id).toBe(titles[1].id);
    expect(stats.queue.map((title) => title.id)).toEqual([
      titles[3].id,
      titles[4].id,
      titles[5].id,
    ]);
  });

  it("measures the Endgame milestone within the active order", () => {
    const stats = computeProgress(titles, new Set());
    expect(stats.endgame.total).toBe(
      titles.findIndex((title) => title.id === "avengers-endgame") + 1,
    );
    expect(
      computeProgress(titles, new Set(titles.map((t) => t.id))).nextTitle,
    ).toBeNull();
  });
});
