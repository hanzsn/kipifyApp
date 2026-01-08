// SearchScript.js - Search Page with Navigation to Category Pages
const API_BASE_URL = "http://localhost:3000/Api";

const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const categoryFilter = document.getElementById("categoryFilter");
const resultsContainer = document.getElementById("resultsContainer");
const resultsCount = document.getElementById("resultsCount");
const totalCount = document.getElementById("totalCount");
const noResults = document.getElementById("noResults");
const loadingSpinner = document.getElementById("loadingSpinner");

let allPlaces = [];
let filteredPlaces = [];

// Load all places from API
async function loadPlaces() {
  try {
    loadingSpinner.classList.remove("hidden");
    resultsContainer.classList.add("hidden");
    noResults.classList.add("hidden");

    const response = await fetch(`${API_BASE_URL}/places`);
    allPlaces = await response.json();
    filteredPlaces = allPlaces;

    totalCount.textContent = allPlaces.length;
    displayResults(allPlaces);

    loadingSpinner.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
  } catch (error) {
    console.error("Error loading places:", error);
    loadingSpinner.classList.add("hidden");
    showError();
  }
}

// Navigate to category page with place ID
function navigateToPlace(category, placeId, placeName) {
  const categoryPages = {
    beaches: "beach.html",
    mountains: "mountain.html",
    cities: "city.html",
    "hidden-gems": "hidden-gems.html",
  };

  const targetPage = categoryPages[category] || "destinations.html";

  // Store place info for scrolling
  sessionStorage.setItem("scrollToPlaceId", placeId);
  sessionStorage.setItem("searchedPlace", placeName);

  // Navigate
  window.location.href = targetPage;
}

// Display results
function displayResults(places) {
  if (places.length === 0) {
    resultsContainer.classList.add("hidden");
    noResults.classList.remove("hidden");
    resultsCount.textContent = "No places found";
    return;
  }

  resultsContainer.classList.remove("hidden");
  noResults.classList.add("hidden");
  resultsCount.textContent = `Showing ${places.length} of ${allPlaces.length} places`;

  resultsContainer.innerHTML = places
    .map(
      (place) => `
    <div class="overflow-hidden transition-transform duration-300 border border-gray-800 rounded-lg shadow-lg bg-black/30 backdrop-blur-sm hover:scale-105 hover:border-gray-700 cursor-pointer"
         onclick="navigateToPlace('${place.category}', ${
        place.id
      }, '${place.name.replace(/'/g, "\\'")}')">
      <!-- Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          src="${
            place.image_url ||
            "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600"
          }"
          alt="${place.name}"
          class="object-cover w-full h-full"
          onerror="this.src='https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600'"
        />
        <!-- Region Badge -->
        <span class="absolute px-3 py-1 text-xs font-semibold rounded-full top-3 right-3 ${
          place.region === "Luzon"
            ? "bg-pink-500/90 text-white"
            : place.region === "Visayas"
            ? "bg-green-500/90 text-white"
            : "bg-blue-500/90 text-white"
        }">
          ${place.region}
        </span>
        <!-- Category Badge -->
        ${
          place.category
            ? `
        <span class="absolute px-3 py-1 text-xs font-semibold text-white rounded-full bottom-3 left-3 bg-gray-900/80">
          ${getCategoryIcon(place.category)} ${formatCategory(place.category)}
        </span>
        `
            : ""
        }
      </div>

      <!-- Content -->
      <div class="p-5">
        <h3 class="mb-2 text-xl font-bold text-white">${place.name}</h3>
        <p class="mb-3 text-sm text-gray-400">
          📍 ${place.province}
        </p>
        <p class="mb-4 text-sm text-gray-300 line-clamp-3">
          ${place.description}
        </p>
        <div class="inline-block px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          View in ${formatCategory(place.category)} →
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Get category icon
function getCategoryIcon(category) {
  const icons = {
    beaches: "🏖️",
    mountains: "⛰️",
    cities: "🏛️",
    "hidden-gems": "💎",
  };
  return icons[category] || "📍";
}

// Format category name
function formatCategory(category) {
  const names = {
    beaches: "Beaches",
    mountains: "Mountains",
    cities: "Cities",
    "hidden-gems": "Hidden Gems",
  };
  return names[category] || category;
}

// Filter places
function filterPlaces() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedRegion = regionFilter.value;
  const selectedCategory = categoryFilter.value;

  filteredPlaces = allPlaces.filter((place) => {
    // Search filter
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm) ||
      place.province.toLowerCase().includes(searchTerm) ||
      place.description.toLowerCase().includes(searchTerm);

    // Region filter
    const matchesRegion = !selectedRegion || place.region === selectedRegion;

    // Category filter
    const matchesCategory =
      !selectedCategory || place.category === selectedCategory;

    return matchesSearch && matchesRegion && matchesCategory;
  });

  displayResults(filteredPlaces);
}

// Show error message
function showError() {
  resultsContainer.innerHTML = `
    <div class="col-span-full">
      <div class="p-8 text-center border border-red-800 rounded-lg bg-red-900/20">
        <svg class="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mb-2 text-xl font-semibold text-red-400">Failed to load places</h3>
        <p class="mb-4 text-gray-400">Please check your connection and try again</p>
        <button onclick="loadPlaces()" class="px-6 py-2 font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700">
          Retry
        </button>
      </div>
    </div>
  `;
}

// Make navigateToPlace globally accessible
window.navigateToPlace = navigateToPlace;

// Event listeners
searchInput.addEventListener("input", filterPlaces);
regionFilter.addEventListener("change", filterPlaces);
categoryFilter.addEventListener("change", filterPlaces);

// Load places on page load
window.addEventListener("DOMContentLoaded", () => {
  loadPlaces();
});
