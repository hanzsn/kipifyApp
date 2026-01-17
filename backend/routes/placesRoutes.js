// placesRoutes.js
import express from "express";
import {
  getAllRegions,
  getPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace,
  clearCache,
} from "../controllers/placesControllers.js";

const router = express.Router();

// Routes
router.get("/regions", getAllRegions);
router.get("/", getPlaces);
router.get("/:id", getPlaceById);

// Clear cache endpoint
router.post("/clear-cache", clearCache);

// Add a new place (Pexels images only - no file uploads in serverless)
router.post("/", addPlace);

// Update a place (Pexels images only)
router.put("/:id", updatePlace);

// Delete a place
router.delete("/:id", deletePlace);

export default router;
