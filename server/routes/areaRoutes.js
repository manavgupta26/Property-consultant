import express from "express";
import Area from "../models/Area.js";

const router = express.Router();


// GET ALL AREAS
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find().sort({
      name: 1,
    });

    res.json(areas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ADD AREA
router.post("/", async (req, res) => {
  try {
    const existing = await Area.findOne({
      name: req.body.name,
    });

    if (existing) {
      return res.status(400).json({
        message: "Area already exists",
      });
    }

    const area = new Area({
      name: req.body.name,
    });

    const savedArea = await area.save();

    res.status(201).json(savedArea);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE AREA
router.delete("/:id", async (req, res) => {
  try {
    await Area.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Area deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;