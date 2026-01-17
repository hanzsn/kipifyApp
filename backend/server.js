import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import placesRouter from "./routes/placesRoutes.js";
import testRouter from "./routes/authRoutes.js";
import { getUnsplashImage } from "./utils/unsplashHelper.js";
import compression from "compression";

// load .env from backend folder
dotenv.config();

const app = express();

app.set("json spaces", 2);

app.use(compression());

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://127.0.0.1:5501",
    ],
    credentials: true,
  }),
);

app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static("uploads"));

// root route
app.get("/", (req, res) => res.send("Backend is running!"));

app.get("/api/debug", (req, res) => res.send("Debug route works"));

// API routes
app.use("/api/places", placesRouter);
app.use("/api/auth", testRouter);

app.get("/test-unsplash", async (req, res) => {
  const testPlace = req.query.place || "Boracay";
  console.log(`Testing Unsplash for: ${testPlace}`);

  const imageUrl = await getUnsplashImage(testPlace);
  res.json({
    place: testPlace,
    imageUrl,
    isWorking: imageUrl.includes("pexels.com"),
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
