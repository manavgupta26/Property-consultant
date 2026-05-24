import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://property-consultant.vercel.app",
    credentials: true,
  })
);
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
  })
  .catch((err) => console.log(err));