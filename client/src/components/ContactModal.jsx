import { useState } from "react";
import { BROKER } from "../data/properties";

const TOKEN = {
  cream: "#F7F3EE", stone: "#E8E0D5", warmGray: "#9C9189",
  charcoal: "#1C1917", ink: "#2D2926", gold: "#C9A84C", goldLight: "#E8C96A", white: "#FFFFFF",
};

export default function ContactModal({ mode, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "", detail: "" });
  const [sent, setSent] = useState(false);
  const isSell = mode === "sell";

  const inputStyle = {
    width: "100%", padding: "11px 16px", border: `1px solid ${TOKEN.stone}`,
    borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    color: TOKEN.ink, background: TOKEN.cream, outline: "none", transition: "border-color 0.2s",
  };
  const labelStyle = {
    display: "block", fontSize: 11, fontWeight: 500,
    letterSpacing: "1.5px", textTransform: "uppercase",
    color: TOKEN.warmGray, marginBottom: 6,
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(28,25,23,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: TOKEN.white, borderRadius: 20, padding: 32,
        width: "100%", maxWidth: 440, position: "relative",
        border: `1px solid ${TOKEN.stone}`,
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          width: 32, height: 32, border: `1px solid ${TOKEN.stone}`,
          borderRadius: 100, background: "transparent", cursor: "pointer",
          fontSize: 12, color: TOKEN.warmGray, display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>✕</button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{
              width: 56, height: 56, background: "rgba(201,168,76,0.12)",
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 16px", fontSize: 24,
            }}>✓</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: TOKEN.charcoal, marginBottom: 8 }}>
              Message Sent!
            </div>
            <p style={{ fontSize: 13, color: TOKEN.warmGray, lineHeight: 1.65, marginBottom: 24, fontWeight: 300 }}>
              {BROKER.name} will review your details and get back to you shortly.
            </p>
            <button onClick={onClose} style={{
              padding: "12px 32px", background: TOKEN.gold, color: TOKEN.charcoal,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              border: "none", borderRadius: 100, cursor: "pointer",
            }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{
              display: "inline-block", fontSize: 10, fontWeight: 500,
              letterSpacing: "2.5px", textTransform: "uppercase", color: TOKEN.gold,
              marginBottom: 12, padding: "4px 12px",
              border: "1px solid rgba(201,168,76,0.3)", borderRadius: 100,
            }}>{isSell ? "List Property" : "Get In Touch"}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: TOKEN.charcoal, lineHeight: 1.2, marginBottom: 8 }}>
              {isSell ? "List Your Property" : "Get In Touch"}
            </div>
            <div style={{ width: 32, height: 2, background: TOKEN.gold, marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: TOKEN.warmGray, lineHeight: 1.6, marginBottom: 24, fontWeight: 300 }}>
              {isSell ? "Want to sell or rent out your property? Share basic details and we'll take it from here." : "Have a question or need guidance? Reach out anytime."}
            </p>

            {[
              { label: "Your Name *", key: "name", type: "text", placeholder: "Full name" },
              { label: "Phone Number *", key: "phone", type: "tel", placeholder: "+91 9XXXXXXXX0" },
              { label: "Area / Location", key: "area", type: "text", placeholder: "e.g. Model Town, Ludhiana" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={labelStyle}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  style={inputStyle} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{isSell ? "Property Details" : "Your Message"}</label>
              <textarea placeholder={isSell ? "Type, size, asking price…" : "How can we help you?"}
                value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })}
                style={{ ...inputStyle, height: 80, resize: "none" }} />
            </div>
            <button
              onClick={() => { if (form.name && form.phone) setSent(true); }}
              style={{
                width: "100%", padding: "13px 24px", background: TOKEN.gold, color: TOKEN.charcoal,
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                border: "none", borderRadius: 100, cursor: "pointer", letterSpacing: "0.3px",
              }}>{isSell ? "Submit Property Info →" : "Send Message →"}</button>
          </>
        )}
      </div>
    </div>
  );
}