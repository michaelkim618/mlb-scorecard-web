// Pure helpers behind the public track-record page. Kept out of the component
// so the numbers a visitor is asked to trust are the numbers a test checks.

/** Games that are final and strictly before `today` (YYYY-MM-DD). Today's
 *  games may still be in progress, so they never count toward the record. */
export function gradedGames(games, today) {
  return games.filter((g) => g.date < today && g.actual_winner);
}

export function tally(games) {
  const wins = games.filter((g) => g.correct).length;
  const losses = games.length - wins;
  return { games: games.length, wins, losses, pct: games.length ? (100 * wins) / games.length : null };
}

export const BUCKETS = [
  { label: "Under 55%", lo: 0, hi: 55 },
  { label: "55–59.9%", lo: 55, hi: 60 },
  { label: "60–64.9%", lo: 60, hi: 65 },
  { label: "65% and up", lo: 65, hi: Infinity },
];

/** Stated confidence vs. what actually happened, by confidence band. A model
 *  whose "60%" picks win about 60% of the time is calibrated; this is the
 *  table that shows whether ours is. `avgStated` is the mean pick_prob. */
export function calibration(games) {
  return BUCKETS.map(({ label, lo, hi }) => {
    const inBand = games.filter((g) => (g.pick_prob ?? 0) >= lo && (g.pick_prob ?? 0) < hi);
    const t = tally(inBand);
    return {
      label,
      games: t.games,
      wins: t.wins,
      hitRate: t.pct,
      avgStated: inBand.length ? inBand.reduce((s, g) => s + (g.pick_prob ?? 0), 0) / inBand.length : null,
    };
  });
}

/** Record per calendar month, oldest first. */
export function monthly(games) {
  const byMonth = new Map();
  for (const g of games) {
    const key = g.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key).push(g);
  }
  return [...byMonth.keys()].sort().map((month) => ({ month, ...tally(byMonth.get(month)) }));
}

export const fmtPct = (n) => (n == null ? "—" : `${n.toFixed(1)}%`);
