import "/scripts/splash.js";
import "/scripts/language.js";
import "/scripts/video.js";
// import "/scripts/gallery.js";
import "/scripts/components/swiper-slide-element.js";

document.querySelectorAll("img, video").forEach((element) => {
  element.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
});

document.querySelectorAll("nav a, .logo-footer a").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = anchor.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});