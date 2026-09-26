import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useWatchProgress } from "@/hooks/useWatchProgress";
import type { ViewPreferences } from "@/types/movie";
import {
  serializeProgress,
  WATCH_PROGRESS_STORAGE_KEY,
} from "@/lib/watchProgressStorage";

async function renderHydrated() {
  const rendered = renderHook(() => useWatchProgress());
  await waitFor(() => expect(rendered.result.current.hydrated).toBe(true));
  return rendered;
}

function saved(watched: string[], preferences?: ViewPreferences) {
  return serializeProgress({
    progress: { watched, episodes: {}, watchedAt: {} },
    preferences,
  });
}

function storedPayload() {
  return JSON.parse(window.localStorage.getItem(WATCH_PROGRESS_STORAGE_KEY) ?? "null");
}

describe("useWatchProgress", () => {
  beforeEach(() => window.localStorage.clear());

  it("hydrates stored progress and supports undo", async () => {
    window.localStorage.setItem(WATCH_PROGRESS_STORAGE_KEY, saved(["iron-man"]));
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

    window.localStorage.setItem(WATCH_PROGRESS_STORAGE_KEY, saved(["thor"]));
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
      JSON.stringify({ ...storedPayload(), orderMode: "release" }),
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

  it("tracks episodes, completes the season, and undoes episode by episode", async () => {
    const { result } = await renderHydrated();
    act(() => result.current.toggleEpisode("echo", 1));
    act(() => result.current.toggleEpisode("echo", 3));
    expect(result.current.progress.episodes.echo).toEqual([1, 3]);
    expect(result.current.watchedSet.has("echo")).toBe(false);

    [2, 4, 5].forEach((episode) =>
      act(() => result.current.toggleEpisode("echo", episode)),
    );
    expect(result.current.watchedSet.has("echo")).toBe(true);
    expect(result.current.progress.episodes.echo).toBeUndefined();
    expect(result.current.progress.watchedAt.echo).toEqual(expect.any(String));

    act(() => result.current.undo());
    expect(result.current.progress.episodes.echo).toEqual([1, 2, 3, 4]);
    expect(result.current.watchedSet.has("echo")).toBe(false);
  });

  it("marks the next episode when the next title is a series", async () => {
    const { result } = await renderHydrated();
    const index = result.current.titles.findIndex(
      (title) => title.id === "loki-season-1",
    );
    act(() =>
      result.current.titles
        .slice(0, index)
        .forEach((title) => result.current.toggleWatched(title.id)),
    );
    expect(result.current.stats.nextEpisode).toBe(1);
    act(() => result.current.completeNextMovie());
    expect(result.current.progress.episodes["loki-season-1"]).toEqual([1]);
    expect(result.current.stats.nextEpisode).toBe(2);
  });

  it("refuses to mark unreleased titles", async () => {
    const { result } = await renderHydrated();
    act(() => result.current.toggleWatched("avengers-secret-wars"));
    expect(result.current.watchedIds).toEqual([]);
  });

  it("stores ratings and notes outside undo history", async () => {
    const { result } = await renderHydrated();
    act(() => result.current.updateJournal("thor", { rating: 4 }));
    act(() => result.current.updateJournal("thor", { note: "Loki גנב את ההצגה" }));
    expect(result.current.journal.thor).toEqual({ rating: 4, note: "Loki גנב את ההצגה" });
    expect(result.current.canUndo).toBe(false);

    act(() => result.current.updateJournal("thor", { rating: undefined, note: "" }));
    expect(result.current.journal.thor).toBeUndefined();
  });
});
