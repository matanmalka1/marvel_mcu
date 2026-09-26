import { ENDGAME_ID } from "@/data/movieCatalog";
import type { MovieSummary, TitleKind } from "@/types/movie";

export type Tally = { watched: number; total: number };

export type ProgressStats = {
  total: number;
  watched: number;
  remaining: number;
  percent: number;
  nextTitle: MovieSummary | null;
  /** Unwatched titles right after `nextTitle`, in the same order. */
  queue: MovieSummary[];
  /** Everything up to and including Endgame, in the active order. */
  endgame: Tally;
  byKind: Record<TitleKind, Tally>;
  byPhase: Array<Tally & { phase: number }>;
};

export function percentOf({ watched, total }: Tally): number {
  return total ? Math.round((watched / total) * 100) : 0;
}

/** All derived progress for `titles` (already filtered and ordered by the viewer's preferences). */
export function computeProgress(
  titles: readonly MovieSummary[],
  watchedSet: ReadonlySet<string>,
  queueLength = 3,
): ProgressStats {
  const byKind: Record<TitleKind, Tally> = {
    movie: { watched: 0, total: 0 },
    series: { watched: 0, total: 0 },
    special: { watched: 0, total: 0 },
  };
  const phases = new Map<number, Tally>();
  const endgameIndex = titles.findIndex((title) => title.id === ENDGAME_ID);
  const endgame: Tally = { watched: 0, total: endgameIndex + 1 };
  const unwatched: MovieSummary[] = [];
  let watched = 0;

  titles.forEach((title, index) => {
    const isWatched = watchedSet.has(title.id);
    const phase = phases.get(title.phase) ?? { watched: 0, total: 0 };
    phase.total += 1;
    byKind[title.kind].total += 1;

    if (isWatched) {
      watched += 1;
      phase.watched += 1;
      byKind[title.kind].watched += 1;
      if (index <= endgameIndex) endgame.watched += 1;
    } else if (unwatched.length <= queueLength) {
      unwatched.push(title);
    }
    phases.set(title.phase, phase);
  });

  return {
    total: titles.length,
    watched,
    remaining: titles.length - watched,
    percent: percentOf({ watched, total: titles.length }),
    nextTitle: unwatched[0] ?? null,
    queue: unwatched.slice(1),
    endgame,
    byKind,
    byPhase: Array.from(phases, ([phase, tally]) => ({ phase, ...tally })).sort(
      (a, b) => a.phase - b.phase,
    ),
  };
}
