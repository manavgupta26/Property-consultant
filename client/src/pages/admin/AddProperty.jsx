import { useState, useEffect } from "react";
import axios from "axios";

export default function AddProperty() {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState("");
  const [showNewArea, setShowNewArea] = useState(false);
  const [addingArea, setAddingArea] = useState(false);

  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    area: "",
    size: "",
    type: "",
    category: "",
    beds: "",
    baths: "",
    parking: false,
    tags: "",
    desc: "",
  });

  const fetchAreas = async () => {
    try {
      const res = await axios.get(
        "https://property-consultant.onrender.com/api/areas"
      );
      setAreas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAreaSelect = (e) => {
    if (e.target.value === "add-new") {
      setShowNewArea(true);
      setFormData((prev) => ({ ...prev, area: "" }));
    } else {
      setShowNewArea(false);
      setFormData((prev) => ({ ...prev, area: e.target.value }));
    }
  };

  const handleAddArea = async () => {
    if (!newArea.trim()) return;

    try {
      setAddingArea(true);
      const res = await axios.post(
        "https://property-consultant.onrender.com/api/areas",
        { name: newArea },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setAreas((prev) => [...prev, res.data]);
      setFormData((prev) => ({ ...prev, area: res.data.name }));
      setNewArea("");
      setShowNewArea(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAddingArea(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "tags") {
          form.append(
            key,
            JSON.stringify(formData.tags.split(",").map((tag) => tag.trim()))
          );
        } else {
          form.append(key, formData[key]);
        }
      });

      images.forEach((image) => {
        form.append("images", image);
      });

      const res = await axios.post(
        "https://property-consultant.onrender.com/api/properties",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);
      alert("Property Added Successfully");

      setFormData({
        title: "",
        price: "",
        area: "",
        size: "",
        type: "",
        category: "",
        beds: "",
        baths: "",
        parking: false,
        tags: "",
        desc: "",
      });
      setImages([]);
    } catch (error) {
      console.log(error);
      alert("Error Adding Property");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>Admin</p>
            <h1 style={styles.h1}>Add Property</h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{ ...styles.primaryBtn, opacity: submitting ? 0.6 : 1 }}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Adding…" : "Add property"}
            </button>
          </div>
        </div>

        <div style={styles.formCard}>
          <div style={styles.sectionTitle}>Basic details</div>

          <div style={styles.fieldRow}>
            <Field label="Property Title">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. 3BHK Sea View Apartment"
                style={styles.input}
              />
            </Field>
          </div>

          <div style={styles.fieldGrid}>
            <Field label="Price">
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1,20,00,000"
                style={styles.input}
              />
            </Field>

            <Field label="Property Type">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Type</option>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
              </select>
            </Field>

            <Field label="Category">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Category</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </Field>
          </div>
        </div>

        <div style={styles.formCard}>
          <div style={styles.sectionTitle}>Location & specs</div>

          <div style={styles.fieldGrid}>
            <Field label="Area">
              <select
                name="area"
                value={showNewArea ? "add-new" : formData.area}
                onChange={handleAreaSelect}
                style={styles.input}
              >
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option key={area._id} value={area.name}>
                    {area.name}
                  </option>
                ))}
                <option value="add-new">+ Add New Area</option>
              </select>
            </Field>

            <Field label="Size (sq. ft.)">
              <input
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g. 1450"
                style={styles.input}
              />
            </Field>

            <Field label="Bedrooms">
              <input
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                placeholder="e.g. 3"
                style={styles.input}
              />
            </Field>

            <Field label="Bathrooms">
              <input
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                placeholder="e.g. 2"
                style={styles.input}
              />
            </Field>

            <Field label="Tags (comma separated)">
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. luxury, sea-facing"
                style={styles.input}
              />
            </Field>
          </div>

          {showNewArea && (
            <div style={styles.newAreaRow}>
              <input
                placeholder="Enter new area"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                style={styles.input}
              />
              <button
                type="button"
                style={{ ...styles.secondaryBtn, opacity: addingArea ? 0.6 : 1 }}
                onClick={handleAddArea}
                disabled={addingArea}
              >
                {addingArea ? "Adding…" : "Add"}
              </button>
            </div>
          )}

          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
              style={{ width: 16, height: 16 }}
            />
            Parking available
          </label>

          <Field label="Description">
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the property…"
              style={{ ...styles.input, resize: "vertical" }}
            />
          </Field>
        </div>

        <div style={styles.formCard}>
          <div style={styles.sectionTitle}>Photos</div>

          <p style={styles.subLabel}>Property images</p>
          <label style={styles.uploadBox}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImages((prev) => [...prev, ...files]);
              }}
              style={{ display: "none" }}
            />
            + Choose files
          </label>

          {images.length > 0 && (
            <div style={styles.imageRow}>
              {images.map((img, index) => (
                <div key={index} style={styles.imageBox}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    style={styles.imageThumb}
                  />
                  <span style={styles.imageIndex}>{index + 1}</span>
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeImage(index)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <button
            style={{ ...styles.primaryBtn, opacity: submitting ? 0.6 : 1 }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Adding…" : "Add property"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 40px 80px",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: "#111827",
  },
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  eyebrow: {
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    color: "#6b7280",
  },
  h1: {
    margin: "4px 0 0",
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  formCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 18,
  },
  fieldRow: {
    marginBottom: 16,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
    marginBottom: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "11px 13px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  newAreaRow: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
    marginTop: -4,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  subLabel: {
    fontSize: 12.5,
    fontWeight: 600,
    color: "#374151",
    margin: "0 0 10px",
  },
  uploadBox: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px dashed #ccc",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
  },
  imageRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 18,
  },
  imageBox: {
    width: 110,
    height: 110,
    position: "relative",
  },
  imageThumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
    border: "1px solid #eee",
  },
  imageIndex: {
    position: "absolute",
    bottom: 6,
    right: 6,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: 11,
    padding: "2px 6px",
    borderRadius: 20,
  },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 22,
    height: 22,
    cursor: "pointer",
    fontSize: 14,
    lineHeight: 1,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryBtn: {
    padding: "11px 20px",
    borderRadius: 10,
    border: "none",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  secondaryBtn: {
    padding: "11px 20px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fff",
    color: "#111827",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
};