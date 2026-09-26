import { describe, expect, it } from "vitest";

import { CONNECTIONS } from "@/data/connections";
import {
  CATALOG_AS_OF,
  isReleased,
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

  it("has one detail record for every released title, none for unreleased ones", () => {
    const released = MOVIE_CATALOG.filter((movie) => isReleased(movie, CATALOG_AS_OF));
    expect(new Set(Object.keys(MOVIE_DETAILS))).toEqual(
      new Set(released.map((movie) => movie.id)),
    );
  });

  it("has valid release dates that match the year and the release order", () => {
    for (const movie of MOVIE_CATALOG) {
      expect(movie.releaseDate, movie.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(movie.releaseDate.slice(0, 4), movie.id).toBe(String(movie.releaseYear));
    }
    const dates = MOVIES_IN_RELEASE_ORDER.map((movie) => movie.releaseDate);
    expect(dates).toEqual([...dates].sort());
  });

  it("gives released titles a plausible runtime", () => {
    for (const movie of MOVIE_CATALOG) {
      if (movie.runtimeMinutes === undefined) continue;
      expect(movie.runtimeMinutes, movie.id).toBeGreaterThan(30);
      expect(movie.runtimeMinutes, movie.id).toBeLessThan(600);
    }
  });

  it("marks series seasons consistently", () => {
    for (const movie of MOVIE_CATALOG) {
      if (movie.kind === "series") {
        expect(movie.season, movie.id).toBeGreaterThan(0);
        expect(movie.episodes, movie.id).toBeGreaterThan(0);
      } else {
        expect(movie.season, movie.id).toBeUndefined();
      }
    }
  });

  it("gives every released title written knowledge", () => {
    for (const id of Object.keys(MOVIE_DETAILS)) {
      expect(MOVIE_DETAILS[id]?.knowledge?.summary, id).toBeTruthy();
    }
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
        expect(movieIds.has(requiredId), `${connection.id}: ${requiredId}`).toBe(true);
      }
    }
  });
});
