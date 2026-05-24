import { useState } from "react";
import { BROKER, BADGE } from "../data/properties";
import { styles } from "../styles/styles";

export default function VisitModal({ prop, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", note: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!form.name || !form.phone) return;
    // TODO: wire up to your backend / email service / WhatsApp API here
    setSent(true);
  }

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
                marginBottom: 8,
              }}
            >
              Request Sent!
            </h3>
            <p style={{ color: "#666", fontSize: 14 }}>
              {BROKER.name} will contact you on <strong>{form.phone}</strong>{" "}
              shortly to confirm your visit.
            </p>
            <button style={{ ...styles.primaryBtn, marginTop: 20 }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            {/* Property Summary */}
            <div style={{ marginBottom: 20 }}>
              <span
                style={{
                  ...styles.badge,
                  background: BADGE[prop.type].color,
                }}
              >
                {BADGE[prop.type].label}
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  margin: "8px 0 2px",
                }}
              >
                {prop.title}
              </h3>
              <p style={{ color: "#888", fontSize: 13 }}>
                📍 {prop.area}, Ludhiana &nbsp;·&nbsp; {prop.price}
              </p>
            </div>

            <p style={{ fontSize: 13, color: "#555", marginBottom: 18 }}>
              Fill in your details and we'll schedule a visit at your convenience.
            </p>

            {/* Fields */}
            {[
              { label: "Your Name *", key: "name", placeholder: "e.g. Rajdeep Kaur", type: "text" },
              { label: "Phone Number *", key: "phone", placeholder: "+91 9XXXXXXXX0", type: "tel" },
              { label: "Preferred Visit Date", key: "date", placeholder: "", type: "date" },
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
              <label style={styles.label}>Additional Note</label>
              <textarea
                placeholder="Any specific requirements or questions..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                style={{ ...styles.input, height: 70, resize: "none" }}
              />
            </div>

            <button style={styles.primaryBtn} onClick={handleSubmit}>
              Schedule Visit
            </button>

            <div style={{ textAlign: "center", marginTop: 12 }}>
              <a
                href={`https://wa.me/${BROKER.whatsapp}?text=Hi, I'm interested in ${prop.title} at ${prop.area}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 13,
                  color: "#25D366",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                💬 Or message directly on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}