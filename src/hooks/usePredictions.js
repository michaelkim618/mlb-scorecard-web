import { useState, useEffect } from "react";

export function usePredictions(date) {
  const [games, setGames]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch("/predictions.json")
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        const filtered = date
          ? list.filter(g => g.date === date)
          : list;
        setGames(filtered);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [date]);

  const topPick = games.find(g => g.consensus === true || g.value_bet === true) || games[0];
  const seasonW = games.filter(g => g.model_correct === true).length;
  const seasonL = games.filter(g => g.model_correct === false).length;

  return { games, topPick, seasonW, seasonL, loading, error };
}
