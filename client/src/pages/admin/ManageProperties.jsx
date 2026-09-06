import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProperty, setEditingProperty] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://property-consultant.onrender.com/api/properties"
      );
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setNewImages([]);

    setFormData({
      title: property.title || "",
      price: property.price || "",
      area: property.area || "",
      size: property.size || "",
      type: property.type || "",
      category: property.category || "",
      beds: property.beds || "",
      baths: property.baths || "",
      parking: property.parking || false,
      tags: property.tags?.join(", ") || "",
      desc: property.desc || "",
    });

    setExistingImages(property.images || []);
  };

  const handleCancel = () => {
    setEditingProperty(null);
    setNewImages([]);
    setExistingImages([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeExistingImage = (img) => {
    setExistingImages((prev) => prev.filter((i) => i !== img));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
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

      form.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((img) => {
        form.append("images", img);
      });

      await axios.put(
        `https://property-consultant.onrender.com/api/properties/${editingProperty._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Updated Successfully");
      setEditingProperty(null);
      fetchProperties();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    } finally {
      setSaving(false);
    }
  };

  // ---------- EDIT VIEW ----------
  if (editingProperty) {
    return (
      <div style={styles.page}>
        <div style={styles.editWrap}>
          <div style={styles.editHeader}>
            <div>
              <p style={styles.eyebrow}>Editing</p>
              <h1 style={styles.h1}>{editingProperty.title || "Property"}</h1>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={styles.secondaryBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button
                style={{ ...styles.primaryBtn, opacity: saving ? 0.6 : 1 }}
                onClick={handleUpdate}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>

          <div style={styles.formCard}>
            <div style={styles.sectionTitle}>Basic details</div>
            <div style={styles.fieldRow}>
              <Field label="Title">
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
              <Field label="Area / Locality">
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. Bandra West"
                  style={styles.input}
                />
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
              <Field label="Type">
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g. Apartment"
                  style={styles.input}
                />
              </Field>
              <Field label="Category">
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Residential"
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
              <Field label="Beds">
                <input
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  style={styles.input}
                />
              </Field>
              <Field label="Baths">
                <input
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  style={styles.input}
                />
              </Field>
            </div>

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

            {existingImages.length > 0 && (
              <>
                <p style={styles.subLabel}>Current images</p>
                <div style={styles.imageRow}>
                  {existingImages.map((img, index) => (
                    <div key={index} style={styles.imageBox}>
                      <img src={img} alt="" style={styles.imageThumb} />
                      <button
                        onClick={() => removeExistingImage(img)}
                        style={styles.removeBtn}
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p style={styles.subLabel}>Add new images</p>
            <label style={styles.uploadBox}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setNewImages((prev) => [...prev, ...files]);
                }}
                style={{ display: "none" }}
              />
              + Choose files
            </label>

            {newImages.length > 0 && (
              <div style={styles.imageRow}>
                {newImages.map((img, index) => (
                  <div key={index} style={styles.imageBox}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      style={styles.imageThumb}
                    />
                    <button
                      style={styles.removeBtn}
                      onClick={() => removeNewImage(index)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.editFooter}>
            <button style={styles.secondaryBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button
              style={{ ...styles.primaryBtn, opacity: saving ? 0.6 : 1 }}
              onClick={handleUpdate}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- LIST VIEW ----------
  return (
    <div style={styles.page}>
      <div style={styles.listWrap}>
        <div style={styles.listHeader}>
          <div>
            <p style={styles.eyebrow}>Admin</p>
            <h1 style={styles.h1}>Manage Properties</h1>
          </div>
          {!loading && (
            <span style={styles.countPill}>
              {properties.length} {properties.length === 1 ? "listing" : "listings"}
            </span>
          )}
        </div>

        {loading ? (
          <p style={styles.emptyText}>Loading properties…</p>
        ) : properties.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ margin: 0, fontWeight: 600 }}>No properties yet</p>
            <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>
              Properties you add will show up here.
            </p>
          </div>
        ) : (
          <div style={styles.propertyGrid}>
            {properties.map((property) => (
              <div key={property._id} style={styles.propertyCard}>
                {property.images?.[0] ? (
                  <img
                    src={property.images[0]}
                    alt=""
                    style={styles.cardImage}
                  />
                ) : (
                  <div style={styles.cardImagePlaceholder}>No image</div>
                )}

                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{property.title}</h3>
                  <p style={styles.cardMeta}>
                    {[property.area, property.type]
                      .filter(Boolean)
                      .join(" · ") || "No details added"}
                  </p>
                  {property.price && (
                    <p style={styles.cardPrice}>{property.price}</p>
                  )}

                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(property)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

  // Shared
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

  // List view
  listWrap: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  listHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 28,
    flexWrap: "wrap",
    gap: 12,
  },
  countPill: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    background: "#f3f4f6",
    borderRadius: 999,
    padding: "6px 14px",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
  emptyState: {
    background: "#fff",
    border: "1px dashed #ddd",
    borderRadius: 14,
    padding: 40,
    textAlign: "center",
  },
  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  propertyCard: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  cardImagePlaceholder: {
    width: "100%",
    height: 150,
    background: "#f3f4f6",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
  },
  cardBody: {
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  cardMeta: {
    margin: 0,
    fontSize: 13,
    color: "#6b7280",
  },
  cardPrice: {
    margin: "4px 0 10px",
    fontSize: 15,
    fontWeight: 700,
  },
  editBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
    fontSize: 13.5,
    fontWeight: 600,
    alignSelf: "flex-start",
  },

  // Edit view
  editWrap: {
    maxWidth: 720,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  editHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
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
  imageRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 20,
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
  editFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
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