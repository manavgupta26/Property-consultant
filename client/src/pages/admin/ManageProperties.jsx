import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProperties() {
  const [properties, setProperties] =
    useState([]);

  const [editingProperty, setEditingProperty] =
    useState(null);

  const [newImages, setNewImages] =
    useState([]);

  const [existingImages, setExistingImages] =
    useState([]);

  const [formData, setFormData] =
    useState({
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
      const res = await axios.get(
        "https://property-consultant.onrender.com/api/properties"
      );

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeExistingImage = (img) => {
    setExistingImages((prev) =>
      prev.filter((i) => i !== img)
    );
  };

  const removeNewImage = (index) => {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "tags") {
          form.append(
            key,
            JSON.stringify(
              formData.tags
                .split(",")
                .map((tag) => tag.trim())
            )
          );
        } else {
          form.append(key, formData[key]);
        }
      });

      form.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      newImages.forEach((img) => {
        form.append("images", img);
      });

      await axios.put(
        `https://property-consultant.onrender.com/api/properties/${editingProperty._id}`,
        
        form,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
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
    }
  };

  if (editingProperty) {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: 40,
        }}
      >
        <h1>Edit Property</h1>

        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            style={inputStyle}
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            style={inputStyle}
          />

          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area"
            style={inputStyle}
          />

          <input
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Size"
            style={inputStyle}
          />

          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows={5}
            placeholder="Description"
            style={inputStyle}
          />

          {/* Existing Images */}
          <div>
            <h3>Current Images</h3>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {existingImages.map(
                (img, index) => (
                  <div
                    key={index}
                    style={imageBox}
                  >
                    <img
                      src={img}
                      alt=""
                      style={imageStyle}
                    />

                    <button
                      onClick={() =>
                        removeExistingImage(
                          img
                        )
                      }
                      style={removeBtn}
                    >
                      X
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Add New Images */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(
                e.target.files
              );

              setNewImages((prev) => [
                ...prev,
                ...files,
              ]);
            }}
          />

          {/* New Image Preview */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {newImages.map((img, index) => (
              <div
                key={index}
                style={imageBox}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                  style={imageStyle}
                />

                <button
                  style={removeBtn}
                  onClick={() =>
                    removeNewImage(index)
                  }
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <button
            style={buttonStyle}
            onClick={handleUpdate}
          >
            Update Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Manage Properties</h1>

      {properties.map((property) => (
        <div
          key={property._id}
          style={{
            padding: 20,
            background: "#fff",
            marginBottom: 20,
            borderRadius: 14,
          }}
        >
          <h3>{property.title}</h3>

          <button
            style={buttonStyle}
            onClick={() =>
              handleEdit(property)
            }
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  border: "1px solid #ddd",
};

const buttonStyle = {
  padding: 14,
  borderRadius: 12,
  border: "none",
  background: "#111827",
  color: "#fff",
  cursor: "pointer",
};

const imageBox = {
  width: 120,
  height: 120,
  position: "relative",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 12,
};

const removeBtn = {
  position: "absolute",
  top: 6,
  right: 6,
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 24,
  height: 24,
  cursor: "pointer",
};