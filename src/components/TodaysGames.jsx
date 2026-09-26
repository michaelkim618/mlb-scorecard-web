import React, { useState } from "react";
import { usePredictions } from "../hooks/usePredictions";
import { usePreviewPredictions } from "../hooks/usePreviewPredictions";
import useLiveScores from "../hooks/useLiveScores";
import GameCard from "./GameCard";

export default function TodaysGames() {
  const [activeTab, setActiveTab] = useState("today"); // "today" | "tomorrow"

  // ── 오늘 예측 ────────────────────────────────────────────────────────
  const { games, seasonW, seasonL, loading, error, dataDate } = usePredictions(null);
  const TODAY_DISPLAY = dataDate
    ? new Date(dataDate + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const { scores, lastUpdated } = useLiveScores(TODAY_DISPLAY);

  // ── 내일 미리보기 ────────────────────────────────────────────────────
  const {
    games: previewGames,
    loading: previewLoading,
    available: previewAvailable,
    previewDate,
  } = usePreviewPredictions();

  const TOMORROW_DISPLAY = previewDate
    ? new Date(previewDate + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  // 탭 스타일 헬퍼
  const tabStyle = (tab) => ({
    padding: "8px 20px",
    borderRadius: "var(--radius-full)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "all 0.15s ease",
    background: activeTab === tab ? "var(--color-primary)" : "transparent",
    color: activeTab === tab ? "#fff" : "var(--color-muted)",
    outline: "none",
  });

  return (
    <section id="slate" style={{ background: "var(--color-canvas-muted)", padding: "56px 0", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="todays-games-header" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>
              {activeTab === "today" ? "Today's Slate" : "Tomorrow's Preview"}
            </h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>
              {activeTab === "today"
                ? "Click a game to see the full model breakdown"
                : "Early predictions — lineups TBD, may update"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {activeTab === "today" && lastUpdated && (
              <span style={{ fontSize: 11, color: "var(--color-muted)" }}>
                Live scores updated {lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
            <div style={{
              background: "var(--color-primary)", color: "#fff",
              borderRadius: "var(--radius-full)", padding: "5px 14px",
              fontSize: 12, fontWeight: 700,
            }}>
              {activeTab === "today" ? games.length : previewGames.length} Games
            </div>
          </div>
        </div>

        {/* 탭 스위처 (내일 예측이 있을 때만 표시) */}
        {previewAvailable && (
          <div style={{
            display: "flex",
            gap: 4,
            marginBottom: 24,
            background: "var(--color-canvas)",
            borderRadius: "var(--radius-full)",
            padding: "4px",
            width: "fit-content",
            border: "1px solid var(--color-border)",
          }}>
            <button style={tabStyle("today")} onClick={() => setActiveTab("today")}>
              Today · {TODAY_DISPLAY}
            </button>
            <button style={tabStyle("tomorrow")} onClick={() => setActiveTab("tomorrow")}>
              🔮 Tomorrow · {TOMORROW_DISPLAY}
            </button>
          </div>
        )}

        {/* ── 오늘 탭 ─────────────────────────────────────────────────── */}
        {activeTab === "today" && (
          <>
            {loading && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
                Loading predictions…
              </div>
            )}
            {error && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-loss)" }}>
                Failed to load predictions: {error}
              </div>
            )}
            {!loading && !error && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {games.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
                    No games found for today.
                  </div>
                ) : (
                  games.map((game, i) => {
                    const liveGame =
                      scores[game.game_pk] ||
                      scores[`${game.away}|${game.home}`] ||
                      null;
                    return (
                      <GameCard
                        key={game.game_pk || i}
                        game={game}
                        liveGame={liveGame}
                        defaultOpen={false}
                      />
                    );
                  })
                )}
              </div>
            )}
            {(seasonW + seasonL) > 0 && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <span className="t-caption" style={{ color: "var(--color-muted)" }}>
                  Season record from this dataset:{" "}
                  <b style={{ color: "var(--color-win)" }}>{seasonW}W</b>
                  {" – "}
                  <b style={{ color: "var(--color-loss)" }}>{seasonL}L</b>
                </span>
              </div>
            )}
          </>
        )}

        {/* ── 내일 탭 ─────────────────────────────────────────────────── */}
        {activeTab === "tomorrow" && (
          <>
            {/* 미리보기 안내 배너 */}
            <div style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "10px 16px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.5 }}>
                <b style={{ color: "var(--color-warning, #f59e0b)" }}>Early Preview</b>
                {" — "}Many lineups are TBD. Predictions will auto-update tonight at midnight when final lineups are confirmed.
              </span>
            </div>

            {previewLoading && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
                Loading tomorrow's preview…
              </div>
            )}
            {!previewLoading && previewGames.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
                Tomorrow's preview not yet available. Check back tonight.
              </div>
            )}
            {!previewLoading && previewGames.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {previewGames.map((game, i) => (
                  <GameCard
                    key={game.game_pk || i}
                    game={game}
                    liveGame={null}
                    defaultOpen={false}
                    isPreview={true}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
