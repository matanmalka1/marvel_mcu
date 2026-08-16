/**
 * Domain types.
 *
 * Three concepts are deliberately kept separate and are never derived from one another:
 *  - `phase`         : release phase (Captain Marvel is Phase 3 even though it is 2nd chronologically)
 *  - `timelineOrder` : position in the chronological viewing order
 *  - `timelineLabel` : narrative era ("1995", "אחרי Endgame", ...)
 */

/** Release saga. Kept separate from `phase` so future sagas are additive. */
export type Saga = "infinity" | "multiverse";

/**
 * Honest metadata for movies that do not sit cleanly on a single linear historical timeline.
 */
export type TimelineFlag =
  | "post-endgame"
  | "multiverse"
  | "tva"
  | "alternate-universe";

/**
 * Everything a viewer is allowed to know *after* finishing the movie.
 * Rendered only when the movie is marked as watched — see SPOILER RULE in `data/movies.ts`.
 */
export type MovieKnowledge = {
  summary: string;
  concepts: string[];
  characters: string[];
  organizations?: string[];
  objects?: string[];
  /** Links back to earlier movies only. Never forward. */
  connections?: string[];
};

/**
 * Critical reception, sourced from Rotten Tomatoes / Metacritic.
 * Same spoiler rule as `MovieKnowledge`: written only for movies already watched,
 * rendered only for movies marked as watched.
 */
export type MovieReview = {
  rottenTomatoesScore?: number;
  metacriticScore?: number;
  consensus: string;
  source: string;
  sourceUrl: string;
};

export type Movie = {
  id: string;
  title: string;
  /** 1-based position in the chronological viewing order. */
  timelineOrder: number;
  /** Release phase. Never inferred from `timelineOrder`. */
  phase: number;
  saga: Saga;
  releaseYear: number;
  /** Narrative era, e.g. "1995" or "אחרי Endgame". */
  timelineLabel?: string;
  timelineFlags?: TimelineFlag[];
  /** Major landmark in the timeline (currently: Avengers: Endgame). */
  milestone?: boolean;
  /**
   * Undefined until written by hand. An empty knowledge object is never faked for
   * movies that have not been reviewed yet.
   */
  knowledge?: MovieKnowledge;
  /** Same rule as `knowledge`: only present for movies already watched. */
  review?: MovieReview;
};

export type MovieStatus = "watched" | "next" | "upcoming";

/**
 * A thematic thread the viewer has already uncovered.
 * `requires` lists the movies that must ALL be watched before the connection may be shown.
 */
export type Connection = {
  id: string;
  title: string;
  /** Rendered right-to-left, in narrative order. */
  chain: string[];
  description: string;
  requires: string[];
  /** Renders wider and with more emphasis — used for the "big picture" thread. */
  wide?: boolean;
};
