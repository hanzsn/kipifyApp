// AdminScript.js - Complete Admin Panel for Adding/Managing Places

// Auto-detect environment (local or Vercel)
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "/api";

// Hide body until verification completes
document.body.style.display = "none";

// Immediately verify token
(async function verifyToken() {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "admin-login.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!data.success) {
      sessionStorage.removeItem("adminToken");
      window.location.href = "admin-login.html";
      return;
    }

    // Token is valid, show page
    document.body.style.display = "block";
  } catch (err) {
    sessionStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
  }
})();

// ------------------- VARIABLES -------------------
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
let editingPlaceId = null;

// ------------------- LOAD PLACES -------------------
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

// ------------------- DISPLAY RECENT PLACES -------------------
function displayRecentPlaces() {
  if (!allPlaces.length) {
    recentPlaces.innerHTML = `<p class="text-center text-gray-400">No places added yet</p>`;
    return;
  }

  const recent = allPlaces.slice(-6).reverse();
  recentPlaces.innerHTML = recent
    .map(
      (place) => `
    <div class="p-6 transition border border-gray-800 rounded-lg bg-black/30 hover:bg-gray-800/50">
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="text-lg font-semibold text-white">${place.name}</h3>
          <p class="text-sm text-gray-400">${place.province}, ${place.region}</p>
        </div>
        <span class="px-2 py-1 text-xs text-blue-400 bg-blue-900/30 rounded">${place.category || "Uncategorized"}</span>
      </div>
      <p class="mb-4 text-sm text-gray-300 line-clamp-2">${place.description}</p>
      <div class="flex gap-2">
        <button onclick="editPlace(${place.id})" class="px-4 py-2 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700">
          Edit
        </button>
        <button onclick="deletePlace(${place.id}, '${place.name.replace(/'/g, "\\'")}' )" class="px-4 py-2 text-sm text-white transition bg-red-600 rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

// ------------------- SEARCH FUNCTIONALITY -------------------
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  const query = e.target.value.trim().toLowerCase();

  if (query.length < 2) {
    searchResults.innerHTML = "";
    return;
  }

  searchTimeout = setTimeout(() => {
    const filtered = allPlaces.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.province.toLowerCase().includes(query) ||
        p.region.toLowerCase().includes(query),
    );
    displaySearchResults(filtered);
  }, 300);
});

function displaySearchResults(places) {
  if (!places.length) {
    searchResults.innerHTML = `<div class="p-4 mt-4 text-center text-gray-400 bg-gray-800 rounded-lg">No places found</div>`;
    return;
  }

  searchResults.innerHTML = `
    <div class="mt-4 space-y-2 max-h-96 overflow-y-auto">
      ${places
        .map(
          (p) => `
        <div class="flex items-center justify-between p-4 transition bg-gray-800 rounded-lg hover:bg-gray-700">
          <div class="flex-1">
            <h3 class="font-semibold text-white">${p.name}</h3>
            <p class="text-sm text-gray-400">${p.province}, ${p.region}</p>
            <p class="text-xs text-gray-500">ID: ${p.id} | ${p.category || "Uncategorized"}</p>
          </div>
          <div class="flex gap-2">
            <button onclick="editPlace(${p.id})" class="px-3 py-1 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700">Edit</button>
            <button onclick="deletePlace(${p.id}, '${p.name.replace(/'/g, "\\'")}' )" class="px-3 py-1 text-sm text-white transition bg-red-600 rounded hover:bg-red-700">Delete</button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

// ------------------- FORM SUBMISSION -------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    province: document.getElementById("province").value.trim(),
    region: document.getElementById("region").value,
    description: document.getElementById("description").value.trim(),
  };

  // Show loading
  submitBtn.disabled = true;
  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");

  try {
    const url = editingPlaceId
      ? `${API_BASE_URL}/places/${editingPlaceId}`
      : `${API_BASE_URL}/places`;

    const method = editingPlaceId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(
        editingPlaceId
          ? "Place updated successfully!"
          : "Place added successfully!",
        "success",
      );
      form.reset();
      editingPlaceId = null;
      btnText.textContent = "Add Place";
      await loadAllPlaces();
    } else {
      showMessage(data.message || "Failed to save place", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage("Error: " + error.message, "error");
  } finally {
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");
  }
});

// ------------------- EDIT PLACE -------------------
window.editPlace = async function (id) {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`);
    if (!response.ok) throw new Error("Failed to fetch place");

    const place = await response.json();

    // Populate form
    document.getElementById("name").value = place.name;
    document.getElementById("province").value = place.province;
    document.getElementById("region").value = place.region;
    document.getElementById("description").value = place.description;

    // Update UI
    editingPlaceId = id;
    btnText.textContent = "Update Place";

    // Scroll to form
    form.scrollIntoView({ behavior: "smooth" });
    showMessage(`Editing: ${place.name}`, "info");
  } catch (error) {
    console.error("Error loading place:", error);
    showMessage("Failed to load place for editing", "error");
  }
};

// ------------------- DELETE PLACE -------------------
window.deletePlace = async function (id, name) {
  if (!confirm(`Are you sure you want to delete "${name}"?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      showMessage(`Deleted: ${name}`, "success");
      await loadAllPlaces();
      searchResults.innerHTML = "";
    } else {
      const data = await response.json();
      showMessage(data.message || "Failed to delete place", "error");
    }
  } catch (error) {
    console.error("Error deleting place:", error);
    showMessage("Error: " + error.message, "error");
  }
};

// ------------------- RESET FORM -------------------
resetBtn.addEventListener("click", () => {
  form.reset();
  editingPlaceId = null;
  btnText.textContent = "Add Place";
  messageContainer.classList.add("hidden");
});

// ------------------- SHOW MESSAGES -------------------
function showMessage(message, type) {
  messageContainer.classList.remove("hidden");
  messageBox.className = "p-4 rounded-lg";

  if (type === "success") {
    messageBox.classList.add(
      "bg-green-900/50",
      "border",
      "border-green-700",
      "text-green-400",
    );
  } else if (type === "error") {
    messageBox.classList.add(
      "bg-red-900/50",
      "border",
      "border-red-700",
      "text-red-400",
    );
  } else if (type === "info") {
    messageBox.classList.add(
      "bg-blue-900/50",
      "border",
      "border-blue-700",
      "text-blue-400",
    );
  }

  messageBox.textContent = message;

  setTimeout(() => {
    messageContainer.classList.add("hidden");
  }, 5000);
}

// ------------------- INITIALIZE -------------------
window.addEventListener("DOMContentLoaded", () => {
  loadAllPlaces();
});
