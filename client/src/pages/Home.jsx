import { useState , useEffect} from "react";

import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";

import { BROKER } from "../data/properties";
import { getProperties } from "../services/propertyService";
import { styles } from "../styles/styles";

import "../index.css";

export default function Home({
  onVisit,
  onListProperty,
  onConsult,
}) {
  const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);
  // Filters belong to Home page
  const [filter, setFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [propertyType, setPropertyType] = useState("all");

  // Filter Logic
  const filtered = properties.filter(
    (p) =>
      (filter === "all" || p.type === filter) &&
      (areaFilter === "all" || p.area === areaFilter) &&
      (propertyType === "all" ||
        p.category.toLowerCase() === propertyType)
  );
  useEffect(() => {
  fetchProperties();
}, []);

const fetchProperties = async () => {
  try {
    const data = await getProperties();

    setProperties(data);
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
      Loading properties...
    </div>
  );
}

  return (
    <>
      {/* Hero */}
      <Hero onConsult={onConsult} />

      {/* Filters */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
      />

      {/* Listings */}
      <main style={styles.main}>
        <div style={styles.resultsInfo}>
          <span style={{ fontWeight: 500 }}>
            {filtered.length} propert
            {filtered.length !== 1 ? "ies" : "y"} found
          </span>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#999",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>
              🏠
            </div>

            <p>
              No listings match your filter.
              Try a different area or type.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((p) => (
              <PropertyCard
                key={p.id}
                prop={p}
                onVisit={onVisit}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sell Banner */}
      <section style={styles.sellBanner}>
        <div
          style={{
            maxWidth: 540,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              marginBottom: 10,
            }}
          >
            Want to Sell or Rent Your Property?
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
              marginBottom: 24,
            }}
          >
            Get the best value for your property
            in Ludhiana. Share your details and
            we'll handle everything — valuation,
            listings, and finding the right buyer
            or tenant.
          </p>

          <button
            style={{
              ...styles.primaryBtn,
              background: "#fff",
              color: "#1a1a1a",
            }}
            onClick={onListProperty}
          >
            List My Property
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            marginBottom: 4,
          }}
        >
          Ludhiana Properties
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#999",
            marginBottom: 10,
          }}
        >
          by {BROKER.name} · Property Broker,
          Ludhiana
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
            fontSize: 13,
          }}
        >
          <a
            href={`tel:${BROKER.phone}`}
            style={{ color: "#ccc" }}
          >
            {BROKER.phone}
          </a>

          <a
            href={`mailto:${BROKER.email}`}
            style={{ color: "#ccc" }}
          >
            {BROKER.email}
          </a>

          <a
            href={`https://wa.me/${BROKER.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#25D366" }}
          >
            WhatsApp
          </a>
        </div>

        <div
          style={{
            marginTop: 16,
            fontSize: 12,
            color: "#555",
          }}
        >
          Serving: {BROKER.areas.join(" · ")}
        </div>
      </footer>
    </>
  );
}