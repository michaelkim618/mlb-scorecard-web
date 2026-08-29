import { useState, useEffect, useCallback } from "react";

// 자동 갱신 기본값: 5분 (300000ms). null이면 폴링 안 함.
export function usePredictions(date, { refreshInterval = null } = {}) {
  const [games, setGames]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [dataDate, setDataDate] = useState(null);

  const fetchData = useCallback(() => {
    fetch("/predictions.json?t=" + Date.now())   // 캐시 방지
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        // predictions.json에 있는 날짜를 기준으로 필터링
        // (브라우저 오늘 날짜 대신 데이터 자체의 날짜 사용 → 타임존 문제 방지)
        const jsonDate = list.length > 0 ? list[0].date : null;
        const filterDate = date || jsonDate;
        const filtered = filterDate
          ? list.filter(g => g.date === filterDate)
          : list;
        setGames(filtered);
        setDataDate(jsonDate);
        setLastUpdated(new Date());
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [date]);

  // 최초 로드
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  // 자동 폴링 (refreshInterval ms 마다)
  useEffect(() => {
    if (!refreshInterval) return;
    const id = setInterval(fetchData, refreshInterval);
    return () => clearInterval(id);
  }, [fetchData, refreshInterval]);

  const topPick = games.find(g => g.consensus === true || g.value_bet === true) || games[0];
  const seasonW = games.filter(g => g.model_correct === true).length;
  const seasonL = games.filter(g => g.model_correct === false).length;

  return { games, topPick, seasonW, seasonL, loading, error, lastUpdated, dataDate, refresh: fetchData };
}
