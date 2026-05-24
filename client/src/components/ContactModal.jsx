import { useState } from "react";
import { styles } from "../styles/styles";

// mode: "sell" | "contact"
export default function ContactModal({ mode, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "", detail: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!form.name || !form.phone) return;
    // TODO: wire up to your backend / email service / WhatsApp API here
    setSent(true);
  }

  const isSell = mode === "sell";

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {sent ? (
          /* ── Success State ── */
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
              }}
            >
              Message Sent!
            </h3>
            <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
              Harpreet Singh will get back to you soon.
            </p>
            <button style={{ ...styles.primaryBtn, marginTop: 20 }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                marginBottom: 4,
              }}
            >
              {isSell ? "List Your Property" : "Get In Touch"}
            </h3>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
              {isSell
                ? "Want to sell or rent out your property? Share basic details and we'll take it from here."
                : "Have a question or need guidance? Reach out anytime."}
            </p>

            {/* Fields */}
            {[
              { label: "Your Name *", key: "name", type: "text", placeholder: "Full name" },
              { label: "Phone Number *", key: "phone", type: "tel", placeholder: "+91 9XXXXXXXX0" },
              {
                label: "Area / Location",
                key: "area",
                type: "text",
                placeholder: "e.g. Model Town, Ludhiana",
              },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={styles.label}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  style={styles.input}
                />
              </div>
            ))}

            <div style={{ marginBottom: 18 }}>
              <label style={styles.label}>
                {isSell ? "Property Details" : "Your Message"}
              </label>
              <textarea
                placeholder={
                  isSell
                    ? "Type, size, asking price..."
                    : "How can we help you?"
                }
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                style={{ ...styles.input, height: 80, resize: "none" }}
              />
            </div>

            <button style={styles.primaryBtn} onClick={handleSubmit}>
              {isSell ? "Submit Property Info" : "Send Message"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}