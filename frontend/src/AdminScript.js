// AdminScript.js - WITH SEARCH FEATURE
const API_BASE_URL = "http://localhost:3000/Api";

const form = document.getElementById("addPlaceForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnLoader = document.getElementById("btnLoader");
const resetBtn = document.getElementById("resetBtn");
const messageContainer = document.getElementById("messageContainer");
const messageBox = document.getElementById("messageBox");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let allPlaces = [];

// Show message function
function showMessage(message, type = "success") {
  messageContainer.classList.remove("hidden");
  messageBox.className = `p-4 rounded-lg ${
    type === "success"
      ? "bg-green-600/20 border border-green-600 text-green-400"
      : "bg-red-600/20 border border-red-600 text-red-400"
  }`;
  messageBox.textContent = message;

  // Auto hide after 5 seconds
  setTimeout(() => {
    messageContainer.classList.add("hidden");
  }, 5000);
}

// SEARCH FUNCTIONALITY
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();

  if (searchTerm.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  const filtered = allPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm) ||
      place.province.toLowerCase().includes(searchTerm) ||
      place.region.toLowerCase().includes(searchTerm)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = `
      <div class="p-4 text-center text-gray-500 border border-gray-800 rounded-lg bg-black/30">
        No places found matching "${e.target.value}"
      </div>
    `;
    return;
  }

  searchResults.innerHTML = `
    <div class="p-4 border border-gray-800 rounded-lg bg-black/30">
      <p class="mb-3 text-sm text-gray-400">Found ${
        filtered.length
      } place(s):</p>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${filtered
          .map(
            (place) => `
          <div class="flex items-start justify-between p-3 transition rounded bg-gray-800/50 hover:bg-gray-800">
            <div class="flex-1">
              <h3 class="font-semibold text-white">${place.name}</h3>
              <p class="text-sm text-gray-400">${place.province}, ${
              place.region
            }</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-1 rounded ${
                place.region === "Luzon"
                  ? "bg-pink-500/20 text-pink-400"
                  : place.region === "Visayas"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }">
                ID: ${place.id}
              </span>
              <button 
                onclick="deletePlace(${place.id}, '${place.name.replace(
              /'/g,
              "\\'"
            )}')"
                class="px-3 py-1 text-xs font-semibold text-red-400 transition bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
});

// Load all places for search
async function loadAllPlaces() {
  try {
    const response = await fetch(`${API_BASE_URL}/places`);
    allPlaces = await response.json();
    console.log(`Loaded ${allPlaces.length} places for search`);
  } catch (error) {
    console.error("Error loading places:", error);
  }
}

// DELETE PLACE FUNCTION
async function deletePlace(id, name) {
  if (!confirm(`Are you sure you want to delete "${name}"?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      showMessage(`Successfully deleted "${name}"`, "success");
      loadAllPlaces(); // Refresh search data
      loadRecentPlaces(); // Refresh recent places
      searchInput.value = ""; // Clear search
      searchResults.innerHTML = ""; // Clear results
    } else {
      const error = await response.json();
      showMessage(
        `✗ Error: ${error.error || "Failed to delete place"}`,
        "error"
      );
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage(`Network error: ${error.message}`, "error");
  }
}

// Make deletePlace function globally accessible
window.deletePlace = deletePlace;

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable button and show loader
  submitBtn.disabled = true;
  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    province: formData.get("province"),
    region: formData.get("region"),
    description: formData.get("description"),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      showMessage(`Successfully added "${data.name}"!`, "success");
      form.reset();
      searchInput.value = "";
      searchResults.innerHTML = "";
      loadRecentPlaces();
      loadAllPlaces(); // Refresh search data
    } else {
      const error = await response.json();
      showMessage(`${error.error || "Failed to add place"}`, "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage(`Network error: ${error.message}`, "error");
  } finally {
    // Re-enable button and hide loader
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  form.reset();
  searchInput.value = "";
  searchResults.innerHTML = "";
});

// Load recent places
async function loadRecentPlaces() {
  try {
    const response = await fetch(`${API_BASE_URL}/places`);
    const places = await response.json();

    if (!Array.isArray(places)) {
      console.error("Expected array, got:", places);
      return;
    }

    // Get last 6 places
    const recentPlaces = places.slice(-6).reverse();

    const container = document.getElementById("recentPlaces");
    container.innerHTML = recentPlaces
      .map(
        (place) => `
      <div class="bg-black/30 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition">
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1">
            <h3 class="font-semibold">${place.name}</h3>
            <span class="text-xs px-2 py-1 rounded inline-block mt-1 ${
              place.region === "Luzon"
                ? "bg-pink-500/20 text-pink-400"
                : place.region === "Visayas"
                ? "bg-green-500/20 text-green-400"
                : "bg-blue-500/20 text-blue-400"
            }">${place.region}</span>
          </div>
          <button 
            onclick="deletePlace(${place.id}, '${place.name.replace(
          /'/g,
          "\\'"
        )}')"
            class="px-3 py-1.5 text-xs font-semibold text-red-400 transition bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30"
          >
            Delete
          </button>
        </div>
        <p class="text-sm text-gray-400">${place.province}</p>
        <p class="text-xs text-gray-500 mt-2 line-clamp-2">${
          place.description
        }</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading recent places:", error);
  }
}

// Load recent places on page load
window.addEventListener("DOMContentLoaded", () => {
  loadRecentPlaces();
  loadAllPlaces();
});
