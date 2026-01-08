let dropdowns = [];
let isInitialized = false;

function initializeDropdowns() {
  if (isInitialized) return;

  const containers = document.querySelectorAll(".dropdown-container");
  if (containers.length === 0) {
    console.warn("No dropdowns found");
    return;
  }

  // Cache all elements at once
  dropdowns = Array.from(containers).map((container) => ({
    container,
    menuList: container.querySelector(".menu-list"),
    link: container.querySelector(".animated-link"),
  }));

  // Attach click handlers
  dropdowns.forEach(({ link, menuList }) => {
    link.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close all other dropdowns first
      dropdowns.forEach(({ menuList: otherMenu }) => {
        if (otherMenu !== menuList) {
          otherMenu.style.display = "none";
        }
      });

      // Toggle current dropdown
      menuList.style.display = "flex";
      menuList.style.flexDirection = "column";
    };
  });

  // Global click handler with event delegation
  document.addEventListener(
    "click",
    (e) => {
      // Check if click is outside all dropdowns
      const isOutside = dropdowns.every(
        ({ container }) => !container.contains(e.target)
      );

      if (isOutside) {
        dropdowns.forEach(({ menuList }) => {
          menuList.style.display = "none";
        });
      }
    },
    { passive: true }
  );

  isInitialized = true;
  console.log("✅ Dropdowns initialized");
}

// Initialize when idle
if ("requestIdleCallback" in window) {
  requestIdleCallback(initializeDropdowns, { timeout: 2000 });
} else {
  setTimeout(initializeDropdowns, 200);
}
