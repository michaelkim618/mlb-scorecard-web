import React, { useState, useEffect } from "react";
import useNews from "../hooks/useNews";

// ── 뉴스 모달 ─────────────────────────────────────────────────────────────────
function NewsModal({ article, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!article) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20,
          maxWidth: 620, width: "100%",
          maxHeight: "85vh", overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        }}
      >
        {/* 이미지 */}
        {article.image && (
          <div style={{ position: "relative" }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: "20px 20px 0 0", display: "block" }}
              onError={e => { e.target.parentElement.style.display = "none"; }}
            />
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 14, right: 14,
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(0,0,0,0.5)", border: "none",
                color: "#fff", fontSize: 20, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                lineHeight: 1,
              }}
            >×</button>
          </div>
        )}

        <div style={{ padding: "24px 28px 28px" }}>
          {/* 닫기 버튼 - 이미지 없을 때 */}
          {!article.image && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <button
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "var(--color-canvas-muted)", border: "1px solid var(--color-border)",
                  color: "var(--color-muted)", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >×</button>
            </div>
          )}

          {/* 태그 + 소스 + 시간 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px",
              borderRadius: 99, color: article.tag_color,
              background: `${article.tag_color}18`,
              textTransform: "uppercase", letterSpacing: "0.5px",
            }}>
              {article.tag}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px",
              borderRadius: 99, color: article.source_color,
              background: `${article.source_color}15`,
            }}>
              {article.source}
            </span>
            <span style={{ fontSize: 11, color: "var(--color-muted)", marginLeft: "auto" }}>
              {article.time_ago}
            </span>
          </div>

          {/* 제목 */}
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-ink)", lineHeight: 1.3, marginBottom: 12, letterSpacing: "-0.3px" }}>
            {article.title}
          </h2>

          {/* 저자 */}
          {article.author && (
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 16 }}>
              By {article.author}
            </div>
          )}

          {/* 요약 */}
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--color-ink)", marginBottom: 24 }}>
            {article.summary}
          </p>

          {/* 전체 기사 버튼 */}
          <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "var(--color-primary)", color: "#fff",
              borderRadius: 12, padding: "13px 24px",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Read Full Article on {article.source} →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── 뉴스 카드 ─────────────────────────────────────────────────────────────────
function NewsCard({ article, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 썸네일 */}
      {article.image ? (
        <div style={{ height: 140, overflow: "hidden", flexShrink: 0 }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.3s",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            onError={e => { e.target.parentElement.style.display = "none"; }}
          />
        </div>
      ) : (
        <div style={{
          height: 90, flexShrink: 0,
          background: `linear-gradient(135deg, ${article.tag_color}22, ${article.tag_color}08)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32,
        }}>⚾</div>
      )}

      {/* 내용 */}
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* 태그 + 시간 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "2px 8px",
            borderRadius: 99, color: article.tag_color,
            background: `${article.tag_color}18`,
            textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            {article.tag}
          </span>
          <span style={{ fontSize: 10, color: "var(--color-subtle)" }}>{article.time_ago}</span>
        </div>

        {/* 제목 */}
        <h3 style={{
          fontSize: 13, fontWeight: 700, lineHeight: 1.4,
          color: "var(--color-ink)", marginBottom: 8, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {article.title}
        </h3>

        {/* 소스 + Read more */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: article.source_color,
            padding: "1px 7px", borderRadius: 99,
            background: `${article.source_color}12`,
          }}>
            {article.source}
          </span>
          <span style={{ fontSize: 10, color: "var(--color-subtle)", marginLeft: "auto" }}>
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
export default function News() {
  const { news, updatedAt, loading } = useNews();
  const [selected, setSelected] = useState(null);

  const updatedStr = updatedAt
    ? new Date(updatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <>
      <section id="news" style={{
        background: "var(--color-canvas-muted)",
        padding: "56px 0",
        borderTop: "1px solid var(--color-border)",
        scrollMarginTop: "var(--nav-height)",
      }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>

          {/* 헤더 */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h2 className="t-display-md" style={{ color: "var(--color-ink)" }}>Around the League</h2>
              <p className="t-caption" style={{ color: "var(--color-muted)", marginTop: 4 }}>
                Top stories today · Click any card to read more
                {updatedStr && (
                  <span style={{ marginLeft: 8, color: "var(--color-subtle)" }}>· Updated {updatedStr}</span>
                )}
              </p>
            </div>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>MLB.com · ESPN</span>
          </div>

          {/* 로딩 */}
          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
              Loading news…
            </div>
          )}

          {/* 4×2 그리드 */}
          {!loading && news.length > 0 && (
            <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {news.map((article, i) => (
                <NewsCard key={i} article={article} onClick={() => setSelected(article)} />
              ))}
            </div>
          )}

          {!loading && news.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-muted)" }}>
              No news available right now.
            </div>
          )}
        </div>
      </section>

      {/* 모달 팝업 */}
      {selected && (
        <NewsModal article={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
