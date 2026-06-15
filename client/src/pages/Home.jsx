import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";
import { BROKER } from "../data/properties";
import { getProperties } from "../services/propertyService";
import "../index.css";
import "./Home.css";

export default function Home({ onVisit, onListProperty, onConsult }) {
  const [areas, setAreas] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [propertyType, setPropertyType] = useState("all");

  const filtered = properties.filter(
    (p) =>
      (filter === "all" ||
        p.type?.toLowerCase().includes(filter.toLowerCase())) &&
      (areaFilter === "all" || p.area === areaFilter) &&
      (propertyType === "all" ||
        p.category?.toLowerCase() === propertyType)
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // Fire both requests in parallel instead of waiting on them
      // sequentially - this alone can roughly halve the time-to-content.
      const [propertiesResult, areasResult] = await Promise.allSettled([
        getProperties(),
        fetch("https://property-consultant.onrender.com/api/areas").then((r) =>
          r.json()
        ),
      ]);

      if (cancelled) return;

      if (propertiesResult.status === "fulfilled") {
        setProperties(propertiesResult.value);
      } else {
        console.log(propertiesResult.reason);
      }

      if (areasResult.status === "fulfilled") {
        setAreas(areasResult.value);
      } else {
        console.log(areasResult.reason);
      }

      setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
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
              <div className="lp-stat-num">
                {loading ? <span className="lp-mini-spinner" /> : `${properties.length}+`}
              </div>
              <div className="lp-stat-label">Active Listings</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">
                {loading ? <span className="lp-mini-spinner" /> : `${areas.length}+`}
              </div>
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
            {["all", "sell", "rent"].map((t) => (
              <button
                key={t}
                className={`lp-chip${filter === t ? " active" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t === "all" ? "All" : t === "sell" ? "For Sale" : "For Rent"}
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
          </select>
        </div>
      </div>

      {/* ── LISTINGS ── */}
      <main className="lp-main">
        <div className="lp-results-header">
          <div>
            <div className="lp-divider" />
            <div className="lp-results-count">
              {loading
                ? "Loading"
                : `${filtered.length} ${filtered.length !== 1 ? "Properties" : "Property"}`}
              <span>{loading ? "" : "found"}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="lp-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="lp-skeleton-card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
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
              {areas.length > 0 ? `Serving: ${areas.map((a) => a.name).join(" · ")}` : ""}
            </div>
            <div className="lp-footer-copy">© {new Date().getFullYear()} Ludhiana Properties</div>
          </div>
        </div>
      </footer>
    </>
  );
}