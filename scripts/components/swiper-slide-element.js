class SwiperSlide extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    const src = this.getAttribute("src");
    const poster = this.getAttribute("poster");
    const section = this.getAttribute("section");
    const title = this.getAttribute("title");
    const description = this.getAttribute("description") ?? "Diego Redondo";

    this.classList.add("swiper-slide");

    this.innerHTML = `
        <div class="video-wrapper" data-target="#video-title">
          <video
            class="carousel-video"
            src="${src}"
            muted
            loop
            playsinline
            preload="none"
            poster="${poster}"
          ></video>
        </div>
        <div class="video-info">
          <h3 data-section="${section}" data-value="title">${title}</h3>
          <p data-section="${section}" data-value="description">
            ${description}
          </p>
        </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("swiper-slide", SwiperSlide);
