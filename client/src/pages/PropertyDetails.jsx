import { useParams, useNavigate } from "react-router-dom";

import { BROKER, BADGE } from "../data/properties";
import { styles } from "../styles/styles";
import { useState, useEffect } from "react";
import { getPropertyById } from "../services/propertyService";

export default function PropertyDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(id);

      setProperty(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
        }}
      >
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
        }}
      >
        <h2>Property Not Found</h2>

        <button style={styles.primaryBtn} onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const badge = BADGE[property.type];

  return (
    <div
      style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "24px",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        ← Back
      </button>

      {/* Main Image */}
      {/* Main Image */}
      <div
        style={{
          width: "100%",
          height: 500,
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 30,
          position: "relative",
        }}
      >
        {/* Left Arrow */}
        {property.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              setSelectedImage((prev) =>
                prev === 0 ? property.images.length - 1 : prev - 1,
              );
            }}
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: 22,
              cursor: "pointer",
            }}
          >
            ←
          </button>
        )}

        {/* Image */}
        <img
          src={property.images[selectedImage]}
          alt={property.title}
          onClick={() => {
            if (property.images.length > 1) {
              setFullscreen(true);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: property.images.length > 1 ? "pointer" : "default",
          }}
        />

        {/* Right Arrow */}
        {property.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              setSelectedImage((prev) =>
                prev === property.images.length - 1 ? 0 : prev + 1,
              );
            }}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: 22,
              cursor: "pointer",
            }}
          >
            →
          </button>
        )}
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                ...styles.badge,
                background: badge.color,
              }}
            >
              {badge.label}
            </span>

            <span
              style={{
                ...styles.badge,
                background: "#eee",
                color: "#222",
              }}
            >
              {property.category}
            </span>
          </div>

          <h1
            style={{
              fontSize: 38,
              marginBottom: 8,
            }}
          >
            {property.title}
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: 16,
            }}
          >
            📍 {property.area}, Ludhiana
          </p>
        </div>

        <div>
          <h2
            style={{
              fontSize: 34,
              color: "#0f766e",
            }}
          >
            {property.price}
          </h2>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            marginBottom: 12,
            fontSize: 24,
          }}
        >
          Description
        </h3>

        <p
          style={{
            lineHeight: 1.8,
            color: "#555",
          }}
        >
          {property.desc}
        </p>
      </div>

      {/* Specs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 30,
        }}
      >
        <div style={styles.spec}>📐 {property.size}</div>

        {property.beds && (
          <div style={styles.spec}>🛏 {property.beds} Bedrooms</div>
        )}

        <div style={styles.spec}>🚿 {property.baths} Bathrooms</div>

        {property.parking && (
          <div style={styles.spec}>🚗 Parking Available</div>
        )}
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        {property.tags.map((tag) => (
          <span key={tag} style={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Contact */}
      <div
        style={{
          padding: 30,
          borderRadius: 24,
          background: "#111827",
          color: "#fff",
        }}
      >
        <h2
          style={{
            marginBottom: 12,
          }}
        >
          Interested in this property?
        </h2>

        <p
          style={{
            color: "#ccc",
            marginBottom: 20,
          }}
        >
          Contact {BROKER.name} for site visits, pricing details, and
          negotiations.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <a href={`tel:${BROKER.phone}`} style={styles.primaryBtn}>
            📞 Call Now
          </a>

          <a
            href={`https://wa.me/${BROKER.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            style={{
              ...styles.primaryBtn,
              background: "#25D366",
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
      {/* Fullscreen Gallery */}
      {fullscreen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 20,
          }}
        >
          {/* Close */}
          <button
            onClick={() => setFullscreen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          {/* Image */}
          <img
            src={property.images[selectedImage]}
            alt=""
            style={{
              maxWidth: "95%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 12,
            }}
          />

          {/* Controls */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 20,
            }}
          >
            <button
              style={styles.primaryBtn}
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === 0 ? property.images.length - 1 : prev - 1,
                )
              }
            >
              ← Prev
            </button>

            <button
              style={styles.primaryBtn}
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === property.images.length - 1 ? 0 : prev + 1,
                )
              }
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
