import GalleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  openModalWindow: document.querySelector("div.lightbox"),
  lightboxButton: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector("div.lightbox__content")


 

};

function CreateGalleryItems() {
  const arr = [];

  const elemLi = document.createElement("li");
  const elemA = document.createElement("a");
  const elemImg = document.createElement("img");
  const elemSpan = document.createElement("span");
  const elemI = document.createElement("i");

  elemLi.classList.add("gallery__item");
  elemA.classList.add("gallery__link");
  elemImg.classList.add("gallery__image");
  elemSpan.classList.add("gallery__icon");
  elemI.classList.add("material-icons");


  elemLi.append(elemA, elemSpan);
  elemA.appendChild(elemImg);
  elemSpan.appendChild(elemI);

  GalleryItems.forEach(item => {
    elemA.href = item.original;
    elemImg.src = item.preview;
    elemImg.alt = item.description;
    elemImg.dataset.source = item.original;
    arr.push(elemLi.outerHTML);
  });
  return arr.join(" ");
}

refs.gallery.insertAdjacentHTML("afterbegin", CreateGalleryItems());



refs.gallery.addEventListener("click", handeleOpenItem);
refs.lightboxButton.addEventListener("click", hangeleCloseButton);
refs.overlay.addEventListener("click", hangeleCloseOverlay);

function handeleOpenItem(evt) {
  evt.preventDefault();
  const targetImage = evt.target;
  if (targetImage === evt.currentTarget) {
    return; 
  }
  
  refs.openModalWindow.classList.add("is-open");
  
  refs.lightboxImage.alt = targetImage.alt;
  refs.lightboxImage.src = targetImage.dataset.source;
  window.addEventListener("keyup", handleEscape);
  window.addEventListener("keyup", handleScrolling);
}

function hangeleCloseButton() {
  refs.openModalWindow.classList.remove("is-open");
  
  refs.lightboxImage.alt = "";
  refs.lightboxImage.src = "";
  window.removeEventListener("keyup", handleEscape);
  window.removeEventListener("keyup", handleScrolling);
};
