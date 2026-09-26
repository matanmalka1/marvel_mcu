import { describe, expect, it } from "vitest";

import {
  DEFAULT_FILTERS,
  filtersFromSearch,
  filtersToSearch,
  hasActiveFilters,
} from "@/hooks/useTimelineFilters";

describe("timeline filters in the URL", () => {
  it("round-trips non-default filters", () => {
    const filters = {
      query: "loki",
      phase: 4,
      saga: "multiverse",
      status: "unwatched",
      kind: "series",
    } as const;
    const search = filtersToSearch(filters);
    expect(search).toBe("?q=loki&phase=4&saga=multiverse&status=unwatched&type=series");
    expect(filtersFromSearch(search)).toEqual(filters);
  });

  it("omits defaults and keeps unrelated params", () => {
    expect(filtersToSearch(DEFAULT_FILTERS)).toBe("");
    expect(filtersToSearch({ ...DEFAULT_FILTERS, phase: 2 }, "?ref=share&q=old")).toBe(
      "?ref=share&phase=2",
    );
  });

  it("ignores malformed values", () => {
    expect(filtersFromSearch("?phase=-1&saga=dark&status=maybe&type=book")).toEqual(
      DEFAULT_FILTERS,
    );
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, query: "  " })).toBe(false);
  });
});
