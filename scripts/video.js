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
  on: {
    slideChangeTransitionEnd() {
      retranslate();
    }
  },
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
      if (videoElement.paused) {
        videoElement
          .play()
          .catch((err) => console.warn("No se pudo reproducir:", err));
      }
    } else if (!videoElement.paused) {
      videoElement.pause();
    }
  });
});

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", () => {
  swiper.slidePrev();
});

rightArrow.addEventListener("click", () => {
  swiper.slideNext();
});

// Scroll to video

const videoEmbedCodes = [
  "https://player.vimeo.com/video/1155097382", // - Aliexpress
  "https://player.vimeo.com/video/1155092739", // - Vetusta Morla
  "https://player.vimeo.com/video/1155095679", // - Óliver
  "https://player.vimeo.com/video/1155094764", // - Tu otra bonita
  "https://player.vimeo.com/video/1155597646", // - Beso Beach
];

const videoThumbCodes = [
  "https://player.vimeo.com/video/1155092739", // - Vetusta Morla
  "https://player.vimeo.com/video/1155094764", // - Tu otra bonita
  "https://player.vimeo.com/video/1155097100", // - Conociendo Rusia
  "https://player.vimeo.com/video/1155096114", // - Nuria Fergó
  "https://player.vimeo.com/video/1155096269", // - Marwan y Dani
  "https://player.vimeo.com/video/1155097195", // - Amanda Björn
  "https://player.vimeo.com/video/1155598347", // - Miravia Rivers 1
  "https://player.vimeo.com/video/1155097382", // - Aliexpress
  "https://player.vimeo.com/video/1155597646", // - Beso Beach
  "https://player.vimeo.com/video/1155096590", // - Miravia Rivers 2
  "https://player.vimeo.com/video/1155095679", // - Óliver
  "https://player.vimeo.com/video/1155096937", // - Miravia Cremades
  "https://player.vimeo.com/video/1155095062", // - Alfonso Bassave
  "https://player.vimeo.com/video/1155096799", // - Miravia Rivers 3
  "https://player.vimeo.com/video/1155095831", // - Maika Makovski
  "https://player.vimeo.com/video/1155095356", // - Russian Red
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

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      videoGrid.classList.add("is-visible");
    } else {
      videoGrid.classList.remove("is-visible");
    }
  },
  {
    threshold: 0.02,
  }
);

observer.observe(videoGrid);
