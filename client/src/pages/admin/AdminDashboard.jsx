import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div
      style={{
        padding: 40,
      }}
    >
      <h1
        style={{
          fontSize: 40,
          marginBottom: 30,
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link to="/admin/add">
          <button style={cardBtn}>
            Add Property
          </button>
        </Link>

        <Link to="/admin/properties">
          <button style={cardBtn}>
            Manage Properties
          </button>
        </Link>
      </div>
    </div>
  );
}

const cardBtn = {
  width: 220,
  height: 120,
  borderRadius: 20,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontSize: 18,
  cursor: "pointer",
};