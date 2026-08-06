import React, { useState } from "react";
import { TEAM_COLORS } from "../data/mlbData";

// Full team name → abbreviation
const NAME_TO_ABBR = {
  "Arizona Diamondbacks": "ARI", "Atlanta Braves": "ATL",
  "Baltimore Orioles": "BAL", "Boston Red Sox": "BOS",
  "Chicago Cubs": "CHC", "Chicago White Sox": "CWS",
  "Cincinnati Reds": "CIN", "Cleveland Guardians": "CLE",
  "Colorado Rockies": "COL", "Detroit Tigers": "DET",
  "Houston Astros": "HOU", "Kansas City Royals": "KC",
  "Los Angeles Angels": "LAA", "Los Angeles Dodgers": "LAD",
  "Miami Marlins": "MIA", "Milwaukee Brewers": "MIL",
  "Minnesota Twins": "MIN", "New York Mets": "NYM",
  "New York Yankees": "NYY", "Athletics": "OAK",
  "Philadelphia Phillies": "PHI", "Pittsburgh Pirates": "PIT",
  "San Diego Padres": "SD", "San Francisco Giants": "SF",
  "Seattle Mariners": "SEA", "St. Louis Cardinals": "STL",
  "Tampa Bay Rays": "TB", "Texas Rangers": "TEX",
  "Toronto Blue Jays": "TOR", "Washington Nationals": "WSH",
};

const TEAM_COLOR = (name) => TEAM_COLORS[NAME_TO_ABBR[name] || name] || "#64748B";
const ABBR       = (name) => NAME_TO_ABBR[name] || (name?.slice(0, 3).toUpperCase()) || "—";

// ── FormDots ─────────────────────────────────────────────────
function FormDots({ form }) {
  if (!form?.games) return null;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {form.games.map((r, i) => {
        const result = typeof r === "object" ? r.result : r;
        const isWin  = result === "W";
        return (
          <div key={i} style={{
            width: 12, height: 12, borderRadius: "50%", fontSize: 7, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            background: isWin ? "var(--color-win)" : "var(--color-loss)",
          }}>{result}</div>
        );
      })}
    </div>
  );
}

// ── ScoreBar (horizontal bar) ─────────────────────────────────
function ScoreBar({ label, value, color }) {
  const pct = Math.min(100, Math.round(value || 0));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
      <div style={{ width: 56, fontSize: 10, color: "var(--color-muted)", flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 5, borderRadius: 99, background: "var(--color-border)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
      </div>
      <div style={{ width: 26, fontSize: 11, fontWeight: 700, color: "var(--color-ink)", textAlign: "right" }}>{pct}</div>
    </div>
  );
}

// ── Trend badge ───────────────────────────────────────────────
function TrendBadge({ spd }) {
  if (!spd) return null;
  const trend = (spd.trend || "").toLowerCase();
  const rest  = spd.rest_days;
  const note  = spd.rest_note;
  const conf  = spd.sample_confidence;
  const ng    = spd.n_games ?? 0;

  const trendBg    = trend === "hot" ? "#FEF3C7" : trend === "cold" ? "#EFF6FF" : "#F1F5F9";
  const trendColor = trend === "hot" ? "#92400E"  : trend === "cold" ? "#1E40AF"  : "#475569";
  const trendLabel = trend === "hot" ? "🔥 Hot"   : trend === "cold" ? "🥶 Cold"  : "➡️ Stable";

  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 5 }}>
      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: trendBg, color: trendColor }}>
        {trendLabel}
      </span>
      {note === "short_rest" && (
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: "#FFF1F2", color: "#991B1B", border: "1px solid #FCA5A5" }}>
          ⚡ Short rest {rest}d
        </span>
      )}
      {note === "extra_rest" && (
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: "#F0FDF4", color: "#166534", border: "1px solid #86EFAC" }}>
          💤 Extra rest {rest}d
        </span>
      )}
      {note == null && rest != null && (
        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99, background: "#F1F5F9", color: "#64748B" }}>
          Rest {rest}d
        </span>
      )}
      {conf != null && conf < 1.0 && (
        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99, background: "#FEFCE8", color: "#854D0E", border: "1px solid #FDE047" }}>
          📊 {ng} games
        </span>
      )}
    </div>
  );
}

