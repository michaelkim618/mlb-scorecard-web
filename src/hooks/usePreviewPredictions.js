import { useState, useEffect } from "react";

/**
 * 내일 경기 미리보기 예측 로드
 * - /output/predictions_preview_YYYY-MM-DD.js 파일을 동적으로 불러옴
 * - window.PREDICTIONS_PREVIEW_DATA 전역 변수 사용
 * - 파일이 없으면 available=false 반환 (탭 숨김 처리용)
 */
export function usePreviewPredictions() {
  const [games, setGames]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [available, setAvailable] = useState(false);
  const [previewDate, setPreviewDate] = useState(null);

  useEffect(() => {
    // 내일 날짜 계산 (브라우저 로컬 기준)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    setPreviewDate(tomorrowStr);

    const scriptId  = "predictions-preview-script";
    const scriptUrl = `/output/predictions_preview_${tomorrowStr}.js?t=${Date.now()}`;

    // 이미 로드된 스크립트 제거 (캐시 방지)
    const old = document.getElementById(scriptId);
    if (old) old.remove();
    delete window.PREDICTIONS_PREVIEW_DATA;

    const script = document.createElement("script");
    script.id  = scriptId;
    script.src = scriptUrl;

    script.onload = () => {
      const data = window.PREDICTIONS_PREVIEW_DATA;
      if (Array.isArray(data) && data.length > 0) {
        setGames(data);
        setAvailable(true);
        setError(null);
      } else {
        setAvailable(false);
        setGames([]);
      }
      setLoading(false);
    };

    script.onerror = () => {
      // 파일이 없는 경우 (아직 생성 전) — 조용히 처리
      setAvailable(false);
      setGames([]);
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, []);

  return { games, loading, error, available, previewDate };
}
