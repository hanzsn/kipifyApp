// seedPlaces.js - FIXED
import db from "../database/db.js";
import { getUnsplashImage } from "./unsplashHelper.js";
import dotenv from "dotenv";

dotenv.config();

const famousPlaces = [
  // ... your places array stays the same
];

const seedDatabase = async () => {
  console.log("Starting to seed database with famous places...\n");

  const clearData = true;

  try {
    if (clearData) {
      await db.query("DELETE FROM places");
      console.log("Cleared existing places\n");
    }

    let successCount = 0;
    let failCount = 0;

    for (const place of famousPlaces) {
      try {
        console.log(`Adding: ${place.name} (${place.province})`);

        const image_url = await getUnsplashImage(place.name);

        await db.query(
          "INSERT INTO places (name, province, description, region, image_url) VALUES (?, ?, ?, ?, ?)",
          [
            place.name,
            place.province,
            place.description,
            place.region,
            image_url,
          ]
        );

        console.log(`    Added successfully\n`);
        successCount++;

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`    Error adding ${place.name}:`, error.message, "\n");
        failCount++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log(` Successfully added: ${successCount} places`);
    console.log(` Failed: ${failCount} places`);
    console.log("=".repeat(50));
  } catch (error) {
    console.error("Fatal error:", error);
  } finally {
    await db.end();
    process.exit(0);
  }
};

seedDatabase();
