import React from "react";
import { usePredictions } from "../hooks/usePredictions";
import { TEAM_COLORS } from "../data/mlbData";

// 팀 full name → abbr 매핑
const TEAM_ABBR = {
  "Los Angeles Dodgers": "LAD", "San Francisco Giants": "SF", "San Diego Padres": "SD",
  "Arizona Diamondbacks": "ARI", "Colorado Rockies": "COL", "Los Angeles Angels": "LAA",
  "Athletics": "OAK", "Oakland Athletics": "OAK", "Seattle Mariners": "SEA",
  "Houston Astros": "HOU", "Texas Rangers": "TEX", "Kansas City Royals": "KC",
  "Minnesota Twins": "MIN", "Chicago White Sox": "CWS", "Cleveland Guardians": "CLE",
  "Detroit Tigers": "DET", "Milwaukee Brewers": "MIL", "Chicago Cubs": "CHC",
  "Cincinnati Reds": "CIN", "Pittsburgh Pirates": "PIT", "St. Louis Cardinals": "STL",
  "New York Yankees": "NYY", "Boston Red Sox": "BOS", "Tampa Bay Rays": "TB",
  "Baltimore Orioles": "BAL", "Toronto Blue Jays": "TOR", "Philadelphia Phillies": "PHI",
  "New York Mets": "NYM", "Atlanta Braves": "ATL", "Miami Marlins": "MIA",
  "Washington Nationals": "WSH",
};

const TEAM_CITY = {
  LAD:"Los Angeles", SF:"San Francisco", SD:"San Diego", ARI:"Arizona", COL:"Colorado",
  LAA:"Los Angeles", OAK:"Oakland", SEA:"Seattle", HOU:"Houston", TEX:"Texas",
  KC:"Kansas City", MIN:"Minnesota", CWS:"Chicago", CLE:"Cleveland", DET:"Detroit",
  MIL:"Milwaukee", CHC:"Chicago", CIN:"Cincinnati", PIT:"Pittsburgh", STL:"St. Louis",
  NYY:"New York", BOS:"Boston", TB:"Tampa Bay", BAL:"Baltimore", TOR:"Toronto",
  PHI:"Philadelphia", NYM:"New York", ATL:"Atlanta", MIA:"Miami", WSH:"Washington",
};

const TEAM_NICKNAME = {
  LAD:"Dodgers", SF:"Giants", SD:"Padres", ARI:"Diamondbacks", COL:"Rockies",
  LAA:"Angels", OAK:"Athletics", SEA:"Mariners", HOU:"Astros", TEX:"Rangers",
  KC:"Royals", MIN:"Twins", CWS:"White Sox", CLE:"Guardians", DET:"Tigers",
  MIL:"Brewers", CHC:"Cubs", CIN:"Reds", PIT:"Pirates", STL:"Cardinals",
  NYY:"Yankees", BOS:"Red Sox", TB:"Rays", BAL:"Orioles", TOR:"Blue Jays",
  PHI:"Phillies", NYM:"Mets", ATL:"Braves", MIA:"Marlins", WSH:"Nationals",
};

function getAbbr(fullName) {
  return TEAM_ABBR[fullName] || fullName.slice(0, 3).toUpperCase();
}
function getColor(fullName) {
  const abbr = getAbbr(fullName);
  return TEAM_COLORS[abbr] || "#334155";
}

// 오늘 날짜 (PST 기준)
const TODAY_DATE = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
const TODAY_DISPLAY = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function ScoreBar({ pct, color }) {
  return (
    <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "#fff", borderRadius: 99 }} />
    </div>
  );
}

function ScorecardRow({ label, score }) {
  const pct = Math.min(100, Math.max(0, score || 50));
  const color = pct >= 65 ? "#22c55e" : pct >= 55 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", width: 60, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 5, borderRadius: 99, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, width: 28, textAlign: "right" }}>{pct.toFixed(0)}</span>
    </div>
  );
}

