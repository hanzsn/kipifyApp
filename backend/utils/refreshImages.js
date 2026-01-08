// refreshImages.js - FIXED FOR YOUR SETUP
import db from "../database/db.js";
import { getUnsplashImage } from "./unsplashHelper.js";
import dotenv from "dotenv";

dotenv.config();

const BATCH_SIZE = 10;

const refreshAllImages = async () => {
  console.log("Starting to refresh all images in batches...\n");

  try {
    // Correct way to query with mysql2/promise pool
    const [results] = await db.query("SELECT * FROM places");

    console.log(`Found ${results.length} places to update`);
    console.log(`Processing in batches of ${BATCH_SIZE}\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < results.length; i += BATCH_SIZE) {
      const batch = results.slice(i, i + BATCH_SIZE);
      console.log(
        `\nBatch ${Math.floor(i / BATCH_SIZE) + 1} (${i + 1}-${
          i + batch.length
        })`
      );

      for (const place of batch) {
        console.log(`  [${place.id}] ${place.name}`);

        try {
          const newImageUrl = await getUnsplashImage(place.name);

          // Promise-based update (no callback!)
          await db.query("UPDATE places SET image_url = ? WHERE id = ?", [
            newImageUrl,
            place.id,
          ]);

          console.log(`     Updated\n`);
          successCount++;
        } catch (error) {
          console.error(`     Error: ${error.message}\n`);
          failCount++;
        }

        // Wait between requests to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Memory check after each batch
      const memUsage = process.memoryUsage();
      console.log(`Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);

      // Pause between batches
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.log("\n" + "=".repeat(50));
    console.log(`Successfully updated: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log("=".repeat(50));
  } catch (error) {
    console.error("Fatal error:", error);
  } finally {
    // Close the pool properly
    await db.end();
    process.exit(0);
  }
};

refreshAllImages();
