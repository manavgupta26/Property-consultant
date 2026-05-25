import { BROKER } from "../data/properties";

const TOKEN = {
  cream: "#F7F3EE", stone: "#E8E0D5", warmGray: "#9C9189",
  charcoal: "#1C1917", ink: "#2D2926", gold: "#C9A84C", goldLight: "#E8C96A", white: "#FFFFFF",
};

export default function Header({ onListProperty }) {
  return (
    <header style={{
      background: TOKEN.charcoal,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "sticky", top: 0, zIndex: 200,
      boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 16,
      }}>
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 300, color: TOKEN.white, lineHeight: 1,
          }}>Ludhiana Properties</div>
          <div style={{ fontSize: 11, color: TOKEN.warmGray, letterSpacing: 1, marginTop: 2 }}>
            by {BROKER.name} · Property Broker
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href={`tel:${BROKER.phone}`} style={{
            display: "flex", alignItems: "center", gap: 6,
            color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 400,
            textDecoration: "none", padding: "6px 14px",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100,
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
          }}>📞 {BROKER.phone}</a>
          <button onClick={onListProperty} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "9px 22px", background: TOKEN.gold, color: TOKEN.charcoal,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
            border: "none", borderRadius: 100, cursor: "pointer",
            letterSpacing: "0.3px", transition: "all 0.25s",
          }}>List Your Property</button>
        </div>
      </div>
    </header>
  );
}