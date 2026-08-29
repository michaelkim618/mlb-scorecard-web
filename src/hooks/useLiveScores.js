import { useState, useEffect, useRef } from "react";

const MLB_SCHEDULE_URL = (date) =>
  `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${date}&hydrate=linescore(matchup,runners),decisions`;

function formatDate(dateStr) {
  // dateStr: "August 5, 2026" → "2026-08-05"
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, "0");
  const dd   = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseGame(g) {
  const status    = g.status?.abstractGameState; // "Preview" | "Live" | "Final"
  const detailCode = g.status?.statusCode;        // "I" = In Progress, "F" = Final, etc.
  const linescore = g.linescore || {};

  const awayScore = linescore.teams?.away?.runs ?? null;
  const homeScore = linescore.teams?.home?.runs ?? null;

  // Current inning info
  const currentInning     = linescore.currentInning ?? null;
  const currentInningOrd  = linescore.currentInningOrdinal ?? "";
  const inningHalf        = linescore.inningHalf ?? ""; // "Top" | "Bottom"
  const outs              = linescore.outs ?? 0;

  // Per-inning breakdown
  const innings = (linescore.innings || []).map(inn => ({
    num:        inn.num,
    awayRuns:   inn.away?.runs ?? null,
    homeRuns:   inn.home?.runs ?? null,
  }));

  const awayTeam = g.teams?.away?.team?.name || "";
  const homeTeam = g.teams?.home?.team?.name || "";

  return {
    gamePk:     g.gamePk,
    awayTeam,
    homeTeam,
    status,          // "Preview" | "Live" | "Final"
    detailCode,      // "I", "F", "S" etc.
    awayScore,
    homeScore,
    currentInning,
    currentInningOrd,
    inningHalf,
    outs,
    innings,
  };
}

export default function useLiveScores(dateStr) {
  const [scores, setScores] = useState({});   // { gamePk: gameInfo } + { "Away|Home": gameInfo (non-DH fallback) }
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  const apiDate = formatDate(dateStr);

  async function fetchScores() {
    if (!apiDate) return;
    try {
      const res  = await fetch(MLB_SCHEDULE_URL(apiDate));
      const data = await res.json();
      const games = (data.dates?.[0]?.games || []).map(parseGame);
      const map = {};
      games.forEach(g => {
        // ① game_pk 기준 (더블헤더 구분 — 가장 신뢰도 높음)
        if (g.gamePk) map[g.gamePk] = g;
        // ② 팀 이름 기준 fallback (단일 경기 호환, 더블헤더 두 번째가 첫 번째 덮어쓸 수 있음)
        const nameKey = `${g.awayTeam}|${g.homeTeam}`;
        if (!map[nameKey]) map[nameKey] = g;  // 먼저 들어온 게 우선 (Game 1 보호)
      });
      setScores(map);
      setLastUpdated(new Date());
    } catch (e) {
      console.warn("Live score fetch failed:", e);
    }
  }

  useEffect(() => {
    fetchScores();
    // Poll every 30 seconds
    intervalRef.current = setInterval(fetchScores, 30_000);
    return () => clearInterval(intervalRef.current);
  }, [apiDate]);

  return { scores, lastUpdated };
}
