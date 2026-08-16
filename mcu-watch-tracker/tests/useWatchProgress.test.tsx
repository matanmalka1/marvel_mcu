import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useWatchProgress } from "@/hooks/useWatchProgress";
import {
  serializeProgress,
  WATCH_PROGRESS_STORAGE_KEY,
} from "@/lib/watchProgressStorage";

describe("useWatchProgress", () => {
  beforeEach(() => window.localStorage.clear());

  it("hydrates stored progress and supports undo", async () => {
    window.localStorage.setItem(
      WATCH_PROGRESS_STORAGE_KEY,
      serializeProgress(["iron-man"]),
    );
    const { result } = renderHook(() => useWatchProgress());

    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.watchedIds).toEqual(["iron-man"]);

    act(() => result.current.toggleWatched("thor"));
    expect(result.current.watchedSet.has("thor")).toBe(true);
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.watchedIds).toEqual(["iron-man"]);
  });

  it("clears stale undo history after another tab changes progress", async () => {
    const { result } = renderHook(() => useWatchProgress());
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => result.current.toggleWatched("iron-man"));
    expect(result.current.canUndo).toBe(true);

    window.localStorage.setItem(
      WATCH_PROGRESS_STORAGE_KEY,
      serializeProgress(["thor"]),
    );
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", { key: WATCH_PROGRESS_STORAGE_KEY }),
      ),
    );

    expect(result.current.watchedIds).toEqual(["thor"]);
    expect(result.current.canUndo).toBe(false);
  });

  it("validates imports and lets reset be undone", async () => {
    const { result } = renderHook(() => useWatchProgress());
    await waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => result.current.toggleWatched("iron-man"));
    expect(result.current.importProgress({ version: 999, watched: [] })).toBe(
      false,
    );

    act(() => result.current.reset());
    expect(result.current.watchedIds).toEqual([]);
    act(() => result.current.undo());
    expect(result.current.watchedIds).toEqual(["iron-man"]);
  });
});
