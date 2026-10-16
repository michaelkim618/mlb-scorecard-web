import { useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import useSeasonResults from "../hooks/useSeasonResults";
import { gradedGames, tally, calibration, monthly, fmtPct } from "../lib/record";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
const th = { textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 0.6, borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap" };
const td = { padding: "10px 12px", fontSize: 14, color: "var(--color-body)", borderBottom: "1px solid var(--color-border)" };
const card = { background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflowX: "auto" };

const PAGE = 40;
const monthName = (ym) =>
  new Date(ym + "-01T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });

export default function RecordPage() {
  usePageMeta({
    title: "Track record — MLB Scorecard",
    description: "Every graded MLB Scorecard pick, hit or miss: overall record, how stated confidence compares with results, month by month, and the full game log.",
    path: "/record",
  });

  const { games, pstToday, startDate, loading } = useSeasonResults();
  const [shown, setShown] = useState(PAGE);

  const graded = gradedGames(games, pstToday);
  const overall = tally(graded);
  const bands = calibration(graded);
  const months = monthly(graded);
  const log = [...graded].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (b.game_number ?? 0) - (a.game_number ?? 0)));

  return (
    <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "var(--color-canvas-alt)" }}>
      <SiteNav />
      <main style={{ ...wrap, padding: "48px 24px 72px" }}>
        <h1 className="t-display-lg" style={{ color: "var(--color-ink)" }}>Track record</h1>
        <p className="t-body" style={{ color: "var(--color-muted)", margin: "10px 0 28px", maxWidth: 680 }}>
          Every game the model graded since {startDate ?? "the start of the season"}, wins and losses alike.
          Games from today are left out until they are final.
        </p>

        {loading ? (
          <p className="t-caption" style={{ color: "var(--color-muted)" }}>Loading the record…</p>
        ) : graded.length === 0 ? (
          <p className="t-body" style={{ color: "var(--color-muted)" }}>No graded games yet.</p>
        ) : (
          <>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
              {[
                ["Record", `${overall.wins}–${overall.losses}`],
                ["Hit rate", fmtPct(overall.pct)],
                ["Games graded", String(overall.games)],
              ].map(([label, value]) => (
                <div key={label} style={{ ...card, padding: "18px 22px", flex: "1 1 160px", overflow: "visible" }}>
                  <div className="t-label" style={{ color: "var(--color-muted)" }}>{label}</div>
                  <div className="t-display-md" style={{ color: "var(--color-ink)", marginTop: 4 }}>{value}</div>
                </div>
              ))}
            </div>

            <h2 className="t-headline" style={{ color: "var(--color-ink)", marginBottom: 6 }}>Does stated confidence match results?</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginBottom: 12, maxWidth: 680 }}>
              A pick listed at 60% should win about 60% of the time. “Stated” is the average probability we
              gave; “Actual” is how often those picks won. Small bands move a lot on a few games, so read the
              game count too.
            </p>
            <div style={{ ...card, marginBottom: 36 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                <thead><tr><th style={th}>Confidence</th><th style={th}>Games</th><th style={th}>Stated</th><th style={th}>Actual</th></tr></thead>
                <tbody>
                  {bands.map((b) => (
                    <tr key={b.label}>
                      <td style={td}>{b.label}</td><td style={td}>{b.games}</td>
                      <td style={td}>{fmtPct(b.avgStated)}</td><td style={td}>{fmtPct(b.hitRate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="t-headline" style={{ color: "var(--color-ink)", marginBottom: 12 }}>Month by month</h2>
            <div style={{ ...card, marginBottom: 36 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
                <thead><tr><th style={th}>Month</th><th style={th}>Record</th><th style={th}>Hit rate</th></tr></thead>
                <tbody>
                  {months.map((m) => (
                    <tr key={m.month}>
                      <td style={td}>{monthName(m.month)}</td><td style={td}>{m.wins}–{m.losses}</td><td style={td}>{fmtPct(m.pct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="t-headline" style={{ color: "var(--color-ink)", marginBottom: 12 }}>Every game</h2>
            <div style={card}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                <thead><tr><th style={th}>Date</th><th style={th}>Game</th><th style={th}>Pick</th><th style={th}>Score</th><th style={th}>Result</th></tr></thead>
                <tbody>
                  {log.slice(0, shown).map((g, i) => (
                    <tr key={`${g.date}-${g.away}-${g.home}-${g.game_number ?? i}`}>
                      <td style={{ ...td, whiteSpace: "nowrap" }}>{g.date}</td>
                      <td style={td}>{g.away} @ {g.home}</td>
                      <td style={td}>{g.pick} <span style={{ color: "var(--color-muted)" }}>({Math.round(g.pick_prob)}%)</span></td>
                      <td style={{ ...td, whiteSpace: "nowrap" }}>{g.away_score != null ? `${g.away_score}–${g.home_score}` : "—"}</td>
                      <td style={{ ...td, fontWeight: 700, color: g.correct ? "var(--color-win)" : "var(--color-loss)" }}>{g.correct ? "Hit" : "Miss"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {shown < log.length && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <button onClick={() => setShown((n) => n + PAGE)} className="t-body-strong" style={{
                  background: "#fff", border: "1px solid var(--color-border-strong)", borderRadius: 999,
                  padding: "10px 22px", cursor: "pointer", color: "var(--color-ink)",
                }}>
                  Show more ({log.length - shown} older)
                </button>
              </div>
            )}
          </>
        )}

        <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 32, maxWidth: 680 }}>
          For information and entertainment only — not betting or financial advice. Past results do not
          guarantee future ones. <Link to="/privacy" style={{ color: "var(--color-primary)" }}>Privacy</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
