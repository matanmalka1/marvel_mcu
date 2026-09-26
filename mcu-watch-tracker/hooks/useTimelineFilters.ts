"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Saga } from "@/types/movie";

export type WatchFilter = "all" | "watched" | "unwatched";
/** "series" also covers one-off Disney+ specials. */
export type KindFilter = "all" | "movie" | "series";

export type TimelineFilters = {
  query: string;
  phase: "all" | number;
  saga: "all" | Saga;
  status: WatchFilter;
  kind: KindFilter;
};

export const DEFAULT_FILTERS: TimelineFilters = {
  query: "",
  phase: "all",
  saga: "all",
  status: "all",
  kind: "all",
};

const PARAM = {
  query: "q",
  phase: "phase",
  saga: "saga",
  status: "status",
  kind: "type",
} as const;

function oneOf<T extends string>(value: string | null, options: readonly T[]): T | null {
  return options.includes(value as T) ? (value as T) : null;
}

/** Unknown or malformed params fall back to the defaults instead of failing. */
export function filtersFromSearch(search: string): TimelineFilters {
  const params = new URLSearchParams(search);
  const phase = Number(params.get(PARAM.phase));
  return {
    query: params.get(PARAM.query)?.slice(0, 80) ?? "",
    phase: Number.isInteger(phase) && phase > 0 ? phase : "all",
    saga: oneOf(params.get(PARAM.saga), ["infinity", "multiverse"] as const) ?? "all",
    status: oneOf(params.get(PARAM.status), ["watched", "unwatched"] as const) ?? "all",
    kind: oneOf(params.get(PARAM.kind), ["movie", "series"] as const) ?? "all",
  };
}

/** Writes only non-default values, and leaves unrelated params untouched. */
export function filtersToSearch(filters: TimelineFilters, currentSearch = ""): string {
  const params = new URLSearchParams(currentSearch);
  (Object.keys(PARAM) as Array<keyof TimelineFilters>).forEach((key) => {
    const value = key === "query" ? filters.query.trim() : filters[key];
    if (value === DEFAULT_FILTERS[key] || value === "") params.delete(PARAM[key]);
    else params.set(PARAM[key], String(value));
  });
  const search = params.toString();
  return search ? `?${search}` : "";
}

export function hasActiveFilters(filters: TimelineFilters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.phase !== "all" ||
    filters.saga !== "all" ||
    filters.status !== "all" ||
    filters.kind !== "all"
  );
}

/**
 * Timeline filters mirrored into the URL query string, so a filtered view can be
 * bookmarked or shared. Uses replaceState: filtering never adds history entries.
 */
export function useTimelineFilters() {
  const [filters, setFilters] = useState<TimelineFilters>(DEFAULT_FILTERS);
  // Latest filters for the updater, so the URL write stays out of the state updater.
  const filtersRef = useRef<TimelineFilters>(filters);

  useEffect(() => {
    const syncFromUrl = () => {
      const fromUrl = filtersFromSearch(window.location.search);
      filtersRef.current = fromUrl;
      setFilters(fromUrl);
    };
    // The URL only exists after mount; reading it in the initial state would make
    // the server and client renders disagree.
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const updateFilters = useCallback((patch: Partial<TimelineFilters>) => {
    const next = { ...filtersRef.current, ...patch };
    filtersRef.current = next;
    setFilters(next);

    const { pathname, search, hash } = window.location;
    const nextSearch = filtersToSearch(next, search);
    if (nextSearch !== search) {
      window.history.replaceState(window.history.state, "", pathname + nextSearch + hash);
    }
  }, []);

  const clearFilters = useCallback(() => updateFilters(DEFAULT_FILTERS), [updateFilters]);

  return { filters, updateFilters, clearFilters };
}
