import "./style.css";
import Marcup from "./js/class";
const { debounce } = require("lodash");
const basicLightbox = require("basiclightbox");
const body = document.querySelector("body");

export const input = document.querySelector(".js-input");
export const endpoint = document.querySelector(".js-endpoint");
export const gallery = document.querySelector(".js-insert-container");

const exampleOfMarcup = new Marcup();

const searchContent = () => {
  exampleOfMarcup.clearContainer();
  const options = {
    rootMargin: "50px",
    threshold: 0.0,
  };

  const onEntry = (entries) => {
    entries.forEach(() => {
      exampleOfMarcup.writeDownMarcup();
    });
  };

  const observer = new IntersectionObserver(onEntry, options);

  observer.observe(endpoint);
};

const findTarget = (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== "IMG") return;

  const urlOfBigPicture = target.getAttribute("data-big-image");

  writeDownModal(urlOfBigPicture);
};

function writeDownModal(url) {
  const instance = basicLightbox.create(`
    <img src="${url}" alt="" class="modal-image"></img>
  `);
  body.style.overflow = "hidden";

  instance.show();

  document
    .querySelector(".basicLightbox")
    .addEventListener("click", returnScroll);
}

gallery.addEventListener("click", findTarget);
input.addEventListener("input", debounce(searchContent, 800));
