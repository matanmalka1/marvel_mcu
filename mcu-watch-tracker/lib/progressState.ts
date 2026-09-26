import { getMovieSummaryById } from "@/data/movieCatalog";

/**
 * Everything undo can roll back. Journal entries (ratings, notes) live outside it so
 * typing a note never floods the undo history.
 */
export type ProgressState = {
  /** Fully watched titles, in the order they were marked. */
  watched: string[];
  /** Partially watched series: watched episode numbers, sorted. Never holds a fully watched title. */
  episodes: Record<string, number[]>;
  /** ISO timestamp of when each watched title was completed. */
  watchedAt: Record<string, string>;
};

export const EMPTY_PROGRESS: ProgressState = { watched: [], episodes: {}, watchedAt: {} };

function without<T>(record: Record<string, T>, key: string): Record<string, T> {
  if (!(key in record)) return record;
  const next = { ...record };
  delete next[key];
  return next;
}

function markWatched(state: ProgressState, id: string, now: string): ProgressState {
  return {
    watched: state.watched.includes(id) ? state.watched : [...state.watched, id],
    episodes: without(state.episodes, id),
    watchedAt: { ...state.watchedAt, [id]: now },
  };
}

function markUnwatched(state: ProgressState, id: string): ProgressState {
  return {
    watched: state.watched.filter((watchedId) => watchedId !== id),
    episodes: without(state.episodes, id),
    watchedAt: without(state.watchedAt, id),
  };
}

/** Marks a whole title watched, or clears it (including any partial episodes). */
export function toggleTitle(
  state: ProgressState,
  id: string,
  now: string,
): ProgressState {
  return state.watched.includes(id)
    ? markUnwatched(state, id)
    : markWatched(state, id, now);
}

/**
 * Toggles one episode of a series. Watching the last missing episode completes the
 * season; unticking an episode of a completed season reopens it with the rest kept.
 */
export function toggleEpisode(
  state: ProgressState,
  id: string,
  episode: number,
  now: string,
): ProgressState {
  const total = getMovieSummaryById(id)?.episodes;
  if (!total || !Number.isInteger(episode) || episode < 1 || episode > total)
    return state;

  const current = state.watched.includes(id)
    ? Array.from({ length: total }, (_, index) => index + 1)
    : (state.episodes[id] ?? []);
  const next = current.includes(episode)
    ? current.filter((watchedEpisode) => watchedEpisode !== episode)
    : [...current, episode].sort((a, b) => a - b);

  if (next.length === total) return markWatched(state, id, now);

  const base = markUnwatched(state, id);
  return next.length === 0
    ? base
    : { ...base, episodes: { ...base.episodes, [id]: next } };
}

/** Lowest episode not yet watched, or null when the title isn't a partially watched series. */
export function nextEpisodeOf(state: ProgressState, id: string): number | null {
  const total = getMovieSummaryById(id)?.episodes;
  if (!total || state.watched.includes(id)) return null;
  const watched = new Set(state.episodes[id] ?? []);
  for (let episode = 1; episode <= total; episode += 1) {
    if (!watched.has(episode)) return episode;
  }
  return null;
}
