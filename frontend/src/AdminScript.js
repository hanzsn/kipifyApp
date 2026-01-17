// AdminScript.js - Admin Panel for Adding/Managing Places
// Auto-detect environment (works both locally and on Railway/Vercel)
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

    // Token is valid, show body
    document.body.style.display = "block";
  } catch (err) {
    sessionStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
  }
})();

// --- rest of your existing code ---
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

// ... rest of your existing AdminScript.js code continues unchanged ...
