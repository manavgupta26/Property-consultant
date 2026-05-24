import { BROKER } from "../data/properties";
import { styles } from "../styles/styles";

export default function Hero({ onConsult }) {
  return (
    <div style={styles.hero}>
      <div style={{ maxWidth: 640 }}>
        <p style={styles.heroEye}>Trusted Broker · Ludhiana</p>
        <h1 style={styles.heroH1}>Find Your Perfect Property in Ludhiana</h1>
        <p style={styles.heroSub}>
          Buy, rent, or sell — residential &amp; commercial properties across all
          major areas of Ludhiana. Personal guidance at every step.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button style={styles.primaryBtn} onClick={onConsult}>
            Get Free Consultation
          </button>
          <a
            href={`https://wa.me/${BROKER.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            style={{
              ...styles.callBtn,
              background: "#25D366",
              color: "#fff",
              border: "none",
            }}
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Area Pills */}
        <div style={styles.heroBadges}>
          {["Model Town", "BRS Nagar", "Sarabha Nagar", "Civil Lines", "Dugri", "Pakhowal Rd"].map(
            (a) => (
              <span key={a} style={styles.areaBadge}>
                {a}
              </span>
            )
          )}
          <span style={{ ...styles.areaBadge, opacity: 0.6 }}>& more…</span>
        </div>
      </div>
    </div>
  );
}