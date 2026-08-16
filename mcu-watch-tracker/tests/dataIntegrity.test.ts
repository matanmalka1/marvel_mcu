import { describe, expect, it } from "vitest";

import { CONNECTIONS } from "@/data/connections";
import {
  MOVIE_CATALOG,
  MOVIES_IN_RELEASE_ORDER,
  MOVIES_IN_TIMELINE_ORDER,
} from "@/data/movieCatalog";
import { MOVIE_DETAILS } from "@/data/movieDetails";

describe("movie data integrity", () => {
  const ids = MOVIE_CATALOG.map((movie) => movie.id);

  it("has unique ids and contiguous timeline positions", () => {
    expect(new Set(ids).size).toBe(ids.length);
    expect(MOVIES_IN_TIMELINE_ORDER.map((movie) => movie.timelineOrder)).toEqual(
      Array.from({ length: ids.length }, (_, index) => index + 1),
    );
  });

  it("contains every movie exactly once in release order", () => {
    const releaseIds = MOVIES_IN_RELEASE_ORDER.map((movie) => movie.id);
    expect(releaseIds).toHaveLength(ids.length);
    expect(new Set(releaseIds)).toEqual(new Set(ids));
  });

  it("has one detail record for every catalog movie", () => {
    expect(new Set(Object.keys(MOVIE_DETAILS))).toEqual(new Set(ids));
  });

  it("keeps review scores and sources valid", () => {
    for (const details of Object.values(MOVIE_DETAILS)) {
      const review = details.review;
      if (!review) continue;
      if (review.rottenTomatoesScore !== undefined) {
        expect(review.rottenTomatoesScore).toBeGreaterThanOrEqual(0);
        expect(review.rottenTomatoesScore).toBeLessThanOrEqual(100);
      }
      if (review.metacriticScore !== undefined) {
        expect(review.metacriticScore).toBeGreaterThanOrEqual(0);
        expect(review.metacriticScore).toBeLessThanOrEqual(100);
      }
      expect(() => new URL(review.sourceUrl)).not.toThrow();
      expect(new URL(review.sourceUrl).protocol).toMatch(/^https?:$/);
    }
  });
});

describe("connection data integrity", () => {
  const movieIds = new Set(MOVIE_CATALOG.map((movie) => movie.id));

  it("uses unique connection ids", () => {
    const connectionIds = CONNECTIONS.map((connection) => connection.id);
    expect(new Set(connectionIds).size).toBe(connectionIds.length);
  });

  it("references only catalog movies", () => {
    for (const connection of CONNECTIONS) {
      expect(connection.requires.length).toBeGreaterThan(0);
      for (const requiredId of connection.requires) {
        expect(movieIds.has(requiredId), `${connection.id}: ${requiredId}`).toBe(
          true,
        );
      }
    }
  });
});