// ── Batting stats block ───────────────────────────────────────
function BatStats({ bd }) {
  if (!bd) return <div style={{ fontSize: 11, color: "var(--color-muted)" }}>No batting data</div>;

  const avg  = bd.recent_avg  != null ? "." + String(Math.round(bd.recent_avg * 1000)).padStart(3, "0") : "—";
  const ops  = bd.season_ops  != null ? bd.season_ops.toFixed(3) : "—";
  const rpg  = bd.runs_per_g  != null ? bd.runs_per_g.toFixed(1) : "—";
  const hrpg = bd.hr_per_g    != null ? bd.hr_per_g.toFixed(1)   : "—";
  const exp  = bd.explosive_games ?? 0;
  const stars = exp >= 3 ? "★★★" : exp === 2 ? "★★☆" : exp === 1 ? "★☆☆" : "☆☆☆";

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px", marginBottom: 6 }}>
        {[
          { label: "AVG", value: avg },
          { label: "OPS", value: ops },
          { label: "R/G", value: rpg },
          { label: "HR/G", value: hrpg },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
            <span style={{ color: "var(--color-muted)" }}>{label}</span>
            <span style={{ fontWeight: 700, color: "var(--color-ink)" }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "var(--color-muted)" }}>
        Explosive games <span style={{ color: "#F59E0B", fontWeight: 700 }}>{stars}</span>
      </div>
    </div>
  );
}

