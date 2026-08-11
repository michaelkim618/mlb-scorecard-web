import { useState, useEffect } from "react";

function calcStat(games) {
  const W = games.filter(g => g.correct).length;
  const L = games.filter(g => !g.correct).length;
  const pct = (W + L) > 0 ? parseFloat(((W / (W + L)) * 100).toFixed(1)) : 0;
  return { W, L, pct };
}

// PST 기준 오늘 날짜 (en-CA = YYYY-MM-DD 포맷)
function getPstToday() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
}

export default function useSeasonResults() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/season_results.json")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (!data) return { loading, games: [], season: "2026", startDate: null, lastDate: null, W: 0, L: 0, pct: "0.0", categoryStats: [] };

  const allGames  = data.games || [];
  const startDate = data.start_date || null;
  const pstToday  = getPstToday();

  // start_date 이후 경기만 집계 (전체 — Daily History용)
  const games = startDate
    ? allGames.filter(g => g.date >= startDate)
    : allGames;

  // 실제 결과가 있는 경기 중 가장 최근 날짜
  const datesWithResults = games.filter(g => g.actual_winner).map(g => g.date).sort();
  const lastDate = datesWithResults.length > 0 ? datesWithResults[datesWithResults.length - 1] : null;

  // ── 누적 통계는 오늘 제외 ──
  // 오늘 경기는 진행 중일 수 있어 부분 결과가 누적에 포함되면 신뢰성이 떨어짐.
  // 오늘 결과는 "Today's Results" 패널에서 별도로 표시함.
  const completedGames = games.filter(g => g.date < pstToday);

  const overall   = calcStat(completedGames);

  // 60%+ picks
  const picks60   = completedGames.filter(g => (g.pick_prob || 0) >= 60);
  const stat60    = calcStat(picks60);

  // High Confidence (pick_prob >= 65%)
  const highConf  = completedGames.filter(g => (g.pick_prob || 0) >= 65);
  const statHC    = calcStat(highConf);

  // Home Fav (pick === home team)
  const homeFav   = completedGames.filter(g => g.pick === g.home);
  const statHF    = calcStat(homeFav);

  const categoryStats = [
    { label: "Overall",          wins: overall.W, losses: overall.L, pct: overall.pct },
    { label: "60%+ picks",       wins: stat60.W,  losses: stat60.L,  pct: stat60.pct  },
    { label: "⭐ High Confidence", wins: statHC.W,  losses: statHC.L,  pct: statHC.pct  },
    { label: "Home fav",         wins: statHF.W,  losses: statHF.L,  pct: statHF.pct  },
  ];

  return { loading, games, pstToday, season: data.season, startDate, lastDate, W: overall.W, L: overall.L, pct: overall.pct.toFixed(1), categoryStats };
}
