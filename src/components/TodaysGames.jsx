import React, { useState } from "react";
import { TODAYS_GAMES, TODAY_SHORT } from "../data/mlbData";

export default function TodaysGames() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="slate" style={{ background: "var(--color-canvas-muted)", padding: "56px 0", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>
              {TODAY_SHORT} · Today's Slate
            </h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>
              경기를 클릭하면 모델 상세 정보를 볼 수 있어요
            </p>
          </div>
          <div style={{
            background: "var(--color-primary)", color: "#fff",
            borderRadius: "var(--radius-full)", padding: "5px 14px",
            fontSize: 12, fontWeight: 700,
          }}>
            {TODAYS_GAMES.length} Games
          </div>
        </div>

        {/* Game rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TODAYS_GAMES.map((g, i) => {
            const isSelected = selected === i;
            const isToday = g.correct === null;
            const borderColor = isSelected
              ? (g.awayProb > g.homeProb ? g.away.color : g.home.color)
              : g.isTopPick ? "#F59E0B" : "transparent";

            return (
              <div key={i}>
                <div
                  onClick={() => setSelected(isSelected ? null : i)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr 140px 180px",
                    alignItems: "center", gap: 16,
                    padding: "14px 18px",
                    background: isSelected ? "var(--color-canvas)" : "#fff",
                    borderRadius: "var(--radius-md)",
                    borderLeft: `4px solid ${borderColor}`,
                    cursor: "pointer",
                    boxShadow: isSelected ? "var(--shadow-md)" : "var(--shadow-sm)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Away team */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
                    <div style={{ textAlign: "right" }}>
                      <div className="t-caption-strong" style={{ color: g.away.color }}>{g.away.city} {g.away.name}</div>
                      <div className="t-micro" style={{ color: "var(--color-subtle)", marginTop: 2 }}>{g.away.rec}</div>
                    </div>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `${g.away.color}18`, border: `1.5px solid ${g.away.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: g.away.color }}>{g.away.abbr}</span>
                    </div>
                  </div>

                  {/* Win prob */}
                  <div style={{ textAlign: "center", minWidth: 88 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "center" }}>
                      <span className="t-body-strong" style={{ color: g.awayProb > g.homeProb ? g.away.color : "var(--color-subtle)" }}>
                        {g.awayProb}%
                      </span>
                      <span className="t-micro" style={{ color: "var(--color-subtle)" }}>·</span>
                      <span className="t-body-strong" style={{ color: g.homeProb > g.awayProb ? g.home.color : "var(--color-subtle)" }}>
                        {g.homeProb}%
                      </span>
                    </div>
                    <div className="t-micro" style={{ color: "var(--color-subtle)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 2 }}>
                      Win Prob
                    </div>
                  </div>

                  {/* Home team */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `${g.home.color}18`, border: `1.5px solid ${g.home.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: g.home.color }}>{g.home.abbr}</span>
                    </div>
                    <div>
                      <div className="t-caption-strong" style={{ color: g.home.color }}>{g.home.city} {g.home.name}</div>
                      <div className="t-micro" style={{ color: "var(--color-subtle)", marginTop: 2 }}>{g.home.rec}</div>
                    </div>
                  </div>

                  {/* Prob bar */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1, height: 6, borderRadius: "var(--radius-full)", background: `${g.home.color}20`, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${g.awayProb}%`, background: g.away.color, borderRadius: "var(--radius-full)" }} />
                    </div>
                  </div>

                  {/* Result / notes */}
                  <div style={{ textAlign: "right" }}>
                    {!isToday && g.correct !== null ? (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        background: g.correct ? "var(--color-win-bg)" : "var(--color-loss-bg)",
                        color: g.correct ? "var(--color-win)" : "var(--color-loss)",
                        borderRadius: "var(--radius-full)", padding: "4px 10px",
                        fontSize: 12, fontWeight: 700, marginBottom: 4,
                      }}>
                        {g.correct ? "✓ 적중" : "✗ 미스"}
                      </div>
                    ) : (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        background: g.isTopPick ? "var(--color-hot-bg)" : "var(--color-canvas-muted)",
                        color: g.isTopPick ? "#92400E" : "var(--color-muted)",
                        borderRadius: "var(--radius-full)", padding: "4px 10px",
                        fontSize: 12, fontWeight: 600, marginBottom: 4,
                      }}>
                        {g.notes}
                      </div>
                    )}
                    <div className="t-micro" style={{ color: "var(--color-subtle)" }}>
                      Pick: {g.pick} · {g.gameTime}
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isSelected && (
                  <div style={{
                    background: "var(--color-canvas)", borderRadius: "0 0 var(--radius-md) var(--radius-md)",
                    padding: "16px 18px", borderTop: "1px solid var(--color-border)",
                    marginTop: -4, boxShadow: "var(--shadow-sm)",
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                      {[
                        { label: "Pick", value: g.pick, sub: "Model pick" },
                        { label: "Win Prob", value: `${Math.max(g.awayProb, g.homeProb)}%`, sub: "Model confidence" },
                        { label: "Game Time", value: g.gameTime, sub: g.network },
                        { label: "Record", value: `${g.away.abbr} ${g.away.rec}`, sub: `${g.home.abbr} ${g.home.rec}` },
                      ].map(item => (
                        <div key={item.label} style={{ textAlign: "center" }}>
                          <div className="t-micro" style={{ color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>
                            {item.label}
                          </div>
                          <div className="t-body-strong" style={{ color: "var(--color-ink)" }}>{item.value}</div>
                          <div className="t-micro" style={{ color: "var(--color-subtle)" }}>{item.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
