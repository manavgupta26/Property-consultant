import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Admin from "./models/Admin.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword =
      await bcrypt.hash(
        "123456",
        10
      );

    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin Created");

    process.exit();
  });