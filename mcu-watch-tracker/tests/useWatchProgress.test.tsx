import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useWatchProgress } from "@/hooks/useWatchProgress";
import {
  serializeProgress,
  WATCH_PROGRESS_STORAGE_KEY,
} from "@/lib/watchProgressStorage";

async function renderHydrated() {
  const rendered = renderHook(() => useWatchProgress());
  await waitFor(() => expect(rendered.result.current.hydrated).toBe(true));
  return rendered;
}

function storedPayload() {
  return JSON.parse(window.localStorage.getItem(WATCH_PROGRESS_STORAGE_KEY) ?? "null");
}

describe("useWatchProgress", () => {
  beforeEach(() => window.localStorage.clear());

  it("hydrates stored progress and supports undo", async () => {
    window.localStorage.setItem(
      WATCH_PROGRESS_STORAGE_KEY,
      serializeProgress(["iron-man"]),
    );
    const { result } = await renderHydrated();
    expect(result.current.watchedIds).toEqual(["iron-man"]);

    act(() => result.current.toggleWatched("thor"));
    expect(result.current.watchedSet.has("thor")).toBe(true);
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.watchedIds).toEqual(["iron-man"]);
  });

  it("clears stale undo history after another tab changes progress", async () => {
    const { result } = await renderHydrated();

    act(() => result.current.toggleWatched("iron-man"));
    expect(result.current.canUndo).toBe(true);

    window.localStorage.setItem(WATCH_PROGRESS_STORAGE_KEY, serializeProgress(["thor"]));
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", { key: WATCH_PROGRESS_STORAGE_KEY }),
      ),
    );

    expect(result.current.watchedIds).toEqual(["thor"]);
    expect(result.current.canUndo).toBe(false);
  });

  it("keeps undo history when another tab only changes preferences", async () => {
    const { result } = await renderHydrated();
    act(() => result.current.toggleWatched("iron-man"));

    window.localStorage.setItem(
      WATCH_PROGRESS_STORAGE_KEY,
      serializeProgress(["iron-man"], { orderMode: "release", includeSeries: true }),
    );
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", { key: WATCH_PROGRESS_STORAGE_KEY }),
      ),
    );

    expect(result.current.preferences.orderMode).toBe("release");
    expect(result.current.canUndo).toBe(true);
  });

  it("lets reset be undone", async () => {
    const { result } = await renderHydrated();

    act(() => result.current.toggleWatched("iron-man"));
    act(() => result.current.reset());
    expect(result.current.watchedIds).toEqual([]);
    act(() => result.current.undo());
    expect(result.current.watchedIds).toEqual(["iron-man"]);
  });

  it("picks the next title from the chosen order", async () => {
    const { result } = await renderHydrated();
    expect(result.current.stats.nextTitle?.id).toBe("captain-america-the-first-avenger");

    act(() => result.current.setOrderMode("release"));
    expect(result.current.stats.nextTitle?.id).toBe("iron-man");

    act(() => result.current.completeNextMovie());
    expect(result.current.watchedIds).toEqual(["iron-man"]);
    expect(result.current.stats.nextTitle?.id).toBe("the-incredible-hulk");
    expect(storedPayload()).toMatchObject({
      orderMode: "release",
      watched: ["iron-man"],
    });
  });

  it("excludes series from progress and next-up when they are turned off", async () => {
    const { result } = await renderHydrated();
    const withSeries = result.current.stats.total;
    const endgameIndex = result.current.titles.findIndex(
      (title) => title.id === "avengers-endgame",
    );
    act(() =>
      result.current.titles
        .slice(0, endgameIndex + 1)
        .forEach((title) => result.current.toggleWatched(title.id)),
    );
    expect(result.current.stats.nextTitle?.kind).toBe("series");

    act(() => result.current.setIncludeSeries(false));
    expect(result.current.stats.total).toBeLessThan(withSeries);
    expect(result.current.titles.every((title) => title.kind === "movie")).toBe(true);
    expect(result.current.stats.nextTitle?.id).toBe(
      "shang-chi-and-the-legend-of-the-ten-rings",
    );
    expect(storedPayload()).toMatchObject({ includeSeries: false });
  });

  it("keeps the films-only view for visitors upgrading from v1", async () => {
    window.localStorage.setItem(
      WATCH_PROGRESS_STORAGE_KEY,
      JSON.stringify({ version: 1, watched: ["iron-man"] }),
    );
    const { result } = await renderHydrated();
    expect(result.current.preferences.includeSeries).toBe(false);
    expect(result.current.watchedIds).toEqual(["iron-man"]);
  });
});
