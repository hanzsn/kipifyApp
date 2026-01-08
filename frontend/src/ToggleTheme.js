const ThemeController = document.querySelector(".theme-controller");
const Logo = document.querySelector(".logo");
const body = document.body;

ThemeController.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    body.style.background = "black";
  } else {
    body.style.background = "white";
  }
});
