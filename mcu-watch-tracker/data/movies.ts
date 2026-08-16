import { MOVIE_CATALOG } from "@/data/movieCatalog";
import { MOVIE_DETAILS } from "@/data/movieDetails";
import type { Movie } from "@/types/movie";

export const MOVIES: readonly Movie[] = MOVIE_CATALOG.map((movie) => ({
  ...movie,
  ...MOVIE_DETAILS[movie.id],
}));

export const MOVIES_IN_TIMELINE_ORDER: readonly Movie[] = [...MOVIES].sort(
  (a, b) => a.timelineOrder - b.timelineOrder,
);
