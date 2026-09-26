import { ENDGAME_ID, isReleased } from "@/data/movieCatalog";
import { nextEpisodeOf, type ProgressState } from "@/lib/progressState";
import type { MovieSummary, TitleKind } from "@/types/movie";

export type Tally = { watched: number; total: number };

export type ProgressStats = {
  /** Released titles only — unreleased ones never count toward progress. */
  total: number;
  watched: number;
  remaining: number;
  percent: number;
  /** Series with some, but not all, episodes watched. */
  inProgress: number;
  nextTitle: MovieSummary | null;
  /** For a series `nextTitle`: the first episode still to watch. */
  nextEpisode: number | null;
  /** Unwatched titles right after `nextTitle`, in the same order. */
  queue: MovieSummary[];
  /** Everything up to and including Endgame, in the active order. */
  endgame: Tally;
  byKind: Record<TitleKind, Tally>;
  byPhase: Array<Tally & { phase: number }>;
  /** Minutes watched, counting partially watched seasons pro rata. */
  watchedMinutes: number;
  remainingMinutes: number;
  /** Released titles with no known running time (left out of the minute totals). */
  unknownRuntime: number;
  /** Titles dated after `today`, soonest first. */
  unreleased: MovieSummary[];
};

export function percentOf({ watched, total }: Tally): number {
  return total ? Math.round((watched / total) * 100) : 0;
}

/** "12 שעות" / "45 דק׳" — compact Hebrew duration. */
export function formatDuration(minutes: number): string {
  const rounded = Math.round(minutes);
  if (rounded < 60) return `${rounded} דק׳`;
  const hours = Math.round(rounded / 60);
  return hours === 1 ? "שעה" : `${hours} שעות`;
}

/** All derived progress for `titles` (already filtered and ordered by the viewer's preferences). */
export function computeProgress(
  titles: readonly MovieSummary[],
  progress: ProgressState,
  today: string,
  queueLength = 3,
): ProgressStats {
  const watchedSet = new Set(progress.watched);
  const byKind: Record<TitleKind, Tally> = {
    movie: { watched: 0, total: 0 },
    series: { watched: 0, total: 0 },
    special: { watched: 0, total: 0 },
  };
  const phases = new Map<number, Tally>();
  const released = titles.filter((title) => isReleased(title, today));
  const endgameIndex = released.findIndex((title) => title.id === ENDGAME_ID);
  const endgame: Tally = { watched: 0, total: endgameIndex + 1 };
  const unwatched: MovieSummary[] = [];
  let watched = 0;
  let inProgress = 0;
  let watchedMinutes = 0;
  let totalMinutes = 0;
  let unknownRuntime = 0;

  released.forEach((title, index) => {
    const isWatched = watchedSet.has(title.id);
    const phase = phases.get(title.phase) ?? { watched: 0, total: 0 };
    phase.total += 1;
    byKind[title.kind].total += 1;

    if (title.runtimeMinutes === undefined) unknownRuntime += 1;
    else totalMinutes += title.runtimeMinutes;

    if (isWatched) {
      watched += 1;
      phase.watched += 1;
      byKind[title.kind].watched += 1;
      if (index <= endgameIndex) endgame.watched += 1;
      watchedMinutes += title.runtimeMinutes ?? 0;
    } else {
      const partial = progress.episodes[title.id]?.length ?? 0;
      if (partial > 0 && title.episodes) {
        inProgress += 1;
        watchedMinutes += ((title.runtimeMinutes ?? 0) * partial) / title.episodes;
      }
      if (unwatched.length <= queueLength) unwatched.push(title);
    }
    phases.set(title.phase, phase);
  });

  const nextTitle = unwatched[0] ?? null;

  return {
    total: released.length,
    watched,
    remaining: released.length - watched,
    percent: percentOf({ watched, total: released.length }),
    inProgress,
    nextTitle,
    nextEpisode: nextTitle ? nextEpisodeOf(progress, nextTitle.id) : null,
    queue: unwatched.slice(1),
    endgame,
    byKind,
    byPhase: Array.from(phases, ([phase, tally]) => ({ phase, ...tally })).sort(
      (a, b) => a.phase - b.phase,
    ),
    watchedMinutes: Math.round(watchedMinutes),
    remainingMinutes: Math.max(0, Math.round(totalMinutes - watchedMinutes)),
    unknownRuntime,
    unreleased: titles
      .filter((title) => !isReleased(title, today))
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate)),
  };
}
