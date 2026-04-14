import React, { useState } from "react";

export default function SplashScreen({ onDismiss }) {
  const [fading, setFading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleDismiss = () => {
    setFading(true);
    setTimeout(() => onDismiss?.(), 700);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f8faff",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── TOP-LEFT blue band ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "380px", height: "260px",
        background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 60%, transparent 100%)",
        borderRadius: "0 0 100% 0",
        opacity: 0.92,
      }} />

      {/* ── BOTTOM-RIGHT blue band ── */}
      <div style={{
        position: "absolute",
        bottom: 0, right: 0,
        width: "320px", height: "220px",
        background: "linear-gradient(315deg, #4338ca 0%, #6366f1 60%, transparent 100%)",
        borderRadius: "100% 0 0 0",
        opacity: 0.85,
      }} />

      {/* ── Thin decorative indigo vertical strip — left ── */}
      <div style={{
        position: "absolute",
        left: "56px", top: "50%",
        transform: "translateY(-50%)",
        width: "3px", height: "140px",
        background: "linear-gradient(180deg, transparent, #6366f1, transparent)",
        borderRadius: "2px",
        opacity: 0.4,
      }} />

      {/* ── Thin decorative indigo vertical strip — right ── */}
      <div style={{
        position: "absolute",
        right: "56px", top: "50%",
        transform: "translateY(-50%)",
        width: "3px", height: "140px",
        background: "linear-gradient(180deg, transparent, #6366f1, transparent)",
        borderRadius: "2px",
        opacity: 0.4,
      }} />

      {/* ── Small floating indigo squares ── */}
      {[
        { top: "18%", left: "12%", size: 10, opacity: 0.18 },
        { top: "75%", left: "8%",  size: 6,  opacity: 0.14 },
        { top: "22%", right: "10%", size: 8, opacity: 0.18 },
        { top: "68%", right: "14%", size: 12, opacity: 0.12 },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          top: s.top, left: s.left, right: s.right,
          width: `${s.size}px`, height: `${s.size}px`,
          background: "#4f46e5",
          borderRadius: "3px",
          opacity: s.opacity,
          transform: "rotate(20deg)",
        }} />
      ))}

      {/* ── Horizontal dashed rule — left of content ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "10%",
        width: "14%", height: "1px",
        background: "repeating-linear-gradient(90deg, #6366f1 0, #6366f1 4px, transparent 4px, transparent 10px)",
        opacity: 0.25,
      }} />
      <div style={{
        position: "absolute",
        top: "50%", right: "10%",
        width: "14%", height: "1px",
        background: "repeating-linear-gradient(90deg, #6366f1 0, #6366f1 4px, transparent 4px, transparent 10px)",
        opacity: 0.25,
      }} />

      {/* ── Main content ── */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        maxWidth: "500px",
        padding: "0 32px",
      }}>

        {/* Overline */}
        <p style={{
          fontSize: "0.65rem",
          fontWeight: "700",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#6366f1",
          margin: "0 0 18px 0",
        }}>
          Quality Management System
        </p>

        {/* QMS */}
        <h1 style={{
          fontSize: "clamp(5rem, 12vw, 8rem)",
          fontWeight: "900",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "#1e1b4b",
          margin: "0 0 16px 0",
        }}>
          QMS
        </h1>

        {/* Indigo underline */}
        <div style={{
          width: "48px", height: "3px",
          background: "linear-gradient(90deg, #4f46e5, #818cf8)",
          borderRadius: "2px",
          margin: "0 0 22px 0",
        }} />

        {/* Description */}
        <p style={{
          fontSize: "0.9375rem",
          lineHeight: "1.8",
          color: "#475569",
          margin: "0 0 40px 0",
          fontWeight: "400",
        }}>
          A structured platform for document control, audit governance,
          and compliance — built around the way organizations actually work.
        </p>

        {/* Enter button */}
        <button
          onClick={handleDismiss}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 28px",
            borderRadius: "10px",
            background: hovered ? "#4f46e5" : "#ffffff",
            border: "1.5px solid #4f46e5",
            color: hovered ? "#ffffff" : "#4f46e5",
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.18s ease",
            outline: "none",
            boxShadow: hovered
              ? "0 4px 20px rgba(79,70,229,0.3)"
              : "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Enter QMS
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Version */}
        <p style={{
          marginTop: "20px",
          fontSize: "0.65rem",
          color: "#cbd5e1",
          letterSpacing: "0.1em",
          fontWeight: "500",
        }}>
          v1.0 · ALPHA · INTERNAL REVIEW
        </p>
      </div>
    </div>
  );
}
