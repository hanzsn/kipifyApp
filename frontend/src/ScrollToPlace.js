// ScrollToPlace.js - Helper to scroll to searched place
// Add this to each category page (beach.html, mountain.html, etc.)

window.addEventListener("DOMContentLoaded", () => {
  const placeId = sessionStorage.getItem("scrollToPlaceId");
  const placeName = sessionStorage.getItem("searchedPlace");

  if (placeId && placeName) {
    console.log(`Searching for place: ${placeName} (ID: ${placeId})`);

    // Wait for cards to load (adjust timeout if needed)
    setTimeout(() => {
      // Try to find the card with this place ID
      const card = document.querySelector(`[data-place-id="${placeId}"]`);

      if (card) {
        // Scroll to the card
        card.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Highlight the card temporarily
        card.classList.add(
          "ring-4",
          "ring-blue-500",
          "ring-offset-4",
          "ring-offset-gray-900"
        );

        // Show success message
        showNotification(`Found: ${placeName}`, "success");

        // Remove highlight after 3 seconds
        setTimeout(() => {
          card.classList.remove(
            "ring-4",
            "ring-blue-500",
            "ring-offset-4",
            "ring-offset-gray-900"
          );
        }, 3000);
      } else {
        console.warn(`Card not found for place ID: ${placeId}`);
        showNotification(`"${placeName}" not found on this page`, "warning");
      }

      // Clear sessionStorage
      sessionStorage.removeItem("scrollToPlaceId");
      sessionStorage.removeItem("searchedPlace");
    }, 1000); // Wait 1 second for cards to load
  }
});

// Notification helper
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `fixed top-24 right-6 z-50 px-6 py-3 rounded-lg shadow-lg transition-all transform ${
    type === "success"
      ? "bg-green-600 text-white"
      : type === "warning"
      ? "bg-yellow-600 text-white"
      : "bg-red-600 text-white"
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
