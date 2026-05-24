import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

const router = express.Router();

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const admin =
        await Admin.findOne({
          email,
        });

      if (!admin) {
        return res
          .status(401)
          .json({
            message:
              "Invalid Credentials",
          });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (!isMatch) {
        return res
          .status(401)
          .json({
            message:
              "Invalid Credentials",
          });
      }

      const token = jwt.sign(
        {
          id: admin._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;