import express from "express";
import Property from "../models/Property.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const properties = await Property.find();

  res.json(properties);
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res
        .status(404)
        .json({
          message: "Property not found",
        });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put(
  "/:id",
  authMiddleware,
  upload.array("images"),
  async (req, res) => {
    try {
      const existingImages =
        JSON.parse(
          req.body.existingImages || "[]"
        );

      const newImageUrls =
        req.files?.map(
          (file) => file.path
        ) || [];

      const updatedData = {
        ...req.body,
        tags: JSON.parse(req.body.tags),
        images: [
          ...existingImages,
          ...newImageUrls,
        ],
      };

      const updatedProperty =
        await Property.findByIdAndUpdate(
          req.params.id,
          updatedData,
          { new: true }
        );

      res.json(updatedProperty);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),

  async (req, res) => {
    try {
      const imageUrls = req.files.map(
        (file) => file.path
      );

      const property = new Property({
        ...req.body,

        tags: JSON.parse(req.body.tags),

        images: imageUrls,
      });

      await property.save();

      res.status(201).json(property);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;