import React from "react";
import { TOP_PICK, TODAY } from "../data/mlbData";

// 배경 제거된 로컬 투명 PNG (fetch_pitcher_photos.py 생성)
const MLB_PHOTO = (id) => id ? `/assets/players/${id}.png` : null;

function StatCard({ label, value, frac, bg, big }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 20,
      padding: big ? "20px 28px 22px" : "16px 22px 18px",
      width: big ? 210 : 180,
      transform: big ? "translateY(-24px)" : undefined,
      boxShadow: big ? "0 16px 48px rgba(0,0,0,0.22)" : "0 10px 28px rgba(0,0,0,0.16)",
      flexShrink: 0,
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? 64 : 52, lineHeight: 1, color: "#fff", letterSpacing: "-2px" }}>
          {value}
        </span>
        {frac && (
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: big ? 28 : 24, lineHeight: 1, color: "rgba(255,255,255,0.6)", marginTop: big ? 6 : 4 }}>
            {frac}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const t = TOP_PICK;
  const c = t.away.color; // BOS red

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
          <span className="t-caption" style={{ color: "var(--color-muted)" }}>{TODAY}</span>
        </div>
        <span className="t-caption" style={{ color: "var(--color-muted)" }}>
          {t.gameTime} · {t.network}
        </span>
      </div>

      {/* ── Stage ── */}
      <div style={{ position: "relative", height: 520, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 32px" }}>

        {/* Huge faded wordmark */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: 24,
          textAlign: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: 200, lineHeight: 0.85, letterSpacing: "-10px",
            color: c, opacity: 0.07, whiteSpace: "nowrap",
            textShadow: "0 4px 8px rgba(0,0,0,0.05)",
            userSelect: "none",
          }}>
            {t.away.name.toUpperCase()}
          </span>
        </div>

        {/* Player photo — center */}
        <div style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          bottom: 0, zIndex: 1, pointerEvents: "none",
          width: 380,
        }}>
          {/* Glow halo behind player */}
          <div style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            width: 320, height: 320, borderRadius: "50%",
            background: `radial-gradient(circle, ${c}22 0%, transparent 70%)`,
            filter: "blur(32px)",
          }} />
          {/* Photo with bottom fade */}
          <div style={{ position: "relative" }}>
            <img
              src={MLB_PHOTO(t.awayPitcher.player_id)}
              alt={t.awayPitcher.name}
              style={{
                width: "100%", height: 460,
                objectFit: "cover", objectPosition: "top center",
                borderRadius: "28px 28px 0 0",
                display: "block",
              }}
              onError={e => {
                // fallback: headshot
                e.target.src = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_640,q_auto:best/v1/people/680757/headshot/67/current`;
              }}
            />
            {/* Bottom gradient fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
              background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)",
              borderRadius: "0 0 0 0",
            }} />
          </div>
        </div>

        {/* ── LEFT PANEL: Pitcher info ── */}
        <div style={{ position: "absolute", left: 32, top: 36, width: 280, zIndex: 2 }}>
          {/* Team dot + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }} />
            <span className="t-caption-strong" style={{ color: c }}>{t.away.city} {t.away.name}</span>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>{t.away.rec}</span>
          </div>

          {/* Jersey number */}
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: 120, lineHeight: 0.85, letterSpacing: "-6px", color: c,
            marginBottom: 10,
          }}>
            17
          </div>

          {/* Name */}
          <div style={{ marginBottom: 14 }}>
            <div className="t-display-lg" style={{ color: "var(--color-ink)", lineHeight: 1.05 }}>
              {t.awayPitcher.name.split(" ")[0]}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, lineHeight: 1.0, color: "var(--color-ink)", letterSpacing: "-1px" }}>
              {t.awayPitcher.name.split(" ").slice(1).join(" ")}
            </div>
          </div>

          {/* Position pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-full)",
          }}>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>SP · Starting Pitcher</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "2px 8px",
              background: "#FEF3C7", color: "#92400E", borderRadius: "var(--radius-full)",
            }}>
              🔥 HOT
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL: Matchup + Prediction ── */}
        <div style={{ position: "absolute", right: 32, top: 36, width: 272, zIndex: 2 }}>
          {/* Matchup facts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[
              { label: "Game Time", value: t.gameTime.split(" ")[0], sub: t.gameTime.split(" ").slice(1).join(" ") },
              { label: "Network", value: t.network },
              { label: "Opponent", value: t.home.abbr, sub: t.home.city, color: t.home.color },
              { label: "Season", value: t.away.rec },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "var(--color-subtle)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>
                  {f.label}
                </div>
                <div className="t-caption-strong" style={{ color: f.color || "var(--color-ink)" }}>{f.value}</div>
                {f.sub && <div className="t-micro" style={{ color: "var(--color-muted)" }}>{f.sub}</div>}
              </div>
            ))}
          </div>

          {/* Prediction card */}
          <div style={{
            background: c, borderRadius: 18, padding: "18px 20px",
            boxShadow: `0 12px 36px ${c}35`,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>
              Model Prediction
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1 }}>
                {t.awayProb}%
              </span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 20 }}>–</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "rgba(255,255,255,0.45)", lineHeight: 1 }}>
                {t.homeProb}%
              </span>
              <span className="t-micro" style={{ color: "rgba(255,255,255,0.5)", marginLeft: "auto" }}>
                {t.away.abbr} @ {t.home.abbr}
              </span>
            </div>
            {/* Bar */}
            <div style={{ height: 7, borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.2)", overflow: "hidden", marginBottom: 10 }}>
              <div style={{ height: "100%", width: `${t.awayProb}%`, background: "#fff", borderRadius: "var(--radius-full)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Pick: {t.pick}</span>
              <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>+{t.edge}%p edge</span>
            </div>
          </div>

          {/* Home pitcher */}
          <div style={{
            marginTop: 14, background: "var(--color-canvas-muted)",
            borderRadius: 12, padding: "12px 14px",
            border: "1px solid var(--color-border)",
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--color-subtle)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>
              vs · Home SP
            </div>
            <div className="t-caption-strong" style={{ color: t.home.color, marginBottom: 4 }}>{t.homePitcher.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="t-caption" style={{ color: "var(--color-muted)" }}>ERA {t.homePitcher.era}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 7px",
                borderRadius: "var(--radius-full)",
                background: "#FEE2E2", color: "#991B1B",
              }}>
                ❄️ COLD
              </span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Stat cards ── */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "flex-end", gap: 16, zIndex: 3,
        }}>
          <StatCard label="ERA · Season" value="2" frac=".85" bg={`${c}cc`} />
          <StatCard label="K's · Season" value="156" bg={c} big />
          <StatCard label="WHIP" value="1" frac=".02" bg={`${c}cc`} />
        </div>

      </div>
    </section>
  );
}
