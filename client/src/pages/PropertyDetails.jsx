import { useParams, useNavigate } from "react-router-dom";
import { BROKER, BADGE } from "../data/properties";
import { useState, useEffect } from "react";
import { getPropertyById } from "../services/propertyService";

// ── Design tokens (shared with Home) ────────────────────────
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
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${TOKEN.cream}; color: ${TOKEN.ink}; -webkit-font-smoothing: antialiased; }

  .pd-wrap {
    max-width: 1200px; margin: 0 auto;
    padding: 24px 24px 80px;
  }

  /* Back button */
  .pd-back {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px;
    background: ${TOKEN.white};
    border: 1px solid ${TOKEN.stone};
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; color: ${TOKEN.ink};
    cursor: pointer; margin-bottom: 28px;
    transition: all 0.2s;
    text-decoration: none;
  }
  .pd-back:hover { background: ${TOKEN.stone}; border-color: ${TOKEN.warmGray}; }

  /* Gallery */
  .pd-gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 40px;
  }
  .pd-main-img-wrap {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    aspect-ratio: 16/9;
    background: ${TOKEN.stone};
    cursor: pointer;
  }
  .pd-main-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .pd-main-img-wrap:hover .pd-main-img { transform: scale(1.02); }
  .pd-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 50%;
    border: none;
    background: rgba(28,25,23,0.6);
    backdrop-filter: blur(8px);
    color: #fff; font-size: 18px;
    cursor: pointer; z-index: 5;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .pd-arrow:hover { background: rgba(28,25,23,0.85); }
  .pd-arrow-left { left: 16px; }
  .pd-arrow-right { right: 16px; }
  .pd-img-counter {
    position: absolute; bottom: 16px; right: 16px;
    background: rgba(28,25,23,0.65);
    backdrop-filter: blur(6px);
    color: #fff; font-size: 12px; font-weight: 500;
    padding: 5px 12px; border-radius: 100px;
  }
  .pd-thumbs {
    display: flex; gap: 10px; overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .pd-thumbs::-webkit-scrollbar { display: none; }
  .pd-thumb {
    flex-shrink: 0; width: 90px; height: 65px;
    border-radius: 10px; overflow: hidden;
    cursor: pointer; border: 2px solid transparent;
    transition: border-color 0.2s, opacity 0.2s;
    opacity: 0.65;
  }
  .pd-thumb.active { border-color: ${TOKEN.gold}; opacity: 1; }
  .pd-thumb:hover { opacity: 1; }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

  /* Layout */
  .pd-body {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 40px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .pd-body { grid-template-columns: 1fr; }
  }

  /* Left: info */
  .pd-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .pd-badge {
    padding: 5px 14px; border-radius: 100px;
    font-size: 11px; font-weight: 500;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .pd-badge-sale { background: #FEF3C7; color: #92400E; }
  .pd-badge-rent { background: #DBEAFE; color: #1E40AF; }
  .pd-badge-cat { background: ${TOKEN.stone}; color: ${TOKEN.ink}; }

  .pd-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 400; line-height: 1.15;
    color: ${TOKEN.charcoal};
    margin-bottom: 10px;
  }
  .pd-location {
    display: flex; align-items: center; gap: 6px;
    font-size: 14px; color: ${TOKEN.warmGray};
    margin-bottom: 32px;
  }

  .pd-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    color: ${TOKEN.charcoal};
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${TOKEN.stone};
  }
  .pd-desc {
    font-size: 15px; line-height: 1.85;
    color: #555; font-weight: 300;
    margin-bottom: 40px;
  }

  /* Specs */
  .pd-specs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 40px;
  }
  .pd-spec {
    background: ${TOKEN.white};
    border: 1px solid ${TOKEN.stone};
    border-radius: 14px;
    padding: 18px 16px;
    text-align: center;
  }
  .pd-spec-icon { font-size: 22px; margin-bottom: 6px; }
  .pd-spec-value {
    font-size: 15px; font-weight: 500;
    color: ${TOKEN.charcoal};
    line-height: 1.3;
  }
  .pd-spec-label {
    font-size: 11px; color: ${TOKEN.warmGray};
    text-transform: uppercase; letter-spacing: 1px;
    margin-top: 2px;
  }

  /* Tags */
  .pd-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
  .pd-tag {
    padding: 6px 14px; border-radius: 100px;
    background: ${TOKEN.stone}; color: ${TOKEN.ink};
    font-size: 12px; font-weight: 400;
  }

  /* Sidebar: price + contact */
  .pd-sidebar { position: sticky; top: 80px; }
  .pd-price-card {
    background: ${TOKEN.white};
    border: 1px solid ${TOKEN.stone};
    border-radius: 20px;
    padding: 28px 24px;
    margin-bottom: 16px;
  }
  .pd-price-label {
    font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase; color: ${TOKEN.warmGray};
    margin-bottom: 8px;
  }
  .pd-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px; font-weight: 600;
    color: ${TOKEN.teal};
    line-height: 1;
    margin-bottom: 20px;
  }
  .pd-price-divider {
    height: 1px; background: ${TOKEN.stone};
    margin-bottom: 16px;
  }
  .pd-contact-card {
    background: ${TOKEN.charcoal};
    border-radius: 20px;
    padding: 28px 24px;
  }
  .pd-contact-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 400;
    color: ${TOKEN.white}; margin-bottom: 8px;
  }
  .pd-contact-card p {
    font-size: 13px; color: rgba(255,255,255,0.5);
    line-height: 1.6; margin-bottom: 20px;
    font-weight: 300;
  }
  .pd-contact-btns { display: flex; flex-direction: column; gap: 10px; }
  .pd-btn-call {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 20px;
    background: ${TOKEN.gold}; color: ${TOKEN.charcoal};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    border: none; border-radius: 100px;
    text-decoration: none; cursor: pointer;
    transition: all 0.2s;
  }
  .pd-btn-call:hover { background: ${TOKEN.goldLight}; transform: translateY(-1px); }
  .pd-btn-wa {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 20px;
    background: #25D366; color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    border: none; border-radius: 100px;
    text-decoration: none; cursor: pointer;
    transition: all 0.2s;
  }
  .pd-btn-wa:hover { background: #1ebe5c; transform: translateY(-1px); }

  /* Error / loading */
  .pd-center {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 70vh; gap: 16px;
    background: ${TOKEN.cream};
    font-family: 'DM Sans', sans-serif;
  }

  /* Fullscreen */
  .pd-fullscreen {
    position: fixed; inset: 0;
    background: rgba(10,8,6,0.97);
    z-index: 9999;
    display: flex; align-items: center;
    justify-content: center; flex-direction: column;
    padding: 24px;
  }
  .pd-fs-close {
    position: absolute; top: 20px; right: 20px;
    background: rgba(255,255,255,0.08);
    border: none; border-radius: 50%;
    width: 44px; height: 44px;
    color: #fff; font-size: 22px;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .pd-fs-close:hover { background: rgba(255,255,255,0.15); }
  .pd-fs-img {
    max-width: 95%;
    max-height: 78vh;
    object-fit: contain;
    border-radius: 12px;
  }
  .pd-fs-controls {
    display: flex; gap: 12px; margin-top: 20px;
  }
  .pd-fs-btn {
    padding: 10px 24px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff; border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; cursor: pointer;
    transition: background 0.2s;
  }
  .pd-fs-btn:hover { background: rgba(255,255,255,0.15); }
  .pd-fs-counter {
    color: rgba(255,255,255,0.4);
    font-size: 13px; margin-top: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  @media (max-width: 600px) {
    .pd-wrap { padding: 16px 16px 60px; }
    .pd-specs { grid-template-columns: repeat(2, 1fr); }
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function PropertyDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProperty(); }, []);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(id);
      setProperty(data);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const prev = () => setSelectedImage((i) => (i === 0 ? property.images.length - 1 : i - 1));
  const next = () => setSelectedImage((i) => (i === property.images.length - 1 ? 0 : i + 1));

  if (loading) return (
    <>
      <style>{css}</style>
      <div className="pd-center">
        <div style={{ width: 40, height: 40, border: `3px solid #E8E0D5`, borderTopColor: TOKEN.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: TOKEN.warmGray, fontSize: 14 }}>Loading property…</p>
      </div>
    </>
  );

  if (!property) return (
    <>
      <style>{css}</style>
      <div className="pd-center">
        <div style={{ fontSize: 48 }}>🏠</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 28 }}>Property Not Found</h2>
        <button className="pd-back" onClick={() => navigate("/")}>← Back to Listings</button>
      </div>
    </>
  );

  const badgeClass = property.type === "sale" ? "pd-badge-sale" : "pd-badge-rent";
  const badgeLabel = property.type === "sale" ? "For Sale" : "For Rent";

  return (
    <>
      <style>{css}</style>
      <div className="pd-wrap">

        {/* Back */}
        <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>

        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-img-wrap" onClick={() => property.images.length > 1 && setFullscreen(true)}>
            {property.images.length > 1 && (
              <button className="pd-arrow pd-arrow-left" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
            )}
            <img className="pd-main-img" src={property.images[selectedImage]} alt={property.title} />
            {property.images.length > 1 && (
              <button className="pd-arrow pd-arrow-right" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
            )}
            {property.images.length > 1 && (
              <div className="pd-img-counter">{selectedImage + 1} / {property.images.length}</div>
            )}
          </div>

          {property.images.length > 1 && (
            <div className="pd-thumbs">
              {property.images.map((img, i) => (
                <div key={i} className={`pd-thumb${selectedImage === i ? " active" : ""}`} onClick={() => setSelectedImage(i)}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="pd-body">

          {/* Left column */}
          <div>
            <div className="pd-badges">
              <span className={`pd-badge ${badgeClass}`}>{badgeLabel}</span>
              <span className="pd-badge pd-badge-cat">{property.category}</span>
            </div>

            <h1 className="pd-title">{property.title}</h1>
            <div className="pd-location">📍 {property.area}, Ludhiana</div>

            {/* Description */}
            <div className="pd-section-title">About This Property</div>
            <p className="pd-desc">{property.desc}</p>

            {/* Specs */}
            <div className="pd-section-title">Property Details</div>
            <div className="pd-specs">
              <div className="pd-spec">
                <div className="pd-spec-icon">📐</div>
                <div className="pd-spec-value">{property.size}</div>
                <div className="pd-spec-label">Area</div>
              </div>
              {property.beds && (
                <div className="pd-spec">
                  <div className="pd-spec-icon">🛏</div>
                  <div className="pd-spec-value">{property.beds}</div>
                  <div className="pd-spec-label">Bedrooms</div>
                </div>
              )}
              <div className="pd-spec">
                <div className="pd-spec-icon">🚿</div>
                <div className="pd-spec-value">{property.baths}</div>
                <div className="pd-spec-label">Bathrooms</div>
              </div>
              {property.parking && (
                <div className="pd-spec">
                  <div className="pd-spec-icon">🚗</div>
                  <div className="pd-spec-value">Available</div>
                  <div className="pd-spec-label">Parking</div>
                </div>
              )}
            </div>

            {/* Tags */}
            {property.tags?.length > 0 && (
              <>
                <div className="pd-section-title">Features</div>
                <div className="pd-tags">
                  {property.tags.map((tag) => (
                    <span key={tag} className="pd-tag">{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right sidebar */}
          <div className="pd-sidebar">
            <div className="pd-price-card">
              <div className="pd-price-label">Asking Price</div>
              <div className="pd-price">{property.price}</div>
              <div className="pd-price-divider" />
              <div style={{ fontSize: 12, color: TOKEN.warmGray, lineHeight: 1.6 }}>
                Listed by {BROKER.name} · Ludhiana
              </div>
            </div>

            <div className="pd-contact-card">
              <h3>Interested?</h3>
              <p>Contact {BROKER.name} for site visits, pricing details, and negotiations.</p>
              <div className="pd-contact-btns">
                <a href={`tel:${BROKER.phone}`} className="pd-btn-call">
                  📞 Call Now
                </a>
                <a href={`https://wa.me/${BROKER.whatsapp}`} target="_blank" rel="noreferrer" className="pd-btn-wa">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen gallery */}
      {fullscreen && (
        <div className="pd-fullscreen">
          <button className="pd-fs-close" onClick={() => setFullscreen(false)}>×</button>
          <img className="pd-fs-img" src={property.images[selectedImage]} alt="" />
          <div className="pd-fs-controls">
            <button className="pd-fs-btn" onClick={prev}>← Prev</button>
            <button className="pd-fs-btn" onClick={next}>Next →</button>
          </div>
          <div className="pd-fs-counter">{selectedImage + 1} of {property.images.length}</div>
        </div>
      )}
    </>
  );
}