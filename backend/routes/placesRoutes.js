// placesRoutes.js
import express from "express";
import db from "../database/db.js";
import multer from "multer";
import {
    getAllRegions,
    getPlaces,
    getPlaceById,
    addPlace,
    updatePlace,
    deletePlace,
    clearCache
} from "../controllers/placesControllers.js";

const router = express.Router();

// multer setup for optional image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// routes
router.get("/regions", getAllRegions);
router.get("/", getPlaces);
router.get("/:id", getPlaceById);

// NEW: Clear cache endpoint
router.post("/clear-cache", clearCache);

// add a new place (with optional image upload)
router.post("/", upload.single("image"), async (req, res) => {
    // if user uploads an image, use it; otherwise controller will get unsplash image
    if (req.file) {
        const { name, province, region, description } = req.body;
        const image_url = req.file.filename;

        const sql = "INSERT INTO places (name, province, region, description, image_url) VALUES (?, ?, ?, ?, ?)";

        try {
            const [results] = await db.query(sql, [name, province, region, description, image_url]);
            res.status(201).json({
                id: results.insertId,
                name,
                province,
                region,
                description,
                image_url
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        // No file uploaded, use controller's Unsplash logic
        await addPlace(req, res);
    }
});

// Update a place (with optional image upload)
router.put("/:id", upload.single("image"), async (req, res) => {
    if (req.file) {
        const { name, province, region, description } = req.body;
        const image_url = req.file.filename;

        const sql = "UPDATE places SET name = ?, province = ?, region = ?, description = ?, image_url = ? WHERE id = ?";

        try {
            const [results] = await db.query(sql, [name, province, region, description, image_url, req.params.id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Place not found" });
            }
            res.json({ message: "Place updated successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        // No file uploaded, use controller's Unsplash logic
        await updatePlace(req, res);
    }
});

router.delete("/:id", deletePlace);

export default router;