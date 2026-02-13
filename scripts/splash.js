const intro = document.querySelector(".intro");

if (!sessionStorage.getItem("splashShown")) {
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      intro.style.opacity = "0";
    }, 200); // Tiempo que se queda el negro
  });
} else {
  intro.style.display = "none";
}