import { useState } from "react";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 15,
};

const buttonStyle = {
  padding: "14px",
  borderRadius: 12,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontSize: 16,
  cursor: "pointer",
};

export default function AddProperty() {
  const [images, setImages] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async () => {
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

    images.forEach((image) => {
      form.append("images", image);
    });

    const res = await axios.post(
      "http://localhost:8000/api/properties",
      form,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
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
  }
};

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 40,
      }}
    >
      <h1
        style={{
          fontSize: 36,
          marginBottom: 30,
        }}
      >
        Add Property
      </h1>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        <label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Property Title
  </label>
        <input
          name="title"
          placeholder="Property Title"
          style={inputStyle}
          value={formData.title}
          onChange={handleChange}
        />
        <label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Price
  </label>

        <input
          name="price"
          placeholder="Price"
          style={inputStyle}
          value={formData.price}
          onChange={handleChange}
        />
        <label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Area
  </label>

        <input
          name="area"
          placeholder="Area"
          style={inputStyle}
          value={formData.area}
          onChange={handleChange}
        />
<label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Size
  </label>
        <input
          name="size"
          placeholder="Size"
          style={inputStyle}
          value={formData.size}
          onChange={handleChange}
        />
<label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Property Type
  </label>
        <select
          name="type"
          style={inputStyle}
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
        </select>
<label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
   Category
  </label>
        <select
          name="category"
          style={inputStyle}
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Residential">
            Residential
          </option>
          <option value="Commercial">
            Commercial
          </option>
        </select>
<label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Bedrooms
  </label>
        <input
          name="beds"
          placeholder="Bedrooms"
          style={inputStyle}
          value={formData.beds}
          onChange={handleChange}
        />
<label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Bathrooms
  </label>
        <input
          name="baths"
          placeholder="Bathrooms"
          style={inputStyle}
          value={formData.baths}
          onChange={handleChange}
        />
<label
    style={{
      display: "block",
      fontWeight: 600,
    }}
  >
    Parking
  </label>
        <select
          name="parking"
          style={inputStyle}
          value={formData.parking}
          onChange={handleChange}
        >
          <option value="">
            Parking Available?
          </option>

          <option value="true">
            Yes
          </option>

          <option value="false">
            No
          </option>
        </select>

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          style={inputStyle}
          value={formData.tags}
          onChange={handleChange}
        />

        <textarea
          name="desc"
          placeholder="Description"
          rows={6}
          value={formData.desc}
          onChange={handleChange}
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />

        {/* Image Upload */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            Property Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(
                e.target.files
              );

              setImages((prev) => [
                ...prev,
                ...files,
              ]);
            }}
            style={{
              width: "100%",
              padding: 14,
              border: "1px dashed #bbb",
              borderRadius: 12,
              background: "#fafafa",
            }}
          />

          {/* Preview Images */}
          {images.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 18,
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 14,
                    overflow: "hidden",
                    border:
                      "1px solid #ddd",
                    position: "relative",
                  }}
                >
                  <img
                    src={URL.createObjectURL(
                      img
                    )}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      right: 6,
                      background:
                        "rgba(0,0,0,0.6)",
                      color: "#fff",
                      fontSize: 12,
                      padding: "2px 6px",
                      borderRadius: 20,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          style={buttonStyle}
          onClick={handleSubmit}
        >
          Add Property
        </button>
      </div>
    </div>
  );
}