import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import placesRouter from "../routes/placesRoutes.js";
import testRouter from "../routes/authRoutes.js";
import { getUnsplashImage } from "../utils/unsplashHelper.js";

dotenv.config();

const app = express();

app.set("json spaces", 2);
app.use(compression());

// CORS - Allow all origins for Vercel
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

// Root route
app.get("/api", (req, res) => {
  res.json({
    message: "Philippines Travel API",
    status: "ok",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/places", placesRouter);
app.use("/api/test", testRouter);

// Test Pexels endpoint
app.get("/api/test-unsplash", async (req, res) => {
  try {
    const testPlace = req.query.place || "Boracay";
    console.log(`Testing Pexels for: ${testPlace}`);

    const imageUrl = await getUnsplashImage(testPlace);
    res.json({
      place: testPlace,
      imageUrl,
      isWorking: imageUrl.includes("pexels.com"),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Export for Vercel serverless
export default app;
