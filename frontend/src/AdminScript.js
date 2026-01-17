// AdminScript.js - Admin Panel for Adding/Managing Places
// Auto-detect environment (local or Vercel)
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "/api"; // for Vercel or production

// Hide body until verification completes
document.body.style.display = "none";

// Immediately verify token
(async function verifyToken() {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    // No token, redirect to login
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
      // Token invalid or expired
      sessionStorage.removeItem("adminToken");
      window.location.href = "admin-login.html";
      return;
    }

    // Token is valid, show page
    document.body.style.display = "block";
  } catch (err) {
    // Verification failed
    sessionStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
  }
})();

// ------------------- REST OF ADMIN FUNCTIONALITY -------------------

// Form & buttons
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

// Load all places
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

// Search input
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

// Display search results
function displaySearchResults(places) {
  if (!places.length) {
    searchResults.innerHTML = `<div class="p-4 mt-4 text-center text-gray-400 bg-gray-800 rounded-lg">No places found</div>`;
    return;
  }

  searchResults.innerHTML = `
    <div class="mt-4 space-y-2 max-h-96 overflow-y-auto">
      ${places
        .map(
          (
            p,
          ) => `<div class="flex items-center justify-between p-4 transition bg-gray-800 rounded-lg hover:bg-gray-700">
            <div class="flex-1">
              <h3 class="font-semibold text-white">${p.name}</h3>
              <p class="text-sm text-gray-400">${p.province}, ${p.region}</p>
              <p class="text-xs text-gray-500">ID: ${p.id}</p>
            </div>
            <div class="flex gap-2">
              <button onclick="editPlace(${p.id})" class="px-3 py-1 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700">Edit</button>
              <button onclick="deletePlace(${p.id}, '${p.name.replace(/'/g, "\\'")}')" class="px-3 py-1 text-sm text-white transition bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>`,
        )
        .join("")}
    </div>
  `;
}

// ------------------- Add, Edit, Delete, Reset, Messages -------------------
// (You can copy the rest of your existing code here)

window.addEventListener("DOMContentLoaded", () => {
  loadAllPlaces();
});
