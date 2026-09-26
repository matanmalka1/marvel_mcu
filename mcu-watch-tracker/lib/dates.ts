const RELEASE_FORMAT = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const WATCHED_FORMAT = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** "18 בדצמבר 2026" for an ISO calendar date. */
export function formatReleaseDate(isoDate: string): string {
  return RELEASE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
}

/** "היום" / "מחר" / "בעוד 83 ימים". */
export function formatCountdown(days: number): string {
  if (days <= 0) return "היום";
  if (days === 1) return "מחר";
  return `בעוד ${days} ימים`;
}

/** Date a title was marked watched, in the viewer's local time zone. */
export function formatWatchedAt(isoTimestamp: string): string {
  return WATCHED_FORMAT.format(new Date(isoTimestamp));
}
