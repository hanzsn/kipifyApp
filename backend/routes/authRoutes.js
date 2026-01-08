// authRoutes.js
import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT NOW() AS currentTime");
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;