export default function Hero() {
  const { games, loading } = usePredictions(TODAY_DATE);

  // 가장 높은 신뢰도 픽 선택 (TBD 제외, 승률 가장 높은 게임)
  const topGame = React.useMemo(() => {
    if (!games || games.length === 0) return null;
    const valid = games.filter(g => g.win_prob && !g.sp_tbd?.any);
    if (valid.length === 0) return games[0];
    // consensus 우선, 없으면 승률 최고
    const consensus = valid.find(g => g.consensus === true);
    if (consensus) return consensus;
    return valid.reduce((best, g) => {
      const bMax = Math.max(best.win_prob.away, best.win_prob.home);
      const gMax = Math.max(g.win_prob.away, g.win_prob.home);
      return gMax > bMax ? g : best;
    }, valid[0]);
  }, [games]);

  if (loading) {
    return (
      <section style={{ background: "#fff", borderBottom: "1px solid var(--color-border)", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--color-muted)", fontSize: 14 }}>Loading today's top pick…</span>
      </section>
    );
  }

  if (!topGame) {
    return (
      <section style={{ background: "#fff", borderBottom: "1px solid var(--color-border)", padding: "40px 32px", textAlign: "center" }}>
        <span style={{ color: "var(--color-muted)", fontSize: 14 }}>No games scheduled for today.</span>
      </section>
    );
  }

  const awayAbbr = getAbbr(topGame.away);
  const homeAbbr = getAbbr(topGame.home);
  const awayColor = getColor(topGame.away);
  const homeColor = getColor(topGame.home);
  const awayPct = topGame.win_prob?.away ?? 50;
  const homePct = topGame.win_prob?.home ?? 50;
  const pickIsHome = homePct >= awayPct;
  const pickAbbr = pickIsHome ? homeAbbr : awayAbbr;
  const pickPct = pickIsHome ? homePct : awayPct;
  const pickColor = pickIsHome ? homeColor : awayColor;

  // SP 정보
  const awaySP = topGame.away_sp;
  const homeSP = topGame.home_sp;
  const spName = awaySP?.name || "TBD";
  const spEra  = awaySP?.era != null ? awaySP.era.toFixed(2) : "--";
  const hpName = homeSP?.name || "TBD";
  const hpEra  = homeSP?.era != null ? homeSP.era.toFixed(2) : "--";

  // 스코어카드 점수
  const sc = topGame.scorecard_score;

  // 레코드
  const awayWins = topGame.away_standing?.wins ?? "--";
  const awayLoss = topGame.away_standing?.losses ?? "--";
  const homeWins = topGame.home_standing?.wins ?? "--";
  const homeLoss = topGame.home_standing?.losses ?? "--";

  return (
    <section style={{ background: "#fff", borderBottom: "1px solid var(--color-border)", overflow: "hidden" }}>

      {/* ── Header row ── */}
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "28px 32px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#fff", borderRadius: "var(--radius-full)",
            padding: "4px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px",
            textTransform: "uppercase", boxShadow: "0 2px 10px rgba(245,158,11,0.35)",
          }}>
            ⭐ Today's High Confidence Pick
          </span>
          <span className="t-caption" style={{ color: "var(--color-muted)" }}>{TODAY_DISPLAY}</span>
        </div>
        <span className="t-caption" style={{ color: "var(--color-muted)" }}>
          {topGame.game_time || ""} · {awayAbbr} @ {homeAbbr}
        </span>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "24px 32px 32px", display: "flex", gap: 24, alignItems: "stretch" }}>

        {/* LEFT: Matchup block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Team names */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            {/* Away */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900,
                fontSize: 56, lineHeight: 1, letterSpacing: "-3px",
                color: awayColor,
              }}>{awayAbbr}</div>
              <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 4 }}>
                {TEAM_CITY[awayAbbr] || ""} {TEAM_NICKNAME[awayAbbr] || ""}
              </div>
              <div style={{ fontSize: 11, color: "var(--color-subtle)", marginTop: 2 }}>{awayWins}-{awayLoss}</div>
            </div>
            {/* VS */}
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, color: "var(--color-border)", flexShrink: 0 }}>@</div>
            {/* Home */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900,
                fontSize: 56, lineHeight: 1, letterSpacing: "-3px",
                color: homeColor,
              }}>{homeAbbr}</div>
              <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 4 }}>
                {TEAM_CITY[homeAbbr] || ""} {TEAM_NICKNAME[homeAbbr] || ""}
              </div>
              <div style={{ fontSize: 11, color: "var(--color-subtle)", marginTop: 2 }}>{homeWins}-{homeLoss}</div>
            </div>
          </div>

          {/* Probability bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: awayColor }}>{awayAbbr} {awayPct.toFixed(0)}%</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: homeColor }}>{homeAbbr} {homePct.toFixed(0)}%</span>
            </div>
            <div style={{ height: 10, borderRadius: 99, background: `${homeColor}22`, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${awayPct}%`, background: awayColor, borderRadius: 99 }} />
            </div>
          </div>

          {/* SP info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Away SP", name: spName, era: spEra, color: awayColor },
              { label: "Home SP", name: hpName, era: hpEra, color: homeColor },
            ].map((sp, i) => (
              <div key={i} style={{ background: "var(--color-canvas-muted)", borderRadius: 12, padding: "10px 14px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "var(--color-subtle)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>{sp.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: sp.color, marginBottom: 2 }}>{sp.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-muted)" }}>ERA {sp.era}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Prediction card */}
        <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Pick card */}
          <div style={{
            background: pickColor, borderRadius: 20, padding: "22px 24px",
            boxShadow: `0 12px 36px ${pickColor}35`, flex: 1,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8 }}>
              Model Prediction
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1, color: "#fff", letterSpacing: "-3px", marginBottom: 4 }}>
              {pickAbbr}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "rgba(255,255,255,0.85)", lineHeight: 1, marginBottom: 16 }}>
              {pickPct.toFixed(0)}%
            </div>
            <ScoreBar pct={pickPct} color={pickColor} />
            <div style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
              {awayAbbr} @ {homeAbbr}
            </div>

            {/* Scorecard breakdown */}
            {sc && (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Scorecard</div>
                {[
                  { label: "SP Score",  score: pickIsHome ? sc.home_sp  : sc.away_sp  },
                  { label: "Bullpen",   score: pickIsHome ? sc.home_bp  : sc.away_bp  },
                  { label: "Batting",   score: pickIsHome ? sc.home_bat : sc.away_bat },
                  { label: "Situation", score: pickIsHome ? sc.home_sit : sc.away_sit },
                ].map(r => <ScorecardRow key={r.label} label={r.label} score={r.score} />)}
              </div>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {topGame.consensus === true && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: "#dcfce7", color: "#166534" }}>✅ Consensus</span>
            )}
            {topGame.sp_tbd?.any && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: "#fef3c7", color: "#92400e" }}>⚠️ SP TBD</span>
            )}
            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: "var(--color-canvas-muted)", color: "var(--color-muted)", border: "1px solid var(--color-border)" }}>
              Data-Driven
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
