import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    category: String,
    area: String,
    price: String,
    size: String,
    beds: Number,
    baths: Number,
    parking: Boolean,
    tags: [String],
    desc: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model(
  "Property",
  propertySchema
);