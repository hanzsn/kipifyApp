// addMissing.js - FIXED
import db from "../database/db.js";
import { getUnsplashImage } from "./unsplashHelper.js";

const missingPlaces = [
    // your missing places array
];

const addMissing = async () => {
    console.log("Checking which places are actually missing...\n");

    try {
        // Use promise syntax
        const [existingPlaces] = await db.query("SELECT name FROM places");
        const existingNames = existingPlaces.map(p => p.name);

        console.log(`Database currently has: ${existingNames.length} places\n`);

        const allPlacesFromSeed = [
            // ... your places
        ];

        const missing = allPlacesFromSeed.filter(place =>
            !existingNames.includes(place.name)
        );

        console.log(`Missing ${missing.length} places:\n`);
        missing.forEach((place, i) => {
            console.log(`${i + 1}. ${place.name}`);
        });

        if (missing.length === 0) {
            console.log("\nAll places already exist!");
            await db.end();
            process.exit(0);
            return;
        }

        console.log(`\nAdding ${missing.length} missing places...\n`);

        let success = 0;
        let failed = 0;

        for (const place of missing) {
            try {
                console.log(`Adding: ${place.name}...`);

                const image_url = await getUnsplashImage(place.name);

                await db.query(
                    "INSERT INTO places (name, province, description, region, image_url) VALUES (?, ?, ?, ?, ?)",
                    [place.name, place.province, place.description, place.region, image_url]
                );

                console.log(`Added successfully\n`);
                success++;

                await new Promise(resolve => setTimeout(resolve, 2000));

            } catch (error) {
                console.error(`Failed:`, error.message, "\n");
                failed++;
            }
        }

        console.log("\n" + "=".repeat(50));
        console.log(`Successfully added: ${success}`);
        console.log(`Failed: ${failed}`);
        console.log(`Total in database: ${existingNames.length + success}`);
        console.log("=".repeat(50));

    } catch (error) {
        console.error("Fatal error:", error);
    } finally {
        await db.end();
        process.exit(0);
    }
};

addMissing();