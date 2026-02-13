// const intro = document.querySelector(".intro");

// if (!sessionStorage.getItem("splashShown")) {
//   window.addEventListener("DOMContentLoaded", () => {
//     setTimeout(hideIntro, 1500);
//     // sessionStorage.setItem("splashShown", "true"); 
//     // TODO: Quitar el comment al terminar
//   });
// } else {
//   intro.style.display = "none";
// }

// function hideIntro() {
//   intro.style.opacity = "0";
//   setTimeout(() => {
//     intro.style.display = "none";
//   }, 2000);
// }

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