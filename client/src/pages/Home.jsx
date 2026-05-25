import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";
import { BROKER } from "../data/properties";
import { getProperties } from "../services/propertyService";
import "../index.css";

// ── Design tokens ────────────────────────────────────────────
const TOKEN = {
  cream: "#F7F3EE",
  stone: "#E8E0D5",
  warmGray: "#9C9189",
  charcoal: "#1C1917",
  ink: "#2D2926",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  teal: "#0F766E",
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  shadow: "0 2px 24px rgba(28,25,23,0.08)",
  shadowHover: "0 8px 40px rgba(28,25,23,0.16)",
  radius: "16px",
  radiusLg: "24px",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${TOKEN.cream};
    color: ${TOKEN.ink};
    -webkit-font-smoothing: antialiased;
  }

  .lp-hero {
    position: relative;
    min-height: 93vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: ${TOKEN.charcoal};
  }
  .lp-hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #1C1917 0%, #2D2926 50%, #1a1614 100%);
  }
  .lp-hero-pattern {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: repeating-linear-gradient(
      45deg, ${TOKEN.gold} 0, ${TOKEN.gold} 1px,
      transparent 0, transparent 50%
    );
    background-size: 30px 30px;
  }
  .lp-hero-glow {
    position: absolute; top: -20%; right: -10%;
    width: 60vw; height: 60vw;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .lp-hero-content {
    position: relative; z-index: 2;
    text-align: center;
    padding: 40px 24px;
    max-width: 760px;
  }
  .lp-hero-eyebrow {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${TOKEN.gold};
    margin-bottom: 20px;
    padding: 6px 18px;
    border: 1px solid rgba(201,168,76,0.3);
    border-radius: 100px;
  }
  .lp-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(42px, 7vw, 80px);
    font-weight: 300;
    color: ${TOKEN.white};
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -0.5px;
  }
  .lp-hero-title em {
    font-style: italic;
    color: ${TOKEN.goldLight};
  }
  .lp-hero-sub {
    font-size: 16px;
    font-weight: 300;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 500px;
    margin-left: auto; margin-right: auto;
  }
  .lp-hero-actions {
    display: flex; gap: 14px;
    justify-content: center; flex-wrap: wrap;
  }
  .lp-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: ${TOKEN.gold};
    color: ${TOKEN.charcoal};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    border: none; border-radius: 100px;
    cursor: pointer; text-decoration: none;
    transition: all 0.25s ease;
    letter-spacing: 0.3px;
  }
  .lp-btn-primary:hover {
    background: ${TOKEN.goldLight};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201,168,76,0.4);
  }
  .lp-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: transparent;
    color: ${TOKEN.white};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 400;
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 100px;
    cursor: pointer; text-decoration: none;
    transition: all 0.25s ease;
  }
  .lp-btn-ghost:hover {
    border-color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.06);
    transform: translateY(-2px);
  }
  .lp-hero-stats {
    display: flex; gap: 40px; justify-content: center;
    flex-wrap: wrap;
    margin-top: 60px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .lp-stat { text-align: center; }
  .lp-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 600;
    color: ${TOKEN.goldLight};
    line-height: 1;
  }
  .lp-stat-label {
    font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-top: 4px;
  }

  /* Filter bar */
  .lp-filters {
    background: ${TOKEN.white};
    border-bottom: 1px solid ${TOKEN.stone};
    padding: 0 24px;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .lp-filters-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; gap: 16px;
    align-items: center; flex-wrap: wrap;
    padding: 14px 0;
  }
  .lp-filter-label {
    font-size: 11px; font-weight: 500;
    letter-spacing: 2px; text-transform: uppercase;
    color: ${TOKEN.warmGray};
    white-space: nowrap;
  }
  .lp-select {
    appearance: none;
    -webkit-appearance: none;
    background: ${TOKEN.cream} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239C9189' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center;
    padding: 9px 36px 9px 14px;
    border: 1px solid ${TOKEN.stone};
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: ${TOKEN.ink};
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 130px;
  }
  .lp-select:focus { outline: none; border-color: ${TOKEN.gold}; }
  .lp-filter-chips {
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .lp-chip {
    padding: 7px 16px;
    border-radius: 100px;
    border: 1px solid ${TOKEN.stone};
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: ${TOKEN.warmGray};
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .lp-chip:hover { border-color: ${TOKEN.gold}; color: ${TOKEN.ink}; }
  .lp-chip.active {
    background: ${TOKEN.charcoal}; color: ${TOKEN.white};
    border-color: ${TOKEN.charcoal};
  }

  /* Listings */
  .lp-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;
  }
  .lp-results-header {
    display: flex; align-items: center;
    justify-content: space-between;
    margin-bottom: 32px; flex-wrap: wrap; gap: 12px;
  }
  .lp-results-count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 400;
    color: ${TOKEN.ink};
  }
  .lp-results-count span {
    font-size: 13px; font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: ${TOKEN.warmGray};
    margin-left: 8px;
  }
  .lp-divider {
    width: 40px; height: 2px;
    background: ${TOKEN.gold};
    margin-bottom: 8px;
  }
  .lp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
  }
  @media (max-width: 700px) {
    .lp-grid { grid-template-columns: 1fr; }
  }

  /* Empty state */
  .lp-empty {
    text-align: center;
    padding: 80px 20px;
    color: ${TOKEN.warmGray};
  }
  .lp-empty-icon {
    font-size: 48px; margin-bottom: 16px;
    opacity: 0.5;
  }
  .lp-empty p {
    font-size: 15px; line-height: 1.7;
    max-width: 340px; margin: 0 auto;
  }

  /* Sell Banner */
  .lp-sell-banner {
    background: ${TOKEN.charcoal};
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
  }
  .lp-sell-banner::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      -45deg, rgba(201,168,76,0.04) 0,
      rgba(201,168,76,0.04) 1px, transparent 0, transparent 50%
    );
    background-size: 20px 20px;
  }
  .lp-sell-banner-inner {
    position: relative; z-index: 1;
    max-width: 580px; margin: 0 auto;
    text-align: center;
  }
  .lp-sell-banner h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 400; color: ${TOKEN.white};
    line-height: 1.2; margin-bottom: 16px;
  }
  .lp-sell-banner h2 em {
    font-style: italic; color: ${TOKEN.goldLight};
  }
  .lp-sell-banner p {
    color: rgba(255,255,255,0.55);
    font-size: 15px; line-height: 1.75;
    margin-bottom: 32px;
    font-weight: 300;
  }

  /* Footer */
  .lp-footer {
    background: #111;
    padding: 56px 24px 40px;
    color: ${TOKEN.white};
  }
  .lp-footer-inner {
    max-width: 1200px; margin: 0 auto;
  }
  .lp-footer-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 40px;
    flex-wrap: wrap;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 32px;
  }
  .lp-footer-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300;
    color: ${TOKEN.white};
    margin-bottom: 6px;
  }
  .lp-footer-brand-tag {
    font-size: 12px; color: ${TOKEN.warmGray};
    letter-spacing: 1px;
  }
  .lp-footer-links {
    display: flex; flex-direction: column; gap: 12px;
  }
  .lp-footer-link {
    display: flex; align-items: center; gap: 10px;
    color: rgba(255,255,255,0.6);
    font-size: 14px; text-decoration: none;
    transition: color 0.2s;
  }
  .lp-footer-link:hover { color: ${TOKEN.goldLight}; }
  .lp-footer-link-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center;
    justify-content: center; font-size: 14px;
    flex-shrink: 0;
  }
  .lp-footer-wa { color: #25D366 !important; }
  .lp-footer-bottom {
    display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 12px;
  }
  .lp-footer-areas {
    font-size: 12px; color: rgba(255,255,255,0.25);
    line-height: 1.6;
    max-width: 600px;
  }
  .lp-footer-copy {
    font-size: 12px; color: rgba(255,255,255,0.2);
    white-space: nowrap;
  }

  /* PropertyCard override wrapper */
  .lp-card-wrap > * {
    border-radius: 20px !important;
    overflow: hidden !important;
    box-shadow: ${TOKEN.shadow} !important;
    transition: box-shadow 0.3s ease, transform 0.3s ease !important;
    background: ${TOKEN.white} !important;
    border: 1px solid ${TOKEN.stone} !important;
  }
  .lp-card-wrap > *:hover {
    box-shadow: ${TOKEN.shadowHover} !important;
    transform: translateY(-4px) !important;
  }

  @media (max-width: 600px) {
    .lp-hero-stats { gap: 24px; padding-top: 28px; }
    .lp-filters-inner { gap: 10px; }
    .lp-sell-banner { padding: 56px 20px; }
    .lp-footer-top { gap: 24px; }
  }
`;

export default function Home({ onVisit, onListProperty, onConsult }) {
  const [areas, setAreas] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [propertyType, setPropertyType] = useState("all");

  const filtered = properties.filter(
    (p) =>
      (filter === "all" || p.type === filter) &&
      (areaFilter === "all" || p.area === areaFilter) &&
      (propertyType === "all" || p.category.toLowerCase() === propertyType)
  );

  useEffect(() => {
    fetchProperties();
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const res = await fetch("https://property-consultant.onrender.com/api/areas");
      const data = await res.json();
      setAreas(data);
    } catch (e) { console.log(e); }
  };

  const fetchProperties = async () => {
    try {
      const { getProperties } = await import("../services/propertyService");
      const data = await getProperties();
      setProperties(data);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: 16, background: TOKEN.cream }}>
          <div style={{ width: 40, height: 40, border: `3px solid ${TOKEN.stone}`, borderTopColor: TOKEN.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: TOKEN.warmGray, fontSize: 14 }}>Loading properties…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-bg" />
        <div className="lp-hero-pattern" />
        <div className="lp-hero-glow" />
        <div className="lp-hero-content">
          <div className="lp-hero-eyebrow">Ludhiana's Premier Property Broker</div>
          <h1 className="lp-hero-title">
            Find Your <em>Perfect</em><br />Property in Ludhiana
          </h1>
          <p className="lp-hero-sub">
            Exclusive residential and commercial listings curated by {BROKER.name} — your trusted local expert for over a decade.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-primary" onClick={onConsult}>
              📞 Free Consultation
            </button>
            <button className="lp-btn-ghost" onClick={onListProperty}>
              List Your Property
            </button>
          </div>
          <div className="lp-hero-stats">
            <div className="lp-stat">
              <div className="lp-stat-num">{properties.length}+</div>
              <div className="lp-stat-label">Active Listings</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">{areas.length}+</div>
              <div className="lp-stat-label">Areas Covered</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">10+</div>
              <div className="lp-stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="lp-filters">
        <div className="lp-filters-inner">
          <span className="lp-filter-label">Filter</span>

          {/* Type chips */}
          <div className="lp-filter-chips">
            {["all", "sale", "rent"].map((t) => (
              <button
                key={t}
                className={`lp-chip${filter === t ? " active" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t === "all" ? "All" : t === "sale" ? "For Sale" : "For Rent"}
              </button>
            ))}
          </div>

          {/* Area */}
          <select className="lp-select" value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
            <option value="all">All Areas</option>
            {areas.map((a) => (
              <option key={a._id || a.name} value={a.name}>{a.name}</option>
            ))}
          </select>

          {/* Category */}
          <select className="lp-select" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="plot">Plot</option>
          </select>
        </div>
      </div>

      {/* ── LISTINGS ── */}
      <main className="lp-main">
        <div className="lp-results-header">
          <div>
            <div className="lp-divider" />
            <div className="lp-results-count">
              {filtered.length} {filtered.length !== 1 ? "Properties" : "Property"}
              <span>found</span>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="lp-empty">
            <div className="lp-empty-icon">🏠</div>
            <p>No listings match your filters. Try a different area or type.</p>
          </div>
        ) : (
          <div className="lp-grid">
            {filtered.map((p) => (
              <div key={p.id} className="lp-card-wrap">
                <PropertyCard prop={p} onVisit={onVisit} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── SELL BANNER ── */}
      <section className="lp-sell-banner">
        <div className="lp-sell-banner-inner">
          <h2>Want to Sell or <em>Rent</em> Your Property?</h2>
          <p>
            Get the best value for your property in Ludhiana. Share your details and we'll handle everything — valuation, listings, and finding the right buyer or tenant.
          </p>
          <button className="lp-btn-primary" onClick={onListProperty}>
            List My Property →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-top">
            <div>
              <div className="lp-footer-brand-name">Ludhiana Properties</div>
              <div className="lp-footer-brand-tag">by {BROKER.name} · Property Broker</div>
            </div>
            <div className="lp-footer-links">
              <a href={`tel:${BROKER.phone}`} className="lp-footer-link">
                <span className="lp-footer-link-icon">📞</span>
                {BROKER.phone}
              </a>
              <a href={`mailto:${BROKER.email}`} className="lp-footer-link">
                <span className="lp-footer-link-icon">✉️</span>
                {BROKER.email}
              </a>
              <a href={`https://wa.me/${BROKER.whatsapp}`} target="_blank" rel="noreferrer" className="lp-footer-link lp-footer-wa">
                <span className="lp-footer-link-icon">💬</span>
                WhatsApp
              </a>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <div className="lp-footer-areas">
              Serving: {areas.map((a) => a.name).join(" · ")}
            </div>
            <div className="lp-footer-copy">© {new Date().getFullYear()} Ludhiana Properties</div>
          </div>
        </div>
      </footer>
    </>
  );
}