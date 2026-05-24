import { useNavigate } from "react-router-dom";
import { BROKER, BADGE } from "../data/properties";
import { styles } from "../styles/styles";

export default function PropertyCard({ prop, onVisit }) {
  const navigate = useNavigate();

  const b = BADGE[prop.type];

  const cardTopBg =
    prop.category === "Commercial"
      ? { background: "#1a2a3a" }
      : { background: "#1c2b1c" };

  return (
    <div
      style={{
        ...styles.card,
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={() => navigate(`/property/${prop._id}`)}
    >
      {/* Property Image */}
      <div
        style={{
          width: "100%",
          height: 220,
          position: "relative",

          ...(prop.images?.length
            ? {
                backgroundImage: `url(${prop.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : cardTopBg),
        }}
      >
        {/* Overlay */}
        {prop.images?.length > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
            }}
          />
        )}

        {/* Top Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: 18,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Badges */}
          <div>
            <span
              style={{
                ...styles.badge,
                background: b.color,
              }}
            >
              {b.label}
            </span>

            <span
              style={{
                ...styles.badge,
                background: "rgba(255,255,255,0.15)",
                marginLeft: 6,
                backdropFilter: "blur(4px)",
              }}
            >
              {prop.category}
            </span>
          </div>

          {/* Bottom Info */}
          <div>
            <div
              style={{
                ...styles.priceTag,
                marginBottom: 10,
              }}
            >
              {prop.price}
            </div>

            <h3
              style={{
                ...styles.cardTitle,
                color: "#fff",
                marginBottom: 6,
              }}
            >
              {prop.title}
            </h3>

            <p
              style={{
                ...styles.cardArea,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              📍 {prop.area}, Ludhiana
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={styles.cardBody}>
        <p
          style={{
            fontSize: 13,
            color: "#555",
            marginBottom: 14,
            lineHeight: 1.55,
          }}
        >
          {prop.desc}
        </p>

        {/* Specs */}
        <div style={styles.specs}>
          <span style={styles.spec}>📐 {prop.size}</span>

          {prop.beds && (
            <span style={styles.spec}>🛏 {prop.beds} Bed</span>
          )}

          <span style={styles.spec}>🚿 {prop.baths} Bath</span>

          {prop.parking && (
            <span style={styles.spec}>🚗 Parking</span>
          )}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 16,
          }}
        >
          {prop.tags.map((t) => (
            <span key={t} style={styles.tag}>
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={styles.primaryBtn}
            onClick={(e) => {
              e.stopPropagation();
              onVisit(prop);
            }}
          >
            Schedule Visit
          </button>

          <a
            href={`tel:${BROKER.phone}`}
            style={styles.callBtn}
            onClick={(e) => e.stopPropagation()}
          >
            📞 Call
          </a>
        </div>
      </div>
    </div>
  );
}