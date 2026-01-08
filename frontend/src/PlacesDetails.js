// PlacesDetails.js - OPTIMIZED (No repeated Wikipedia calls)
import { placesAPI } from "./Api.js";

// cache Wikipedia results in sessionStorage
const CACHE_KEY = "place_details_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const getCachedDetails = (placeId) => {
  try {
    const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "{}");
    const cached = cache[placeId];

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Using cached Wikipedia data");
      return cached.data;
    }
  } catch (e) {
    console.error("Cache error:", e);
  }
  return null;
};

const setCachedDetails = (placeId, data) => {
  try {
    const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "{}");
    cache[placeId] = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error("Cache save error:", e);
  }
};

async function getPlaceInfo(placeName, province) {
  try {
    console.log("Searching Wikipedia for:", placeName, province);

    const searchQuery = `${placeName} ${province} Philippines`;
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      searchQuery
    )}&format=json&origin=*`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.query || !searchData.query.search.length) {
      console.log("No Wikipedia results found");
      return null;
    }

    const pageTitle = searchData.query.search[0].title;
    console.log("Found page:", pageTitle);

    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
      pageTitle
    )}&format=json&origin=*`;

    const contentResponse = await fetch(contentUrl);
    const contentData = await contentResponse.json();

    const pages = contentData.query.pages;
    const pageId = Object.keys(pages)[0];
    const fullText = pages[pageId].extract || "";

    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [];
    const description =
      sentences.slice(0, 2).join(" ").trim() ||
      "A beautiful destination in the Philippines.";

    const climateMatch = fullText.match(
      /(climate|weather|temperature)[^.!?]*[.!?]/gi
    );
    const climate = climateMatch
      ? climateMatch[0].trim()
      : "Tropical climate typical of the Philippines";

    const best_time = "November to May (dry season)";
    const activities = generateActivities(fullText, placeName);
    const highlights = generateHighlights(fullText, placeName);

    return {
      description,
      climate,
      best_time,
      activities,
      highlights,
    };
  } catch (error) {
    console.error("Error fetching place info:", error);
    return null;
  }
}

function generateActivities(text, placeName) {
  const activities = [];
  const lowerText = text.toLowerCase();

  if (lowerText.includes("beach") || lowerText.includes("island")) {
    activities.push(
      "Swimming and beach relaxation",
      "Snorkeling and diving",
      "Island hopping"
    );
  }
  if (lowerText.includes("mountain") || lowerText.includes("hiking")) {
    activities.push(
      "Hiking and trekking",
      "Mountain climbing",
      "Nature photography"
    );
  }
  if (
    lowerText.includes("church") ||
    lowerText.includes("heritage") ||
    lowerText.includes("historical")
  ) {
    activities.push(
      "Historical site tours",
      "Cultural exploration",
      "Photography walks"
    );
  }
  if (lowerText.includes("waterfall")) {
    activities.push("Waterfall swimming", "Nature trekking", "Photography");
  }
  if (lowerText.includes("surf")) {
    activities.push("Surfing", "Water sports", "Beach activities");
  }

  if (activities.length === 0) {
    activities.push("Sightseeing", "Local food tasting", "Cultural immersion");
  }

  return activities.slice(0, 5);
}

function generateHighlights(text, placeName) {
  const highlights = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  sentences.forEach((sentence) => {
    const lower = sentence.toLowerCase();
    if (
      (lower.includes("unesco") ||
        lower.includes("famous") ||
        lower.includes("known for") ||
        lower.includes("popular") ||
        lower.includes("best")) &&
      highlights.length < 3
    ) {
      highlights.push(sentence.trim());
    }
  });

  if (highlights.length === 0) {
    highlights.push(
      `Popular tourist destination in the Philippines`,
      `Rich in natural beauty and culture`,
      `Must-visit location for travelers`
    );
  }

  return highlights.slice(0, 3);
}

window.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = urlParams.get("id");

  if (!placeId) {
    console.error("No place ID");
    return;
  }

  try {
    const place = await placesAPI.getPlaceById(placeId);
    console.log("Basic place data:", place);

    if (place) {
      document.getElementById("name").textContent = place.name;
      document.getElementById("province").textContent = place.province;

      const imgEl = document.querySelector("main img");
      imgEl.src = place.image_url || "./public/img/baguio.jpg";
      imgEl.alt = place.name;

      document.title = `${place.name} - Tripify`;

      // Check cache first
      let detailedInfo = getCachedDetails(placeId);

      if (!detailedInfo) {
        console.log("Fetching info from Wikipedia...");
        detailedInfo = await getPlaceInfo(place.name, place.province);

        if (detailedInfo) {
          setCachedDetails(placeId, detailedInfo);
        }
      }

      document.getElementById("loading").classList.add("hidden");
      document.getElementById("content").classList.remove("hidden");

      if (detailedInfo) {
        document.getElementById("description").textContent =
          detailedInfo.description;
        document.getElementById("best_time").textContent =
          detailedInfo.best_time;
        document.getElementById("climate").textContent = detailedInfo.climate;

        const activitiesEl = document.getElementById("activities");
        activitiesEl.innerHTML = detailedInfo.activities
          .map((act) => `<li>${act}</li>`)
          .join("");

        const highlightsEl = document.getElementById("additional-info");
        highlightsEl.innerHTML = detailedInfo.highlights
          .map(
            (h) =>
              `<div class="p-4 border border-gray-700 rounded bg-white/5">
                        <p>${h}</p>
                    </div>`
          )
          .join("");
      } else {
        // Fallback
        document.getElementById("description").textContent =
          place.description || "A beautiful destination in the Philippines.";
        document.getElementById("best_time").textContent = "November to May";
        document.getElementById("climate").textContent = "Tropical climate";
        document.getElementById("activities").innerHTML =
          "<li>Sightseeing</li><li>Local cuisine</li><li>Photography</li>";
        document.getElementById("additional-info").innerHTML =
          '<div class="p-4 border-gray-700 border rounded bg-white/5"><p>Information not available</p></div>';
      }
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("loading").innerHTML =
      '<p class="text-red-400">Error loading information</p>';
  }
});
