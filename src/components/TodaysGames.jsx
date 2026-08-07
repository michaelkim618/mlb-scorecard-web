import React from "react";
import { usePredictions } from "../hooks/usePredictions";
import useLiveScores from "../hooks/useLiveScores";
import GameCard from "./GameCard";

const TODAY = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
const TODAY_DISPLAY = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function TodaysGames() {
  const { games, seasonW, seasonL, loading, error } = usePredictions(TODAY);
  const { scores, lastUpdated } = useLiveScores(TODAY_DISPLAY);

  return (
    <section id="slate" style={{ background: "var(--color-canvas-muted)", padding: "56px 0", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="todays-games-header" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>
              Today's Slate
            </h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>
              Click a game to see the full model breakdown
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {lastUpdated && (
              <span style={{ fontSize: 11, color: "var(--color-muted)" }}>
                Live scores updated {lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
            <div style={{
              background: "var(--color-primary)", color: "#fff",
              borderRadius: "var(--radius-full)", padding: "5px 14px",
              fontSize: 12, fontWeight: 700,
            }}>
              {games.length} Games
            </div>
          </div>
        </div>

        {/* States */}
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

        {/* Game cards */}
        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {games.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
                No games found for today.
              </div>
            ) : (
              games.map((game, i) => {
                // Match live score by team name
                const liveKey = `${game.away}|${game.home}`;
                const liveGame = scores[liveKey] || null;
                return (
                  <GameCard
                    key={i}
                    game={game}
                    liveGame={liveGame}
                    defaultOpen={false}
                  />
                );
              })
            )}
          </div>
        )}

        {/* Season record footer */}
        {(seasonW + seasonL) > 0 && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>
              Season record from this dataset: {" "}
              <b style={{ color: "var(--color-win)" }}>{seasonW}W</b>
              {" – "}
              <b style={{ color: "var(--color-loss)" }}>{seasonL}L</b>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
