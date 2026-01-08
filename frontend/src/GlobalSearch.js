// GlobalSearch.js - Smart search that redirects to category pages
const API_BASE_URL = "http://localhost:3000/Api";

class GlobalSearch extends HTMLElement {
  constructor() {
    super();
    this.places = [];
    this.searchTimeout = null;
  }

  connectedCallback() {
    this.render();
    this.loadPlaces();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="relative w-full max-w-2xl mx-auto">
        <div class="relative">
          <input
            type="text"
            id="globalSearchInput"
            placeholder="Search destinations in Philippines..."
            class="w-full px-4 py-3 pr-12 text-white transition bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
          />
          <svg
            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <!-- Search Results Dropdown -->
        <div
          id="searchResults"
          class="absolute z-50 hidden w-full mt-2 overflow-hidden border border-gray-700 rounded-lg shadow-2xl bg-gray-900/95 backdrop-blur-sm"
        >
          <div id="searchResultsContent" class="max-h-96 overflow-y-auto">
            <!-- Results will appear here -->
          </div>
        </div>
      </div>
    `;
  }

  async loadPlaces() {
    try {
      const response = await fetch(`${API_BASE_URL}/places`);
      this.places = await response.json();
      console.log(`Loaded ${this.places.length} places for search`);
    } catch (error) {
      console.error("Error loading places:", error);
    }
  }

  attachEventListeners() {
    const input = this.querySelector("#globalSearchInput");
    const resultsDiv = this.querySelector("#searchResults");

    input.addEventListener("input", (e) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 300);
    });

    input.addEventListener("focus", (e) => {
      if (e.target.value.trim()) {
        this.handleSearch(e.target.value);
      }
    });

    // Close results when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        resultsDiv.classList.add("hidden");
      }
    });
  }

  handleSearch(query) {
    const resultsDiv = this.querySelector("#searchResults");
    const resultsContent = this.querySelector("#searchResultsContent");

    if (query.trim().length < 2) {
      resultsDiv.classList.add("hidden");
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.places.filter(
      (place) =>
        place.name.toLowerCase().includes(searchTerm) ||
        place.province.toLowerCase().includes(searchTerm) ||
        place.description.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      resultsContent.innerHTML = `
        <div class="p-6 text-center text-gray-400">
          <svg class="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>No places found for "${query}"</p>
        </div>
      `;
      resultsDiv.classList.remove("hidden");
      return;
    }

    resultsContent.innerHTML = `
      <div class="p-2">
        <p class="px-3 py-2 text-xs text-gray-400">Found ${
          filtered.length
        } result(s)</p>
        ${filtered
          .slice(0, 8)
          .map(
            (place) => `
          <button
            onclick="window.globalSearchNavigate('${place.category}', ${
              place.id
            }, '${place.name.replace(/'/g, "\\'")}')"
            class="flex items-start w-full gap-3 p-3 text-left transition rounded-lg hover:bg-gray-800"
          >
            <img
              src="${
                place.image_url ||
                "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600"
              }"
              alt="${place.name}"
              class="object-cover w-16 h-16 rounded"
              onerror="this.src='https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600'"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-white truncate">${place.name}</h4>
              <p class="text-xs text-gray-400">📍 ${place.province}, ${
              place.region
            }</p>
              <div class="flex gap-2 mt-1">
                <span class="text-xs px-2 py-0.5 rounded ${this.getCategoryColor(
                  place.category
                )}">
                  ${this.getCategoryIcon(place.category)} ${this.formatCategory(
              place.category
            )}
                </span>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        `
          )
          .join("")}
        ${
          filtered.length > 8
            ? `<p class="px-3 py-2 text-xs text-center text-gray-500">Showing first 8 of ${filtered.length} results</p>`
            : ""
        }
      </div>
    `;

    resultsDiv.classList.remove("hidden");
  }

  getCategoryIcon(category) {
    const icons = {
      beaches: "🏖️",
      mountains: "⛰️",
      cities: "🏛️",
      "hidden-gems": "💎",
    };
    return icons[category] || "📍";
  }

  formatCategory(category) {
    const names = {
      beaches: "Beach",
      mountains: "Mountain",
      cities: "City",
      "hidden-gems": "Hidden Gem",
    };
    return names[category] || category;
  }

  getCategoryColor(category) {
    const colors = {
      beaches: "bg-blue-500/20 text-blue-400",
      mountains: "bg-green-500/20 text-green-400",
      cities: "bg-purple-500/20 text-purple-400",
      "hidden-gems": "bg-pink-500/20 text-pink-400",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
  }
}

// Global navigation function
window.globalSearchNavigate = (category, placeId, placeName) => {
  console.log(`Navigating to ${category} page for place: ${placeName}`);

  // Map categories to their respective pages
  const categoryPages = {
    beaches: "beach.html",
    mountains: "mountain.html",
    cities: "city.html",
    "hidden-gems": "hidden-gems.html",
  };

  const targetPage = categoryPages[category] || "Destinations.html";

  // Store the place ID in sessionStorage so the target page can scroll to it
  sessionStorage.setItem("scrollToPlaceId", placeId);
  sessionStorage.setItem("searchedPlace", placeName);

  // Navigate to the category page
  window.location.href = targetPage;
};

// Define custom element
customElements.define("global-search", GlobalSearch);
