import { useState, useEffect } from "react";

export default function useSeasonResults() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/season_results.json")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (!data) return { loading, games: [], season: "2026", startDate: null, W: 0, L: 0, pct: 0 };

  const games = data.games || [];
  const W     = games.filter(g => g.correct).length;
  const L     = games.filter(g => !g.correct).length;
  const pct   = (W + L) > 0 ? ((W / (W + L)) * 100).toFixed(1) : "0.0";

  return { loading, games, season: data.season, startDate: data.start_date, W, L, pct };
}
