import { Link } from "react-router-dom";

const cards = [
  {
    to: "/admin/add",
    title: "Add Property",
    desc: "List a new property with details, pricing, and photos.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    to: "/admin/properties",
    title: "Manage Properties",
    desc: "Edit, update, or remove properties you've already listed.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
];

export default function AdminDashboard() {
  return (
    <div style={styles.page}>
      <style>{`
        .admin-card {
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .admin-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(17, 24, 39, 0.18);
          border-color: #1f2937;
        }
        .admin-card:hover .admin-card-arrow {
          transform: translateX(3px);
          opacity: 1;
        }
      `}</style>

      <div style={styles.header}>
        <p style={styles.eyebrow}>Admin</p>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Manage your property listings from one place.</p>
      </div>

      <div style={styles.grid}>
        {cards.map((card) => (
          <Link to={card.to} key={card.to} style={styles.link}>
            <div className="admin-card" style={styles.card}>
              <div style={styles.iconWrap}>{card.icon}</div>
              <div style={styles.cardText}>
                <h2 style={styles.cardTitle}>{card.title}</h2>
                <p style={styles.cardDesc}>{card.desc}</p>
              </div>
              <span className="admin-card-arrow" style={styles.arrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "56px 40px",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  header: {
    marginBottom: 40,
  },
  eyebrow: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: "#6b7280",
  },
  title: {
    margin: "4px 0 8px",
    fontSize: 34,
    fontWeight: 700,
    color: "#111827",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: 0,
    fontSize: 15,
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
    maxWidth: 760,
  },
  link: {
    textDecoration: "none",
  },
  card: {
    background: "#111827",
    color: "#fff",
    borderRadius: 16,
    border: "1px solid #111827",
    padding: "26px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minHeight: 150,
    cursor: "pointer",
    position: "relative",
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    margin: "0 0 6px",
    fontSize: 18,
    fontWeight: 600,
  },
  cardDesc: {
    margin: 0,
    fontSize: 13.5,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.65)",
  },
  arrow: {
    position: "absolute",
    top: 24,
    right: 22,
    color: "rgba(255,255,255,0.5)",
    opacity: 0.6,
    transition: "transform 0.15s ease, opacity 0.15s ease",
  },
};