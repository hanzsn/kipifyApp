function resetAnimation(element) {
  element.style.animation = "none";
  requestAnimationFrame(() => {
    element.style.animation = "";
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

let scrollObserver = null;

window.reinitializeFadeInObserver = () => {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains("animate-in")) {
          resetAnimation(entry.target);
          entry.target.classList.add("animate-in");
        }
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(
    ".top, .left, .left-text, .right, .bot"
  );
  elements.forEach((el) => {
    scrollObserver.observe(el);
  });

  console.log(`Fade-in observer initialized (${elements.length} elements)`);
};

function initializeFadeIn() {
  window.reinitializeFadeInObserver();
}

// CRITICAL: Use requestIdleCallback to avoid blocking interactions
if ("requestIdleCallback" in window) {
  requestIdleCallback(initializeFadeIn, { timeout: 1000 });
} else {
  window.addEventListener("DOMContentLoaded", initializeFadeIn, {
    passive: true,
  });
}
