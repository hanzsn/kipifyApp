const pass = document.querySelector("#password");
const eye = document.querySelector("#eye");
const eyeSlash = document.querySelector("#eye-slash");

function passwordToggle() {
  if (pass.type === "password") {
    pass.type = "text";
    eye.style.display = "none";
    eyeSlash.style.display = "flex";
    eyeSlash.style.color = "black";
  } else {
    pass.type = "password";
    eye.style.display = "flex";
    eyeSlash.style.display = "none";
  }
}

pass.addEventListener("input", () => {
  if (pass.value.length > 0) {
    eye.style.display = "flex";
    eyeSlash.style.display = "none";
    if (pass.type === "text") {
      eyeSlash.style.display = "flex";
    }
  } else {
    eye.style.display = "none";
    eyeSlash.style.display = "none";
  }
});

eye.addEventListener("click", () => passwordToggle());
eyeSlash.addEventListener("click", () => passwordToggle());
