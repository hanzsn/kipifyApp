// LoadPlacesByCategory.js
import { placesAPI } from "./Api.js";

// create a single global observer instead of reinitializing
let globalObserver = null;

const initializeObserver = () => {
  if (globalObserver) {
    globalObserver.disconnect();
  }

  const observerOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
  };

  globalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        // unobserve after animation to improve performance
        globalObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  return globalObserver;
};

// Load Beaches & Islands
export const loadBeaches = async (region = null) => {
  const container = document.querySelector(".card-container");
  if (!container) {
    console.error("Card container not found!");
    return;
  }

  container.innerHTML =
    '<div class="flex flex-row gap-4 col-span-3 justify-center py-12 text-white">Loading beaches & islands...<div class="inline-block w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div></div>';

  try {
    const places = region
      ? await placesAPI.getPlacesByCategory("beaches", region)
      : await placesAPI.getPlacesByCategory("beaches");

    if (!places || places.length === 0) {
      container.innerHTML =
        '<div class="col-span-3 text-center py-12 text-white">No beaches found</div>';
      return;
    }

    const fragment = document.createDocumentFragment();
    const animationPattern = [
      "left-text",
      "top",
      "right",
      "left-text",
      "top",
      "right",
      "left-text",
      "bot",
      "right",
      "left-text",
      "bot",
      "right",
    ];

    places.forEach((place, index) => {
      const cardWrapper = document.createElement("div");
      const animationClass = animationPattern[index % animationPattern.length];
      cardWrapper.className = `w-full ${animationClass}`;

      const card = document.createElement("beach-card");
      card.setAttribute("name", place.name);
      card.setAttribute("province", place.province);
      card.setAttribute("region", place.region);
      card.setAttribute("description", place.description);
      card.setAttribute("image", place.image_url);
      card.setAttribute("place-id", place.id);

      cardWrapper.appendChild(card);
      fragment.appendChild(cardWrapper);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
    console.log(`Loaded ${places.length} beaches & islands`);

    const observer = initializeObserver();
    requestAnimationFrame(() => {
      const animatedElements = container.querySelectorAll(
        ".top, .left, .left-text, .right, .bot"
      );
      animatedElements.forEach((el) => observer.observe(el));
    });
  } catch (error) {
    console.error("Error loading beaches:", error);
    container.innerHTML =
      '<div class="col-span-3 text-center py-12 text-red-500">Error loading beaches. Check console.</div>';
  }
};

// Load Mountains & Nature
export const loadMountains = async (region = null) => {
  const container = document.querySelector(".card-container");
  if (!container) {
    console.error("Card container not found!");
    return;
  }

  container.innerHTML =
    '<div class="flex flex-row gap-4 col-span-3 justify-center py-12 text-white">Loading mountains & nature...<div class="inline-block w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div></div>';

  try {
    const places = region
      ? await placesAPI.getPlacesByCategory("mountains", region)
      : await placesAPI.getPlacesByCategory("mountains");

    if (!places || places.length === 0) {
      container.innerHTML =
        '<div class="col-span-3 text-center py-12 text-white">No mountains found</div>';
      return;
    }

    const fragment = document.createDocumentFragment();
    const animationPattern = [
      "left-text",
      "top",
      "right",
      "left-text",
      "top",
      "right",
      "left-text",
      "bot",
      "right",
      "left-text",
      "bot",
      "right",
    ];

    places.forEach((place, index) => {
      const cardWrapper = document.createElement("div");
      const animationClass = animationPattern[index % animationPattern.length];
      cardWrapper.className = `w-full ${animationClass}`;

      const card = document.createElement("mountain-card");
      card.setAttribute("name", place.name);
      card.setAttribute("province", place.province);
      card.setAttribute("region", place.region);
      card.setAttribute("description", place.description);
      card.setAttribute("image", place.image_url);
      card.setAttribute("place-id", place.id);

      cardWrapper.appendChild(card);
      fragment.appendChild(cardWrapper);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
    console.log(`Loaded ${places.length} mountains & nature`);

    const observer = initializeObserver();
    requestAnimationFrame(() => {
      const animatedElements = container.querySelectorAll(
        ".top, .left, .left-text, .right, .bot"
      );
      animatedElements.forEach((el) => observer.observe(el));
    });
  } catch (error) {
    console.error("Error loading mountains:", error);
    container.innerHTML =
      '<div class="col-span-3 text-center py-12 text-red-500">Error loading mountains. Check console.</div>';
  }
};

// Load Cities & Culture
export const loadCities = async (region = null) => {
  const container = document.querySelector(".card-container");
  if (!container) {
    console.error("Card container not found!");
    return;
  }

  container.innerHTML =
    '<div class="flex flex-row gap-4 col-span-3 justify-center py-12 text-white">Loading cities & culture...<div class="inline-block w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div></div>';

  try {
    const places = region
      ? await placesAPI.getPlacesByCategory("cities", region)
      : await placesAPI.getPlacesByCategory("cities");

    if (!places || places.length === 0) {
      container.innerHTML =
        '<div class="col-span-3 text-center py-12 text-white">No cities found</div>';
      return;
    }

    const fragment = document.createDocumentFragment();
    const animationPattern = [
      "left-text",
      "top",
      "right",
      "left-text",
      "top",
      "right",
      "left-text",
      "bot",
      "right",
      "left-text",
      "bot",
      "right",
    ];

    places.forEach((place, index) => {
      const cardWrapper = document.createElement("div");
      const animationClass = animationPattern[index % animationPattern.length];
      cardWrapper.className = `w-full ${animationClass}`;

      const card = document.createElement("city-card");
      card.setAttribute("name", place.name);
      card.setAttribute("province", place.province);
      card.setAttribute("region", place.region);
      card.setAttribute("description", place.description);
      card.setAttribute("image", place.image_url);
      card.setAttribute("place-id", place.id);

      cardWrapper.appendChild(card);
      fragment.appendChild(cardWrapper);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
    console.log(`Loaded ${places.length} cities & culture`);

    const observer = initializeObserver();
    requestAnimationFrame(() => {
      const animatedElements = container.querySelectorAll(
        ".top, .left, .left-text, .right, .bot"
      );
      animatedElements.forEach((el) => observer.observe(el));
    });
  } catch (error) {
    console.error("Error loading cities:", error);
    container.innerHTML =
      '<div class="col-span-3 text-center py-12 text-red-500">Error loading cities. Check console.</div>';
  }
};

// Load Hidden Gems
export const loadHiddenGems = async (region = null) => {
  const container = document.querySelector(".card-container");
  if (!container) {
    console.error("Card container not found!");
    return;
  }

  container.innerHTML =
    '<div class="flex flex-row gap-4 col-span-3 justify-center py-12 text-white">Loading hidden gems...<div class="inline-block w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div></div>';

  try {
    const places = region
      ? await placesAPI.getPlacesByCategory("hidden-gems", region)
      : await placesAPI.getPlacesByCategory("hidden-gems");

    if (!places || places.length === 0) {
      container.innerHTML =
        '<div class="col-span-3 text-center py-12 text-white">No hidden gems found</div>';
      return;
    }

    const fragment = document.createDocumentFragment();
    const animationPattern = [
      "left-text",
      "top",
      "right",
      "left-text",
      "top",
      "right",
      "left-text",
      "bot",
      "right",
      "left-text",
      "bot",
      "right",
    ];

    places.forEach((place, index) => {
      const cardWrapper = document.createElement("div");
      const animationClass = animationPattern[index % animationPattern.length];
      cardWrapper.className = `w-full ${animationClass}`;

      const card = document.createElement("hidden-gem-card");
      card.setAttribute("name", place.name);
      card.setAttribute("province", place.province);
      card.setAttribute("region", place.region);
      card.setAttribute("description", place.description);
      card.setAttribute("image", place.image_url);
      card.setAttribute("place-id", place.id);

      cardWrapper.appendChild(card);
      fragment.appendChild(cardWrapper);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
    console.log(`Loaded ${places.length} hidden gems`);

    const observer = initializeObserver();
    requestAnimationFrame(() => {
      const animatedElements = container.querySelectorAll(
        ".top, .left, .left-text, .right, .bot"
      );
      animatedElements.forEach((el) => observer.observe(el));
    });
  } catch (error) {
    console.error("Error loading hidden gems:", error);
    container.innerHTML =
      '<div class="col-span-3 text-center py-12 text-red-500">Error loading hidden gems. Check console.</div>';
  }
};

// export the observer for cleanup if needed
export const cleanupObserver = () => {
  if (globalObserver) {
    globalObserver.disconnect();
    globalObserver = null;
  }
};
