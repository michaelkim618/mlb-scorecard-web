import React, { useState } from "react";
import { COMMUNITY } from "../data/mlbData";

export default function Community() {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState({});

  return (
    <section id="community" style={{ background: "var(--color-canvas-muted)", padding: "56px 0", scrollMarginTop: "var(--nav-height)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Community</h2>
            <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>오늘의 픽에 대한 의견을 남겨주세요</p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--color-canvas)", borderRadius: "var(--radius-full)",
            padding: "5px 14px", border: "1px solid var(--color-border)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A" }} />
            <span className="t-caption-strong" style={{ color: "var(--color-ink)" }}>
              {COMMUNITY.length} fans online
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>

          {/* Comments feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Compose */}
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "16px", border: "1px solid var(--color-border)",
            }}>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="오늘 경기에 대한 의견을 남겨주세요..."
                style={{
                  width: "100%", border: "none", outline: "none", resize: "none",
                  fontFamily: "var(--font-text)", fontSize: 14, lineHeight: 1.5,
                  color: "var(--color-body)", background: "transparent",
                  minHeight: 70,
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, gap: 8 }}>
                <span className="t-micro" style={{ color: "var(--color-subtle)", alignSelf: "center" }}>
                  로그인 후 댓글 작성 가능합니다
                </span>
                <button style={{
                  background: "var(--color-primary)", color: "#fff",
                  borderRadius: "var(--radius-full)", padding: "7px 18px",
                  fontSize: 13, fontWeight: 600, opacity: comment ? 1 : 0.5,
                  cursor: comment ? "pointer" : "default",
                }}>
                  Post
                </button>
              </div>
            </div>

            {/* Comments */}
            {COMMUNITY.map((c, i) => (
              <div key={i} style={{
                background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
                padding: "16px 18px", border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                    background: c.color, display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                  }}>
                    {c.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="t-caption-strong" style={{ color: "var(--color-ink)" }}>{c.user}</span>
                  </div>
                  <span className="t-micro" style={{ color: "var(--color-subtle)" }}>{c.time}</span>
                </div>
                <p className="t-body" style={{ color: "var(--color-body)", lineHeight: 1.55, fontSize: 14 }}>{c.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
                  <button
                    onClick={() => setLiked(prev => ({ ...prev, [i]: !prev[i] }))}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      color: liked[i] ? "var(--color-primary)" : "var(--color-muted)",
                      fontSize: 13, fontWeight: liked[i] ? 600 : 400,
                      transition: "color 0.15s",
                    }}
                  >
                    {liked[i] ? "❤️" : "🤍"} {c.likes + (liked[i] ? 1 : 0)}
                  </button>
                  <button style={{ color: "var(--color-muted)", fontSize: 13 }}>Reply</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Login + Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Login card */}
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "22px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <h3 className="t-headline" style={{ color: "var(--color-ink)", marginBottom: 6 }}>
                커뮤니티 참여하기
              </h3>
              <p className="t-caption" style={{ color: "var(--color-muted)", marginBottom: 18 }}>
                로그인하고 의견을 공유하세요
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button style={{
                  width: "100%", padding: "10px", borderRadius: "var(--radius-md)",
                  background: "#1877F2", color: "#fff", fontWeight: 600, fontSize: 14,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <span style={{ fontSize: 16 }}>𝕏</span> Twitter로 로그인
                </button>
                <button style={{
                  width: "100%", padding: "10px", borderRadius: "var(--radius-md)",
                  background: "var(--color-canvas-muted)", color: "var(--color-ink)",
                  fontWeight: 600, fontSize: 14, border: "1px solid var(--color-border)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <span>G</span> Google로 로그인
                </button>
              </div>
            </div>

            {/* Today's poll */}
            <div style={{
              background: "var(--color-canvas)", borderRadius: "var(--radius-lg)",
              padding: "22px", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div className="t-label" style={{ color: "var(--color-muted)", marginBottom: 14 }}>📊 Today's Poll</div>
              <p className="t-body-strong" style={{ color: "var(--color-ink)", marginBottom: 16, lineHeight: 1.4 }}>
                오늘 BOS vs CWS, 누가 이길까요?
              </p>
              {[
                { team: "BOS Red Sox", pct: 78, color: "#BD3039" },
                { team: "CWS White Sox", pct: 22, color: "#27251F" },
              ].map((opt, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span className="t-caption" style={{ color: "var(--color-ink)" }}>{opt.team}</span>
                    <span className="t-caption-strong" style={{ color: opt.color }}>{opt.pct}%</span>
                  </div>
                  <div style={{ height: 7, borderRadius: "var(--radius-full)", background: "var(--color-border)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${opt.pct}%`, background: opt.color, borderRadius: "var(--radius-full)" }} />
                  </div>
                </div>
              ))}
              <div className="t-micro" style={{ color: "var(--color-subtle)", marginTop: 12 }}>
                247명 투표 · 6시간 남음
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
