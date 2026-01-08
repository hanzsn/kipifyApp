const images = [
  {
    url: "./public/img/baguio.jpg",
    title: "Baguio",
    description:
      "baguio; Cool mountain breeze, pine forests, and scenic city views",
  },
  {
    url: "./public/img/palawan_elnido.jpg",
    title: "Palawan, El Nido",
    description: "palawan, el nido; Paradise beaches and crystal waters",
  },
  {
    url: "./public/img/boracay.jpg",
    title: "Boracay Island",
    description: "boracay island; White sand beaches and vibrant nightlife",
  },
  {
    url: "./public/img/banaue.jpg",
    title: "Banaue Rice Terraces",
    description: "banaue rice terraces; Ancient terraces carved into mountains",
  },
  {
    url: "./public/img/Masungi_Georserve.jpg",
    title: "Masungi Georeserve",
    description:
      "masungi georserve, sierra madre; Diving paradise and historical sites",
  },
];

const state = {
  currentIndex: 0,
  isHovered: false,
  autoplayInterval: null,
  isUpdating: false,
  lastClickTime: 0,
};

const elements = {};

function initElements() {
  elements.bgLayer = document.getElementById("bgLayer");
  elements.sliderImage = document.getElementById("sliderImage");
  elements.imageTitle = document.getElementById("imageTitle");
  elements.imageDesc = document.getElementById("imageDesc");
  elements.dotsContainer = document.getElementById("dotsContainer");
  elements.prevBtn = document.getElementById("prevBtn");
  elements.nextBtn = document.getElementById("nextBtn");
  elements.slider = document.querySelector(".img-slider");

  if (!elements.bgLayer || !elements.sliderImage) {
    return false;
  }

  // No CSS transitions - we'll handle fades manually when needed
  elements.bgLayer.style.transition = "none";
  elements.sliderImage.style.transition = "none";

  return true;
}

function createDots() {
  const fragment = document.createDocumentFragment();

  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${
      index === 0 ? "bg-white scale-125" : "bg-white/50"
    }`;
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.dataset.index = index;
    fragment.appendChild(dot);
  });

  elements.dotsContainer.appendChild(fragment);

  elements.dotsContainer.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      goToSlide(parseInt(e.target.dataset.index), true);
    }
  };
}

function performUpdate(isUserAction = false) {
  // Prevent updates if already updating
  if (state.isUpdating) return;
  state.isUpdating = true;

  const { bgLayer, sliderImage, imageTitle, imageDesc, dotsContainer } =
    elements;
  const currentImage = images[state.currentIndex];

  if (isUserAction) {
    // Instant update for user interactions
    bgLayer.src = currentImage.url;
    sliderImage.src = currentImage.url;
    imageTitle.textContent = currentImage.title;
    imageDesc.textContent = currentImage.description;
    state.isUpdating = false;
  } else {
    // Smooth crossfade for autoplay only
    bgLayer.style.opacity = "0.5";
    sliderImage.style.opacity = "0.5";

    setTimeout(() => {
      bgLayer.src = currentImage.url;
      sliderImage.src = currentImage.url;
      imageTitle.textContent = currentImage.title;
      imageDesc.textContent = currentImage.description;

      setTimeout(() => {
        bgLayer.style.opacity = "1";
        sliderImage.style.opacity = "1";
        state.isUpdating = false;
      }, 50);
    }, 150);
  }

  // Update dots
  const dots = dotsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = `w-2 h-2 rounded-full transition-all duration-300 ${
      i === state.currentIndex ? "bg-white scale-125" : "bg-white/50"
    }`;
  }
}

function goToSlide(index, isUserAction = false) {
  if (index === state.currentIndex || state.isUpdating) return;
  state.currentIndex = index;
  performUpdate(isUserAction);
  if (isUserAction) resetTimer();
}

function nextSlide(isUserAction = false) {
  state.currentIndex = (state.currentIndex + 1) % images.length;
  performUpdate(isUserAction);
}

function prevSlide(isUserAction = false) {
  state.currentIndex = (state.currentIndex - 1 + images.length) % images.length;
  performUpdate(isUserAction);
}

function startAutoplay() {
  state.autoplayInterval = setInterval(() => {
    if (!state.isHovered) {
      nextSlide(false); // autoplay = smooth fade
    }
  }, 5000);
}

function resetTimer() {
  if (state.autoplayInterval) {
    clearInterval(state.autoplayInterval);
  }
  startAutoplay();
}

function attachEventListeners() {
  // Aggressive throttle - max 1 click per 300ms
  elements.prevBtn.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Always show visual feedback
    elements.prevBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      elements.prevBtn.style.transform = "";
    }, 100);

    const now = Date.now();
    if (now - state.lastClickTime < 400 || state.isUpdating) return;
    state.lastClickTime = now;

    prevSlide(true);
    resetTimer();
  };

  elements.nextBtn.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Always show visual feedback
    elements.nextBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      elements.nextBtn.style.transform = "";
    }, 100);

    const now = Date.now();
    if (now - state.lastClickTime < 400 || state.isUpdating) return;
    state.lastClickTime = now;

    nextSlide(true);
    resetTimer();
  };

  elements.slider.onmouseenter = () => {
    state.isHovered = true;
    if (state.autoplayInterval) {
      clearInterval(state.autoplayInterval);
    }
  };

  elements.slider.onmouseleave = () => {
    state.isHovered = false;
    resetTimer();
  };

  // Throttle keyboard too
  let lastKeyTime = 0;
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      const now = Date.now();
      if (now - lastKeyTime < 400 || state.isUpdating) return;
      lastKeyTime = now;

      if (e.key === "ArrowLeft") {
        prevSlide(true);
        resetTimer();
      } else if (e.key === "ArrowRight") {
        nextSlide(true);
        resetTimer();
      }
    },
    { passive: true }
  );
}

function initializeSlider() {
  if (!initElements()) return;

  createDots();
  attachEventListeners();
  performUpdate(false);
  startAutoplay();

  console.log("✅ Image slider initialized");
}

if ("requestIdleCallback" in window) {
  requestIdleCallback(initializeSlider, { timeout: 3000 });
} else {
  setTimeout(initializeSlider, 500);
}
