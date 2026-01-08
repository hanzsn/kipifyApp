window.addEventListener("load", () => {
  const aside = document.querySelector(".aside");
  const sidebarBtn = document.querySelector(".sidebar-btn");

  if (!aside || !sidebarBtn) {
    console.error("Sidebar elements not found");
    return;
  }

  sidebarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = aside.classList.contains("hidden");

    if (isHidden) {
      aside.classList.remove("hidden");
      aside.classList.add("flex");
      aside.classList.remove("-translate-x-full");
      aside.classList.add("translate-x-0");
    } else {
      aside.classList.add("-translate-x-full");
      aside.classList.remove("translate-x-0");

      const handleTransitionEnd = () => {
        aside.classList.add("hidden");
        aside.classList.remove("flex");
        aside.removeEventListener("transitionend", handleTransitionEnd);
      };
      aside.addEventListener("transitionend", handleTransitionEnd);
    }
  });

  let resizeTimeout;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && !aside.classList.contains("hidden")) {
          aside.classList.add("-translate-x-full");
          aside.classList.remove("translate-x-0");

          const handleTransitionEnd = () => {
            aside.classList.add("hidden");
            aside.classList.remove("flex");
            aside.removeEventListener("transitionend", handleTransitionEnd);
          };
          aside.addEventListener("transitionend", handleTransitionEnd);
        }
      }, 150);
    },
    { passive: true }
  );

  document.addEventListener(
    "click",
    (e) => {
      if (
        !aside.contains(e.target) &&
        !sidebarBtn.contains(e.target) &&
        !aside.classList.contains("hidden")
      ) {
        aside.classList.add("-translate-x-full");
        aside.classList.remove("translate-x-0");

        const handleTransitionEnd = () => {
          aside.classList.add("hidden");
          aside.classList.remove("flex");
          aside.removeEventListener("transitionend", handleTransitionEnd);
        };
        aside.addEventListener("transitionend", handleTransitionEnd);
      }
    },
    { passive: true }
  );
});
