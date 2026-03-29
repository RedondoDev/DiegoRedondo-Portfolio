const swiper = new Swiper(".swiper", {
  grabCursor: false,
  centeredSlides: true,
  initialSlide: 0,
  speed: 1200,
  parallax: true,
  spaceBetween: 20,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  history: false,
  hashNavigation: false,
  breakpoints: {
    768: {
      slidesPerView: 1.5,
      allowTouchMove: false,
    },
    0: {
      slidesPerView: 1.3,
      spaceBetween: 10,
      allowTouchMove: true,
    },
  },
});

const swiperSlider = document.querySelectorAll("swiper-slide");

swiper.on("slideChange", () => {
  swiperSlider.forEach((slide) => {
    const videoElement = slide.querySelector(".carousel-video");
    if (!videoElement) return;

    const slideIndex = slide.getAttribute("data-swiper-slide-index");
    const isActive = slideIndex == swiper.realIndex;

    if (isActive) {
      videoElement.muted = true;
      videoElement.loop = true;

      if (videoElement.paused) {
        videoElement
          .play()
          .catch((err) => console.warn("No se pudo reproducir:", err));
      }
    } else {
      if (!videoElement.paused) videoElement.pause();
      videoElement.loop = false;
      videoElement.muted = false;
    }
  });
});

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

document.querySelectorAll(".left-arrow, .right-arrow").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.contains("left-arrow") ? swiper.slidePrev() : swiper.slideNext();
  });
});

// Scroll to video

// Estos son los del carrusel:
const videoEmbedCodes = [
  "https://player.vimeo.com/video/1155097382", // - Aliexpress
  "https://player.vimeo.com/video/1155092739", // - Vetusta Morla
  "https://player.vimeo.com/video/1155095679", // - Óliver
  "https://player.vimeo.com/video/1155094764", // - Tu otra bonita
  "https://player.vimeo.com/video/1155597646", // - Beso Beach
];

const VERSION = "1"; // CAMBIO: Actualiza cada vez que realices cambios.

// Estos son los de las fotos:
const videoThumbCodes = [
  `https://player.vimeo.com/video/1155092739?v=${VERSION}`, // - Vetusta Morla
  `https://player.vimeo.com/video/1155094764?v=${VERSION}`, // - Tu otra bonita
  `https://player.vimeo.com/video/1155097100?v=${VERSION}`, // - Conociendo Rusia
  // `https://sdffdsfsd.com` - ejemplo de uno nuevo
  `https://player.vimeo.com/video/1155096114?v=${VERSION}`, // - Nuria Fergó
  `https://player.vimeo.com/video/1155096269?v=${VERSION}`, // - Marwan y Dani
  `https://player.vimeo.com/video/1155097195?v=${VERSION}`, // - Amanda Björn
  `https://player.vimeo.com/video/1155598347?v=${VERSION}`, // - Miravia Rivers 1
  `https://player.vimeo.com/video/1155097382?v=${VERSION}`, // - Aliexpress
  `https://player.vimeo.com/video/1155597646?v=${VERSION}`, // - Beso Beach
  `https://player.vimeo.com/video/1155096590?v=${VERSION}`, // - Miravia Rivers 2
  `https://player.vimeo.com/video/1155095679?v=${VERSION}`, // - Óliver
  `https://player.vimeo.com/video/1155096937?v=${VERSION}`, // - Miravia Cremades
  `https://player.vimeo.com/video/1155095062?v=${VERSION}`, // - Alfonso Bassave
  `https://player.vimeo.com/video/1155096799?v=${VERSION}`, // - Miravia Rivers 3
  `https://player.vimeo.com/video/1155095831?v=${VERSION}`, // - Maika Makovski
  `https://player.vimeo.com/video/1155095356?v=${VERSION}`, // - Russian Red
  `https://player.vimeo.com/video/1174721180?v=${VERSION}`, // - Miravia Primavera
];

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector(".vimeo-player");
  const player = new Vimeo.Player(iframe);
  const thumbnails = document.querySelectorAll(".video-thumbnail");

  swiperSlider.forEach((slide) => {
    const slideIndex = Number(slide.getAttribute("data-swiper-slide-index"));
    slide.addEventListener("click", () => {
      player.pause().then(() => {
        player.loadVideo(videoEmbedCodes[slideIndex]).then(() => {
          player.play();
        });
      });
      const targetElement = document.querySelector("#video-title");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      player.pause().then(() => {
        player.loadVideo(videoThumbCodes[index]).then(() => {
          player.play();
        });
      });
      const targetElement = document.querySelector("#video-title");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Animación scroll

const videoGrid = document.querySelector(".video-grid");
if (videoGrid) {
  const observer = new IntersectionObserver(
    ([entry]) => videoGrid.classList.toggle("is-visible", entry.isIntersecting),
    { threshold: 0.02 }
  );
  observer.observe(videoGrid);
}
