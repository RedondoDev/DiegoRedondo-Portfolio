const photoSection = document.querySelectorAll(".photo-container > img");
const fullImgBox = document.querySelector(".full-img-box");
const fullImg = document.querySelector(".full-img");

photoSection.forEach((img) => {
  const fullImgTitle = document.querySelector(".full-img-box > h3");
  img.addEventListener("click", () => {
    fullImgBox.classList.add("is-shown");
    fullImg.src = img.src;
    fullImgTitle.textContent = img.dataset.name;
  });
});

fullImgBox.addEventListener("click", () => {
  fullImgBox.classList.remove("is-shown");
});