// ── Pitcher gamelog ───────────────────────────────────────────
function PitcherGamelog({ gamelog }) {
  if (!gamelog?.length) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 5 }}>
        Last 5 Starts
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            {["Date", "Opp", "IP", "H", "ER", "BB", "K", "ERA"].map(h => (
              <th key={h} style={{ padding: "2px 3px", textAlign: h === "Date" || h === "Opp" ? "left" : "center", color: "var(--color-muted)", fontWeight: 600, fontSize: 10 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gamelog.map((g, i) => {
            const eraColor = g.era == null ? "" : g.era <= 2.0 ? "#16A34A" : g.era <= 3.5 ? "#2563EB" : g.era <= 5.5 ? "#64748B" : "#DC2626";
            return (
              <tr key={i} style={{ borderBottom: "1px solid var(--color-border)", background: g.era > 5.5 ? "rgba(220,38,38,0.04)" : "transparent" }}>
                <td style={{ padding: "3px", color: "var(--color-muted)", fontSize: 10 }}>{(g.date || "").slice(5)}</td>
                <td style={{ padding: "3px", color: "var(--color-muted)", fontSize: 10 }}>{g.opp || ""}</td>
                <td style={{ padding: "3px", textAlign: "center" }}>{g.ip}</td>
                <td style={{ padding: "3px", textAlign: "center" }}>{g.h}</td>
                <td style={{ padding: "3px", textAlign: "center" }}>{g.er}</td>
                <td style={{ padding: "3px", textAlign: "center" }}>{g.bb}</td>
                <td style={{ padding: "3px", textAlign: "center" }}>{g.so}</td>
                <td style={{ padding: "3px", textAlign: "center", fontWeight: 700, color: eraColor }}>{g.era?.toFixed(2) ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Per-team panel ────────────────────────────────────────────
function TeamPanel({ label, color, sc, pitcherName, pitcherStats, pitcherGamelog }) {
  const spd = sc?.sp_detail || {};

  const era  = pitcherStats?.era ?? spd.era?.toFixed(2) ?? "—";
  const whip = spd.whip   != null ? spd.whip.toFixed(2) : (pitcherStats?.whip ?? "—");
  const k9   = spd.k9     != null ? spd.k9.toFixed(1)  : "—";
  const ip   = spd.avg_ip != null ? spd.avg_ip.toFixed(1) : "—";
  const l3   = spd.last3_era != null ? spd.last3_era.toFixed(2) : "—";
  const wl   = (pitcherStats?.wins != null) ? `${pitcherStats.wins}W-${pitcherStats.losses}L` : "—";

  return (
    <div style={{ background: "#fff", borderRadius: "var(--radius-md)", padding: "14px", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* Team header */}
      <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>
        {label} · Starting Pitcher
      </div>

      {/* Pitcher name */}
      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-ink)", marginBottom: 4 }}>
        {pitcherName || "TBD"}
      </div>

      {/* Pitcher stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px 8px", marginBottom: 4 }}>
        {[
          { label: "ERA", value: era },
          { label: "WHIP", value: whip },
          { label: "K/9", value: k9 },
          { label: "Avg IP", value: ip },
          { label: "Last 3 ERA", value: l3 },
          { label: "Record", value: wl },
        ].map(({ label: lbl, value }) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 9, color: "var(--color-subtle)", textTransform: "uppercase", letterSpacing: "0.4px" }}>{lbl}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-ink)" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Trend badge */}
      <TrendBadge spd={spd} />

      {/* Gamelog */}
      <PitcherGamelog gamelog={pitcherGamelog} />

      {/* Divider */}
      <div style={{ height: 1, background: "var(--color-border)", margin: "10px 0" }} />

      {/* 🏏 Batting section */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            🏏 Recent Batting
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color, letterSpacing: "-0.5px" }}>
            {(sc?.bat_score ?? 0).toFixed(1)}<span style={{ fontSize: 10, fontWeight: 600, color: "var(--color-muted)", marginLeft: 2 }}>pts</span>
          </span>
        </div>
        <BatStats bd={sc?.bat_detail} />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--color-border)", margin: "10px 0" }} />

      {/* 📊 Scorecard */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
          📊 Scorecard
        </div>
        <ScoreBar label="SP"      value={sc?.sp_score}  color="#0EA5E9" />
        <ScoreBar label="Bullpen" value={sc?.bp_score}  color="#8B5CF6" />
        <ScoreBar label="Batting" value={sc?.bat_score} color="#D97706" />
        <ScoreBar label="Sit"     value={sc?.sit_score} color="#F59E0B" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "6px 8px", background: `${color}10`, borderRadius: 6 }}>
          <span style={{ fontSize: 11, color: "var(--color-muted)", fontWeight: 600 }}>Total Score</span>
          <span style={{ fontSize: 15, fontWeight: 800, color }}>{(sc?.total ?? 0).toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Live Scoreboard ───────────────────────────────────────────
function LiveScoreboard({ liveGame, awayAbbr, homeAbbr, awayColor, homeColor }) {
  if (!liveGame) return null;
  const { status, detailCode, awayScore, homeScore, currentInning, currentInningOrd, inningHalf, outs, innings } = liveGame;
  if (status === "Preview") return null;

  // 실제 진행 중 = detailCode "I" (In Progress) 이고 이닝이 1 이상
  const isLive  = status === "Live" && detailCode === "I" && (currentInning ?? 0) >= 1;
  const isFinal = status === "Final";

  // Build inning columns (1–9, or more)
  const maxInn = Math.max(9, innings.length);
  const innCols = Array.from({ length: maxInn }, (_, i) => {
    const found = innings.find(x => x.num === i + 1);
    return { num: i + 1, awayRuns: found?.awayRuns ?? null, homeRuns: found?.homeRuns ?? null };
  });

  const cellStyle = { padding: "3px 6px", textAlign: "center", fontSize: 11, minWidth: 22 };
  const headerStyle = { ...cellStyle, color: "var(--color-muted)", fontWeight: 600, fontSize: 10 };

  return (
    <div style={{
      margin: "8px 0 4px",
      background: "#fff",
      borderRadius: 10,
      padding: "10px 12px",
      border: isLive ? "1px solid #FCA5A5" : "1px solid var(--color-border)",
    }}>
      {/* Status bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {isLive && (
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "#EF4444", letterSpacing: "0.5px" }}>LIVE</span>
          </span>
        )}
        {isFinal && (
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-muted)" }}>FINAL</span>
        )}
        {isLive && currentInningOrd && (
          <span style={{ fontSize: 11, color: "var(--color-muted)" }}>
            {inningHalf} {currentInningOrd} · {outs} out{outs !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Scoreboard table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <td style={{ ...headerStyle, textAlign: "left", minWidth: 36, color: "var(--color-muted)" }}>Team</td>
              {innCols.map(c => (
                <td key={c.num} style={{ ...headerStyle, color: "var(--color-muted)" }}>{c.num}</td>
              ))}
              <td style={{ ...headerStyle, borderLeft: "1px solid var(--color-border)", fontWeight: 800, color: "var(--color-ink)" }}>R</td>
            </tr>
          </thead>
          <tbody>
            {/* Away row */}
            <tr>
              <td style={{ ...cellStyle, textAlign: "left", fontWeight: 800, color: awayColor, fontSize: 12 }}>{awayAbbr}</td>
              {innCols.map(c => (
                <td key={c.num} style={{ ...cellStyle, color: c.awayRuns != null ? "var(--color-ink)" : "var(--color-subtle)" }}>
                  {c.awayRuns ?? "·"}
                </td>
              ))}
              <td style={{ ...cellStyle, borderLeft: "1px solid var(--color-border)", fontWeight: 900, fontSize: 16, color: "var(--color-ink)" }}>{awayScore ?? "—"}</td>
            </tr>
            {/* Home row */}
            <tr>
              <td style={{ ...cellStyle, textAlign: "left", fontWeight: 800, color: homeColor, fontSize: 12 }}>{homeAbbr}</td>
              {innCols.map(c => (
                <td key={c.num} style={{ ...cellStyle, color: c.homeRuns != null ? "var(--color-ink)" : "var(--color-subtle)" }}>
                  {c.homeRuns ?? "·"}
                </td>
              ))}
              <td style={{ ...cellStyle, borderLeft: "1px solid var(--color-border)", fontWeight: 900, fontSize: 16, color: "var(--color-ink)" }}>{homeScore ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Summary Badges ────────────────────────────────────────────
function Chip({ bg, color, border, children }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 8px",
      borderRadius: 99, background: bg, color: color,
      border: `1px solid ${border || bg}`,
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

function SummaryBadges({ game, pickProb, awayColor, homeColor, awayName, homeName }) {
  const badges = [];

  // 0. Lineup confirmed
  if (game.lineup_confirmed) {
    badges.push(<Chip key="lineup" bg="#F0FDF4" color="#15803D" border="#86EFAC">✅ Lineup Confirmed</Chip>);
  }

  // 1. Market comparison (edge vs Kalshi)
  if (game.edge != null) {
    const edgeVal = parseFloat(game.edge);
    if (Math.abs(edgeVal) <= 3) {
      badges.push(<Chip key="mkt" bg="#F1F5F9" color="#475569" border="#CBD5E1">➖ Near Market</Chip>);
    } else if (edgeVal > 3) {
      badges.push(<Chip key="mkt" bg="#F0FDF4" color="#15803D" border="#86EFAC">📈 Edge +{edgeVal.toFixed(1)}%p</Chip>);
    } else {
      badges.push(<Chip key="mkt" bg="#FFF1F2" color="#B91C1C" border="#FCA5A5">📉 Edge {edgeVal.toFixed(1)}%p</Chip>);
    }
    if (game.kalshi_prob != null) {
      badges.push(<Chip key="kal" bg="#F8FAFC" color="#64748B" border="#E2E8F0">Kalshi {game.kalshi_prob?.toFixed(0)}%</Chip>);
    }
  }

  // 2. Expected score
  const exp = game.expected_score;
  if (exp && (exp.away || exp.home)) {
    const a = (exp.away || 0).toFixed(1);
    const h = (exp.home || 0).toFixed(1);
    badges.push(<Chip key="exp" bg="#F8FAFC" color="#475569" border="#E2E8F0">🎯 Proj {a}–{h}</Chip>);
  }

  // 3. Win probability strength
  if (pickProb >= 65) {
    badges.push(<Chip key="conf" bg="#FFFBEB" color="#92400E" border="#FDE68A">⭐ High Conf {pickProb}%</Chip>);
  } else if (pickProb >= 60) {
    badges.push(<Chip key="conf" bg="#EFF6FF" color="#1D4ED8" border="#BFDBFE">📊 Lean {pickProb}%</Chip>);
  }

  // 4. Pitcher trends
  const awaySPTrend = game.away_pitcher_stats?.trend;
  const homeSPTrend = game.home_pitcher_stats?.trend;
  if (awaySPTrend === "hot") {
    const sp = (game.away_pitcher || "Away SP").split(" ").pop();
    badges.push(<Chip key="asp" bg="#FEF3C7" color="#92400E" border="#FDE68A">🔥 {sp} Hot</Chip>);
  } else if (awaySPTrend === "cold") {
    const sp = (game.away_pitcher || "Away SP").split(" ").pop();
    badges.push(<Chip key="asp" bg="#EFF6FF" color="#1E40AF" border="#BFDBFE">🥶 {sp} Cold</Chip>);
  }
  if (homeSPTrend === "hot") {
    const sp = (game.home_pitcher || "Home SP").split(" ").pop();
    badges.push(<Chip key="hsp" bg="#FEF3C7" color="#92400E" border="#FDE68A">🔥 {sp} Hot</Chip>);
  } else if (homeSPTrend === "cold") {
    const sp = (game.home_pitcher || "Home SP").split(" ").pop();
    badges.push(<Chip key="hsp" bg="#EFF6FF" color="#1E40AF" border="#BFDBFE">🥶 {sp} Cold</Chip>);
  }

  // 5. Recent form streak
  const awayStreak = game.away_recent_form?.streak ?? 0;
  const homeStreak = game.home_recent_form?.streak ?? 0;
  if (awayStreak >= 3) {
    badges.push(<Chip key="aws" bg="#F0FDF4" color="#15803D" border="#86EFAC">🔥 {awayName.split(" ").pop()} {awayStreak}W streak</Chip>);
  } else if (awayStreak <= -3) {
    badges.push(<Chip key="aws" bg="#FFF1F2" color="#B91C1C" border="#FCA5A5">📉 {awayName.split(" ").pop()} {Math.abs(awayStreak)}L streak</Chip>);
  }
  if (homeStreak >= 3) {
    badges.push(<Chip key="hws" bg="#F0FDF4" color="#15803D" border="#86EFAC">🔥 {homeName.split(" ").pop()} {homeStreak}W streak</Chip>);
  } else if (homeStreak <= -3) {
    badges.push(<Chip key="hws" bg="#FFF1F2" color="#B91C1C" border="#FCA5A5">📉 {homeName.split(" ").pop()} {Math.abs(homeStreak)}L streak</Chip>);
  }

  // 6. Division leader
  const awaySt = game.away_standing;
  const homeSt = game.home_standing;
  if (awaySt?.games_back === "-") {
    badges.push(<Chip key="adl" bg={`${awayColor}12`} color={awayColor} border={`${awayColor}30`}>🏆 {awayName.split(" ").pop()} Div Leader</Chip>);
  }
  if (homeSt?.games_back === "-") {
    badges.push(<Chip key="hdl" bg={`${homeColor}12`} color={homeColor} border={`${homeColor}30`}>🏆 {homeName.split(" ").pop()} Div Leader</Chip>);
  }

  if (badges.length === 0) return null;

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 5,
      marginTop: 8, paddingTop: 8,
      borderTop: "1px solid var(--color-border)",
    }}>
      {badges}
    </div>
  );
}

// ── Main GameCard ─────────────────────────────────────────────
export default function GameCard({ game, liveGame = null, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const awayName  = game.away || "";
  const homeName  = game.home || "";
  const awayAbbr  = ABBR(awayName);
  const homeAbbr  = ABBR(homeName);
  const awayColor = TEAM_COLOR(awayName);
  const homeColor = TEAM_COLOR(homeName);

  // win_prob: nested {away, home} or decimal
  let awayProb, homeProb;
  if (game.win_prob && typeof game.win_prob === "object") {
    awayProb = Math.round(game.win_prob.away || 0);
    homeProb = Math.round(game.win_prob.home || 0);
  } else {
    awayProb = Math.round((game.win_prob || 0.5) * 100);
    homeProb = 100 - awayProb;
  }

  const modelWinner = game.model_winner || "";
  const pickIsAway  = modelWinner === awayName;
  const pickAbbr    = pickIsAway ? awayAbbr : homeAbbr;
  const pickProb    = pickIsAway ? awayProb : homeProb;
  const pickColor   = pickIsAway ? awayColor : homeColor;

  const sc  = game.scorecard || {};
  const scA = sc.away || {};
  const scH = sc.home || {};

  // Standings
  const awaySt = game.away_standing || null;
  const homeSt = game.home_standing || null;

  // Recent form
  const awayForm   = game.away_recent_form || null;
  const homeForm   = game.home_recent_form || null;
  const awayStreak = awayForm?.streak ?? 0;
  const homeStreak = homeForm?.streak ?? 0;

  const isHighConf = game.consensus === true || game.value_bet === true;
  const isDone     = game.model_correct !== null && game.model_correct !== undefined;
  const isCorrect  = game.model_correct === true;

  // Live scores
  const actual    = game.actual_score || {};
  const awayScore = actual.away;
  const homeScore = actual.home;
  const hasScore  = awayScore !== null && awayScore !== undefined;

  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", background: "#fff", boxShadow: "var(--shadow-sm)", border: `1px solid var(--color-border)`, borderLeft: `4px solid ${isHighConf ? "#F59E0B" : pickColor}` }}>

      {/* ── Collapsed row ── */}
      <div onClick={() => setOpen(o => !o)} style={{ cursor: "pointer", padding: "12px 16px" }}>

        {/* Top: team info row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12, marginBottom: 10 }}>

          {/* Away team */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${awayColor}18`, border: `1.5px solid ${awayColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: awayColor, flexShrink: 0, marginTop: 2 }}>
              {awayAbbr}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: awayColor, lineHeight: 1.2 }}>{awayName}</div>
              {awaySt && (
                <div style={{ fontSize: 10, color: "var(--color-muted)", marginTop: 2 }}>
                  {awaySt.div_name} #{awaySt.div_rank} · {awaySt.wins}W-{awaySt.losses}L
                  {awaySt.games_back !== "-" && <span> · GB {awaySt.games_back}</span>}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <FormDots form={game.away_recent_form} />
                {awayStreak !== 0 && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: awayStreak > 0 ? "var(--color-win)" : "var(--color-loss)" }}>
                    {awayStreak > 0 ? `${awayStreak}W streak` : `${Math.abs(awayStreak)}L streak`}
                  </span>
                )}
                {awayForm && (
                  <span style={{ fontSize: 9, color: "var(--color-muted)" }}>
                    L5: {awayForm.wins}W-{awayForm.losses}L
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: status + score */}
          <div style={{ textAlign: "center", minWidth: 90 }}>
            {liveGame?.status === "Live" && liveGame?.detailCode === "I" && (liveGame?.currentInning ?? 0) >= 1 ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#EF4444" }}>LIVE</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, color: "#F59E0B", letterSpacing: "-1px" }}>
                  {liveGame.awayScore ?? "—"} – {liveGame.homeScore ?? "—"}
                </div>
                <div style={{ fontSize: 10, color: "var(--color-muted)" }}>
                  {liveGame.inningHalf} {liveGame.currentInningOrd}
                </div>
              </div>
            ) : liveGame?.status === "Final" ? (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", marginBottom: 3 }}>FINAL</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, color: "var(--color-ink)", letterSpacing: "-1px" }}>
                  {liveGame.awayScore} – {liveGame.homeScore}
                </div>
              </div>
            ) : hasScore ? (
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, color: "#F59E0B", letterSpacing: "-1px" }}>
                {awayScore} – {homeScore}
              </div>
            ) : (
              <>
                <div style={{ fontSize: 10, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>@ Away</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-subtle)", background: "var(--color-canvas-muted)", borderRadius: 99, padding: "2px 10px", display: "inline-block" }}>
                  {game.status || "Scheduled"}
                </div>
              </>
            )}
          </div>

          {/* Home team */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, justifyContent: "flex-end" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: homeColor, lineHeight: 1.2 }}>{homeName}</div>
              {homeSt && (
                <div style={{ fontSize: 10, color: "var(--color-muted)", marginTop: 2 }}>
                  {homeSt.div_name} #{homeSt.div_rank} · {homeSt.wins}W-{homeSt.losses}L
                  {homeSt.games_back === "-" ? <span> · Division Leader</span> : <span> · GB {homeSt.games_back}</span>}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, justifyContent: "flex-end" }}>
                {homeForm && (
                  <span style={{ fontSize: 9, color: "var(--color-muted)" }}>
                    L5: {homeForm.wins}W-{homeForm.losses}L
                  </span>
                )}
                {homeStreak !== 0 && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: homeStreak > 0 ? "var(--color-win)" : "var(--color-loss)" }}>
                    {homeStreak > 0 ? `${homeStreak}W streak` : `${Math.abs(homeStreak)}L streak`}
                  </span>
                )}
                <FormDots form={game.home_recent_form} />
              </div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${homeColor}18`, border: `1.5px solid ${homeColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: homeColor, flexShrink: 0, marginTop: 2 }}>
              {homeAbbr}
            </div>
          </div>
        </div>

        {/* Bottom: win probability bar */}
        <div>
          <div style={{ height: 28, borderRadius: 6, overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${awayProb}%`, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10, transition: "width 0.3s" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{awayProb}%</span>
            </div>
            <div style={{ flex: 1, background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{homeProb}%</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
            <span style={{ fontSize: 10, color: "var(--color-muted)" }}>Away {awayProb}%</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: "var(--color-subtle)", textTransform: "uppercase", letterSpacing: "0.5px" }}>WIN PROBABILITY</span>
              {isDone ? (
                <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 8px", borderRadius: 99, background: isCorrect ? "var(--color-win-bg)" : "var(--color-loss-bg)", color: isCorrect ? "var(--color-win)" : "var(--color-loss)" }}>
                  {isCorrect ? "✓ Correct" : "✗ Miss"}
                </span>
              ) : isHighConf ? (
                <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 8px", borderRadius: 99, background: "#FFFBEB", color: "#92400E" }}>⭐ High Conf</span>
              ) : (
                <span style={{ fontSize: 10, color: "var(--color-subtle)" }}>Pick: <b style={{ color: pickColor }}>{pickAbbr}</b></span>
              )}
            </div>
            <span style={{ fontSize: 10, color: "var(--color-muted)" }}>Home {homeProb}%</span>
          </div>
        </div>
        {/* Live inning scoreboard */}
        {((liveGame?.status === "Live" && liveGame?.detailCode === "I" && (liveGame?.currentInning ?? 0) >= 1) || liveGame?.status === "Final") && (
          <LiveScoreboard
            liveGame={liveGame}
            awayAbbr={awayAbbr}
            homeAbbr={homeAbbr}
            awayColor={awayColor}
            homeColor={homeColor}
          />
        )}

        {/* ── Summary badge row ── */}
        <SummaryBadges game={game} pickProb={pickProb} awayColor={awayColor} homeColor={homeColor} awayName={awayName} homeName={homeName} />
      </div>

      {/* ── Expanded detail ── */}
      {open && (
        <div style={{ borderTop: "1px solid var(--color-border)", padding: "16px", background: "var(--color-canvas-alt)" }}>

          {/* Kalshi edge bar (top) */}
          {game.edge != null && (
            <div style={{ marginBottom: 12, padding: "6px 12px", background: game.edge > 0 ? "#F0FDF4" : "#FFF1F2", borderRadius: 8, fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${game.edge > 0 ? "#86EFAC" : "#FCA5A5"}` }}>
              <span style={{ color: "var(--color-muted)" }}>vs Kalshi market</span>
              <span style={{ fontWeight: 700, color: game.edge > 0 ? "var(--color-win)" : "var(--color-loss)" }}>
                {game.edge > 0 ? "+" : ""}{game.edge?.toFixed(1)}%p edge · Pick {pickAbbr}
              </span>
            </div>
          )}

          {/* Two-column team panels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <TeamPanel
              label={awayAbbr}
              color={awayColor}
              sc={scA}
              pitcherName={game.away_pitcher}
              pitcherStats={game.away_pitcher_stats}
              pitcherGamelog={game.away_pitcher_gamelog}
            />
            <TeamPanel
              label={homeAbbr}
              color={homeColor}
              sc={scH}
              pitcherName={game.home_pitcher}
              pitcherStats={game.home_pitcher_stats}
              pitcherGamelog={game.home_pitcher_gamelog}
            />
          </div>

        </div>
      )}
    </div>
  );
}
