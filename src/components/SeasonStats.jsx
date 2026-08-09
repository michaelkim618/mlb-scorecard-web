import React, { useMemo } from "react";
import { usePredictions } from "../hooks/usePredictions";
import useSeasonResults from "../hooks/useSeasonResults";
const TODAY = new Date().toLocaleDateString("en-CA");

function ResultBadge({ correct }) {
  if (correct === true)  return <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "#DCFCE7", color: "#15803D" }}>✓ Correct</span>;
  if (correct === false) return <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "#FEE2E2", color: "#B91C1C" }}>✗ Miss</span>;
  return <span style={{ fontSize: 11, color: "var(--color-subtle)", padding: "2px 8px" }}>—</span>;
}

export default function SeasonStats() {
  const { games: todayGames, loading: todayLoading } = usePredictions(TODAY);
  const { games: seasonGames, W: cumW, L: cumL, pct: cumPct, startDate, lastDate, categoryStats, loading: seasonLoading } = useSeasonResults();

  // 오늘 완료된 경기 결과
  const todayDone  = todayGames.filter(g => g.model_correct !== null && g.model_correct !== undefined);
  const todayW     = todayDone.filter(g => g.model_correct === true).length;
  const todayL     = todayDone.filter(g => g.model_correct === false).length;
  const todayTotal = todayW + todayL;
  const todayPct   = todayTotal > 0 ? ((todayW / todayTotal) * 100).toFixed(1) : null;

  // 시즌 시작일/마지막 결과 날짜 포맷
  const startDisplay = startDate
    ? new Date(startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()
    : "AUG 4";
  const lastDisplay = lastDate
    ? new Date(lastDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()
    : startDisplay;

  // 날짜별 그룹핑 (히스토리용)
  const byDate = useMemo(() => {
    const map = {};
    seasonGames.forEach(g => {
      if (!map[g.date]) map[g.date] = [];
      map[g.date].push(g);
    });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0])); // 최신순
  }, [seasonGames]);

  const isLoading = todayLoading || seasonLoading;

  return (
    <section id="stats" style={{ background: "var(--color-canvas)", padding: "56px 0", borderTop: "1px solid var(--color-border)", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Season Accuracy</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>
              Every pick tracked. Updated daily. · Season start: {startDisplay}
            </p>
          </div>
        </div>

        {/* ── 상단: 오늘 결과 + 누적 ── */}
        <div className="season-top-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>

          {/* 당일 결과 */}
          <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "24px 28px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>Today's Results</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)", marginTop: 2 }}>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}</div>
              </div>
              {!isLoading && (
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)" }}>
                  {todayTotal > 0 ? `${todayDone.length} / ${todayGames.length} complete` : "Games in progress"}
                </span>
              )}
            </div>

            {isLoading ? (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--color-muted)", fontSize: 13 }}>Loading…</div>
            ) : todayTotal > 0 ? (
              <>
                {/* 오늘 정확도 */}
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 52, lineHeight: 1, letterSpacing: "-2px", color: parseFloat(todayPct) >= 70 ? "#16A34A" : parseFloat(todayPct) >= 50 ? "#0EA5E9" : "#DC2626" }}>
                    {todayPct}<span style={{ fontSize: 26, opacity: 0.5 }}>%</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted)", marginTop: 4 }}>
                    {todayW}W – {todayL}L · Today's Accuracy
                  </div>
                </div>
                {/* 경기별 결과 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 108, overflowY: "auto", paddingRight: 2 }}>
                  {todayDone.map((g, i) => {
                    const away = g.away?.split(" ").pop() || "—";
                    const home = g.home?.split(" ").pop() || "—";
                    const pick = g.model_winner?.split(" ").pop() || "—";
                    const cardId = `game-${away}-${home}`.toLowerCase().replace(/[^a-z0-9-]/g, "");
                    const scrollToCard = () => {
                      const el = document.getElementById(cardId);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    };
                    return (
                      <div key={i} onClick={scrollToCard} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", borderRadius: 6, background: "var(--color-canvas-muted)", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#E2E8F0"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--color-canvas-muted)"}
                      >
                        <span style={{ fontSize: 12, color: "var(--color-ink)", fontWeight: 600 }}>{away} @ {home}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, color: "var(--color-muted)" }}>Pick: <b>{pick}</b></span>
                          <ResultBadge correct={g.model_correct} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0", color: "var(--color-muted)", fontSize: 13 }}>
                No results yet today. Check back after games start! ⚾
              </div>
            )}
          </div>

          {/* 누적 결과 */}
          <div style={{
            background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
            borderRadius: "var(--radius-lg)", padding: "24px 28px",
            boxShadow: "0 12px 40px rgba(14,165,233,0.25)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>
              Cumulative Record
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 20 }}>
              {startDisplay} → {lastDisplay}
            </div>

            {/* 큰 % */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 72, lineHeight: 1, color: "#fff", letterSpacing: "-3px" }}>
                {cumPct}<span style={{ fontSize: 36, color: "rgba(255,255,255,0.6)" }}>%</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                Overall Accuracy
              </div>
            </div>

            {/* W-L 배지 */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.18)", borderRadius: "var(--radius-full)", padding: "8px 20px" }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>{cumW}W</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>–</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 800, fontSize: 20 }}>{cumL}L</span>
              </div>
            </div>

            {/* 총 경기 수 */}
            <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              {cumW + cumL} games tracked · {startDisplay} → {lastDisplay}
            </div>
          </div>
        </div>

        {/* ── 날짜별 히스토리 ── */}
        {byDate.length > 0 && (
          <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", overflow: "hidden", marginBottom: 24 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--color-ink)" }}>Daily History</span>
              <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{byDate.length} days tracked</span>
            </div>
            {/* 스크롤 영역: 4개 행 높이(~220px) 고정 */}
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {byDate.map(([dateStr, dateGames], i) => {
                const dW   = dateGames.filter(g => g.correct).length;
                const dL   = dateGames.filter(g => !g.correct).length;
                const dPct = dW + dL > 0 ? ((dW / (dW + dL)) * 100).toFixed(0) : 0;
                const displayDate = new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
                return (
                  <div key={dateStr} style={{
                    display: "grid", gridTemplateColumns: "80px 1fr auto",
                    alignItems: "center", gap: 16,
                    padding: "12px 20px",
                    borderBottom: i < byDate.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)" }}>{displayDate}</div>
                      <div style={{ fontSize: 10, color: "var(--color-muted)", marginTop: 1 }}>{dateGames.length} games</div>
                    </div>
                    {/* 미니 결과 도트 */}
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {dateGames.map((g, j) => (
                        <div key={j} title={`${g.away?.split(" ").pop()} @ ${g.home?.split(" ").pop()} → Pick: ${g.pick?.split(" ").pop()}`} style={{
                          width: 20, height: 20, borderRadius: 4, fontSize: 9, fontWeight: 800,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: g.correct ? "#DCFCE7" : "#FEE2E2",
                          color: g.correct ? "#15803D" : "#B91C1C",
                        }}>
                          {g.correct ? "W" : "L"}
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: parseInt(dPct) >= 70 ? "#16A34A" : parseInt(dPct) >= 50 ? "#0EA5E9" : "#DC2626", letterSpacing: "-0.5px" }}>
                        {dPct}%
                      </div>
                      <div style={{ fontSize: 10, color: "var(--color-muted)", marginTop: 1 }}>{dW}W–{dL}L</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 하단: 카테고리별 통계 ── */}
        <div className="season-category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {categoryStats.map((stat, i) => (
            <div key={i} style={{
              background: "var(--color-canvas-muted)", borderRadius: "var(--radius-md)",
              padding: "16px 18px", border: "1px solid var(--color-border)",
            }}>
              <div className="t-caption" style={{ color: "var(--color-muted)", marginBottom: 8 }}>{stat.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--color-ink)", letterSpacing: "-1px" }}>
                  {stat.pct}
                </span>
                <span className="t-body" style={{ color: "var(--color-muted)" }}>%</span>
                <span className="t-caption" style={{ color: "var(--color-subtle)" }}>
                  {stat.wins}W–{stat.losses}L
                </span>
              </div>
              <div style={{ height: 5, borderRadius: "var(--radius-full)", background: "var(--color-border)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${stat.pct}%`,
                  background: stat.pct >= 90 ? "var(--color-win)" : stat.pct >= 75 ? "var(--color-primary)" : "var(--color-accent)",
                  borderRadius: "var(--radius-full)", transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
