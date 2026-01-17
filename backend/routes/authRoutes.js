// authRoutes.js - Updated with Admin Login
import express from "express";
import db from "../database/db.js";

const router = express.Router();

// Get admin password from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "TripifyAdmin2025!";

// Test route (existing)
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT NOW() AS currentTime");
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route - verify password
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (password === ADMIN_PASSWORD) {
    // Generate simple token (timestamp-based)
    const token = Buffer.from(`admin:${Date.now()}`).toString("base64");

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }
});

// Verify token route
router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    // Decode token
    const decoded = Buffer.from(token, "base64").toString("utf-8");

    // Check if token format is correct (starts with "admin:")
    if (decoded.startsWith("admin:")) {
      const timestamp = parseInt(decoded.split(":")[1]);
      const now = Date.now();
      const hourInMs = 60 * 60 * 1000;

      // Token valid for 24 hours
      if (now - timestamp < 24 * hourInMs) {
        return res.json({
          success: true,
          message: "Token is valid",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }
    }

    res.status(401).json({
      success: false,
      message: "Invalid token format",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

// Logout route (optional)
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
