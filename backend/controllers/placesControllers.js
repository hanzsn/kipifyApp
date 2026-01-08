// placesController.js - OPTIMIZED WITH CACHING + CATEGORY SUPPORT + DUPLICATE PREVENTION
import db from "../database/db.js";
import { getUnsplashImage } from "../utils/unsplashHelper.js";

// simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get cached data or fetch new
const getCached = (key, fetchFunction) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Cache HIT: ${key}`);
    return cached.data;
  }
  console.log(`Cache MISS: ${key}`);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Category mapping helper
const getCategoryFromPlace = (place) => {
  const nameLower = place.name.toLowerCase();
  const descLower = place.description.toLowerCase();

  // Beaches & Islands
  if (
    nameLower.includes("beach") ||
    nameLower.includes("island") ||
    nameLower.includes("sandbar") ||
    nameLower.includes("cove") ||
    descLower.includes("beach") ||
    descLower.includes("island") ||
    descLower.includes("white sand") ||
    descLower.includes("diving")
  ) {
    return "beaches";
  }

  // Mountains & Nature
  if (
    nameLower.includes("mount") ||
    nameLower.includes("falls") ||
    nameLower.includes("river") ||
    nameLower.includes("lake") ||
    nameLower.includes("volcano") ||
    nameLower.includes("hill") ||
    descLower.includes("mountain") ||
    descLower.includes("waterfall") ||
    descLower.includes("volcano") ||
    descLower.includes("hiking")
  ) {
    return "mountains";
  }

  // Cities & Culture
  if (
    nameLower.includes("city") ||
    nameLower.includes("manila") ||
    nameLower.includes("vigan") ||
    nameLower.includes("intramuros") ||
    descLower.includes("heritage") ||
    descLower.includes("colonial") ||
    descLower.includes("unesco") ||
    descLower.includes("historic") ||
    descLower.includes("city") ||
    descLower.includes("church")
  ) {
    return "cities";
  }

  // Hidden Gems (less touristy places)
  if (
    descLower.includes("remote") ||
    descLower.includes("pristine") ||
    descLower.includes("hidden") ||
    descLower.includes("secret") ||
    nameLower.includes("masungi") ||
    nameLower.includes("britania") ||
    nameLower.includes("balabac")
  ) {
    return "hidden-gems";
  }

  // Default to hidden gems if uncertain
  return "hidden-gems";
};

// get all regions
export const getAllRegions = (req, res) => {
  res.json(["Luzon", "Visayas", "Mindanao"]);
};

// get all places (OPTIMIZED - WITH CATEGORY SUPPORT)
export const getPlaces = async (req, res) => {
  const { province, region, category } = req.query;
  const cacheKey = `places_${province || "all"}_${region || "all"}_${
    category || "all"
  }`;

  // check cache first
  const cachedData = getCached(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  let sql = "SELECT * FROM places";
  const params = [];

  const conditions = [];
  if (province) conditions.push("province = ?");
  if (region) conditions.push("region = ?");

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
    if (province) params.push(province);
    if (region) params.push(region);
  }

  try {
    const startTime = performance.now();
    const [results] = await db.query(sql, params);
    console.log(`Query took: ${(performance.now() - startTime).toFixed(2)}ms`);

    // Map places to categories
    let places = results.map((place) => ({
      ...place,
      image_url:
        place.image_url ||
        "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: getCategoryFromPlace(place),
    }));

    // Filter by category if specified
    if (category) {
      places = places.filter((place) => place.category === category);
      console.log(
        `Filtered to ${places.length} places in category: ${category}`
      );
    }

    setCache(cacheKey, places);
    res.json(places);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

// get place by ID (OPTIMIZED)
export const getPlaceById = async (req, res) => {
  const cacheKey = `place_${req.params.id}`;

  // check cache
  const cachedData = getCached(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  const sql = "SELECT * FROM places WHERE id = ?";

  try {
    const [results] = await db.query(sql, [req.params.id]);

    if (!results[0]) {
      return res.status(404).json({ error: "Place not found" });
    }

    const place = {
      ...results[0],
      image_url:
        results[0].image_url ||
        "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: getCategoryFromPlace(results[0]),
    };

    setCache(cacheKey, place);
    res.json(place);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

// add a new place (WITH DUPLICATE CHECK)
export const addPlace = async (req, res) => {
  const { name, province, description, region } = req.body;

  try {
    // CHECK FOR DUPLICATES - Case insensitive comparison
    const checkSql =
      "SELECT id, name, province FROM places WHERE LOWER(name) = LOWER(?) AND LOWER(province) = LOWER(?)";
    const [existing] = await db.query(checkSql, [name, province]);

    if (existing.length > 0) {
      console.log(
        `Duplicate detected: ${name} in ${province} (ID: ${existing[0].id})`
      );
      return res.status(409).json({
        error: `Place "${name}" in ${province} already exists!`,
        existingPlace: existing[0],
      });
    }

    // Get Unsplash image ONLY when adding new place
    console.log(`No duplicate found. Adding ${name}...`);
    const image_url = await getUnsplashImage(name);

    const sql =
      "INSERT INTO places (name, province, region, description, image_url) VALUES (?, ?, ?, ?, ?)";

    const [results] = await db.query(sql, [
      name,
      province,
      region,
      description,
      image_url,
    ]);

    // clear cache
    cache.clear();

    res.status(201).json({
      id: results.insertId,
      name,
      province,
      region,
      description,
      image_url,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

// update a place
export const updatePlace = async (req, res) => {
  const { id } = req.params;
  const { name, province, region, description } = req.body;

  // only fetch new image if name changed
  const image_url = await getUnsplashImage(name);

  const sql =
    "UPDATE places SET name = ?, province = ?, region = ?, description = ?, image_url = ? WHERE id = ?";

  try {
    const [results] = await db.query(sql, [
      name,
      province,
      region,
      description,
      image_url,
      id,
    ]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Place not found" });
    }

    // clear cache
    cache.clear();

    res.json({ message: "Place updated successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

// delete a place
export const deletePlace = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM places WHERE id = ?";

  try {
    const [results] = await db.query(sql, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Place not found" });
    }

    // clear cache
    cache.clear();

    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

// clear cache endpoint (for testing)
export const clearCache = (req, res) => {
  cache.clear();
  res.json({ message: "Cache cleared successfully" });
};
