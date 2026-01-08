const links = document.querySelectorAll(".animated-link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // prevent default if it's not an in-page anchor
    if (!href.startsWith("")) {
      e.preventDefault();
    }

    // remove active class from all links
    links.forEach((l) => l.classList.remove("active"));

    // add active class to clicked link
    link.classList.add("active");
  });
});
