// AdminScript.js - Admin Panel for Adding/Managing Places
// Auto-detect environment (works both locally and on Railway/Vercel)
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "/api";

const form = document.getElementById("addPlaceForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnLoader = document.getElementById("btnLoader");
const resetBtn = document.getElementById("resetBtn");
const messageContainer = document.getElementById("messageContainer");
const messageBox = document.getElementById("messageBox");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const recentPlaces = document.getElementById("recentPlaces");

let allPlaces = [];
let searchTimeout;

// Load all places on page load
async function loadAllPlaces() {
  try {
    const response = await fetch(`${API_BASE_URL}/places`);
    if (!response.ok) throw new Error("Failed to load places");
    allPlaces = await response.json();
    displayRecentPlaces();
  } catch (error) {
    console.error("Error loading places:", error);
    showMessage("Failed to load places: " + error.message, "error");
  }
}

// Search places
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  const query = e.target.value.trim().toLowerCase();

  if (query.length < 2) {
    searchResults.innerHTML = "";
    return;
  }

  searchTimeout = setTimeout(() => {
    const filtered = allPlaces.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.province.toLowerCase().includes(query) ||
        place.region.toLowerCase().includes(query),
    );

    displaySearchResults(filtered);
  }, 300);
});

// Display search results
function displaySearchResults(places) {
  if (places.length === 0) {
    searchResults.innerHTML = `
      <div class="p-4 mt-4 text-center text-gray-400 bg-gray-800 rounded-lg">
        No places found
      </div>
    `;
    return;
  }

  searchResults.innerHTML = `
    <div class="mt-4 space-y-2 max-h-96 overflow-y-auto">
      ${places
        .map(
          (place) => `
        <div class="flex items-center justify-between p-4 transition bg-gray-800 rounded-lg hover:bg-gray-700">
          <div class="flex-1">
            <h3 class="font-semibold text-white">${place.name}</h3>
            <p class="text-sm text-gray-400">${place.province}, ${place.region}</p>
            <p class="text-xs text-gray-500">ID: ${place.id}</p>
          </div>
          <div class="flex gap-2">
            <button 
              onclick="editPlace(${place.id})" 
              class="px-3 py-1 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button 
              onclick="deletePlace(${place.id}, '${place.name.replace(/'/g, "\\'")}')" 
              class="px-3 py-1 text-sm text-white transition bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

// Edit place - populate form
window.editPlace = async (id) => {
  const place = allPlaces.find((p) => p.id === id);
  if (!place) return;

  document.getElementById("name").value = place.name;
  document.getElementById("province").value = place.province;
  document.getElementById("region").value = place.region;
  document.getElementById("description").value = place.description;

  // Change button to update mode
  btnText.textContent = "Update Place";
  form.dataset.editId = id;

  // Scroll to form
  window.scrollTo({ top: 0, behavior: "smooth" });
  showMessage("Editing: " + place.name, "info");
};

// Delete place
window.deletePlace = async (id, name) => {
  if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete place");

    showMessage(`"${name}" deleted successfully!`, "success");
    loadAllPlaces();
    searchInput.value = "";
    searchResults.innerHTML = "";
  } catch (error) {
    showMessage("Error deleting place: " + error.message, "error");
  }
};

// Display recent places
function displayRecentPlaces() {
  const recent = allPlaces.slice(-6).reverse();

  if (recent.length === 0) {
    recentPlaces.innerHTML = `
      <div class="col-span-2 p-8 text-center text-gray-400 bg-gray-800 rounded-lg">
        No places added yet
      </div>
    `;
    return;
  }

  recentPlaces.innerHTML = recent
    .map(
      (place) => `
    <div class="overflow-hidden transition border border-gray-800 rounded-lg bg-black/30 backdrop-blur-sm hover:border-gray-700">
      <div class="relative h-32 overflow-hidden">
        <img
          src="${place.image_url || "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600"}"
          alt="${place.name}"
          class="object-cover w-full h-full"
          onerror="this.src='https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600'"
        />
        <span class="absolute px-2 py-1 text-xs font-semibold text-white rounded top-2 right-2 ${
          place.region === "Luzon"
            ? "bg-pink-500/90"
            : place.region === "Visayas"
              ? "bg-green-500/90"
              : "bg-blue-500/90"
        }">
          ${place.region}
        </span>
      </div>
      <div class="p-4">
        <h3 class="mb-1 font-semibold text-white">${place.name}</h3>
        <p class="mb-2 text-xs text-gray-400">📍 ${place.province}</p>
        <p class="text-xs text-gray-500 line-clamp-2">${place.description}</p>
        <div class="flex gap-2 mt-3">
          <button 
            onclick="editPlace(${place.id})" 
            class="flex-1 px-3 py-1 text-xs text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button 
            onclick="deletePlace(${place.id}, '${place.name.replace(/'/g, "\\'")}')" 
            class="flex-1 px-3 py-1 text-xs text-white transition bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    province: document.getElementById("province").value.trim(),
    region: document.getElementById("region").value,
    description: document.getElementById("description").value.trim(),
  };

  // Validate
  if (
    !formData.name ||
    !formData.province ||
    !formData.region ||
    !formData.description
  ) {
    showMessage("Please fill in all required fields", "error");
    return;
  }

  // Check if editing or adding
  const isEdit = form.dataset.editId;
  const url = isEdit
    ? `${API_BASE_URL}/places/${form.dataset.editId}`
    : `${API_BASE_URL}/places`;
  const method = isEdit ? "PUT" : "POST";

  // Show loading
  submitBtn.disabled = true;
  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save place");
    }

    const result = await response.json();

    showMessage(
      isEdit
        ? `"${formData.name}" updated successfully!`
        : `"${formData.name}" added successfully!`,
      "success",
    );

    form.reset();
    delete form.dataset.editId;
    btnText.textContent = "Add Place";
    loadAllPlaces();
  } catch (error) {
    showMessage("Error: " + error.message, "error");
  } finally {
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  form.reset();
  delete form.dataset.editId;
  btnText.textContent = "Add Place";
  messageContainer.classList.add("hidden");
});

// Show message
function showMessage(message, type) {
  const colors = {
    success: "bg-green-900/50 border-green-700 text-green-400",
    error: "bg-red-900/50 border-red-700 text-red-400",
    info: "bg-blue-900/50 border-blue-700 text-blue-400",
  };

  messageBox.className = `p-4 rounded-lg border ${colors[type] || colors.info}`;
  messageBox.textContent = message;
  messageContainer.classList.remove("hidden");

  setTimeout(() => {
    messageContainer.classList.add("hidden");
  }, 5000);
}

// Load places on page load
window.addEventListener("DOMContentLoaded", () => {
  loadAllPlaces();
});
