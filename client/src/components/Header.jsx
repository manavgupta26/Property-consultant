import { useState, useEffect } from "react";
import { BROKER } from "../data/properties";

const TOKEN = {
  cream: "#F7F3EE",
  stone: "#E8E0D5",
  warmGray: "#9C9189",
  charcoal: "#1C1917",
  ink: "#2D2926",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  white: "#FFFFFF",
};

export default function Header({ onListProperty }) {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      style={{
        background: TOKEN.charcoal,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Main Header */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 18px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side */}
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mobile ? 20 : 24,
              fontWeight: 300,
              color: TOKEN.white,
              lineHeight: 1,
            }}
          >
            Ludhiana Properties
          </div>

          <div
            style={{
              fontSize: 11,
              color: TOKEN.warmGray,
              letterSpacing: 1,
              marginTop: 4,
            }}
          >
            by {BROKER.name} · Property Broker
          </div>
        </div>

        {/* Desktop Actions */}
        {!mobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <a
              href={`tel:${BROKER.phone}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(255,255,255,0.7)",
                fontSize: 13,
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              📞 {BROKER.phone}
            </a>

            <button
              onClick={onListProperty}
              style={{
                padding: "10px 20px",
                background: TOKEN.gold,
                color: TOKEN.charcoal,
                border: "none",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              List Your Property
            </button>
          </div>
        )}

        {/* Mobile Hamburger */}
        {mobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: TOKEN.white,
              fontSize: 28,
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobile && menuOpen && (
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#221f1d",
          }}
        >
          <a
            href={`tel:${BROKER.phone}`}
            style={{
              textDecoration: "none",
              color: TOKEN.white,
              padding: "12px 14px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "center",
            }}
          >
            📞 {BROKER.phone}
          </a>

          <button
            onClick={onListProperty}
            style={{
              padding: "12px 16px",
              background: TOKEN.gold,
              color: TOKEN.charcoal,
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            List Your Property
          </button>
        </div>
      )}
    </header>
  );
}