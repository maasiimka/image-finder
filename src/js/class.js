import makeMarcup from "../templates/gallery.hbs";
import { input, gallery } from "../index";

export default class Marcup {
  constructor() {
    this.page = 1;
    this.basicUrl = "https://pixabay.com/api/";
    this.key = "25751248-04b86ae71a4beca8ab7aa2525";
  }

  makeRequest(themeForSearch) {
    const { basicUrl, page, key } = this;
    return fetch(
      `${basicUrl}?image_type=photo&orientation=horizontal&q=${themeForSearch}&page=${page}&per_page=12&key=${key}`
    )
      .then((res) => res.json())
      .then((res) => res.hits);
  }

  createMarcup(arr) {
    gallery.insertAdjacentHTML("beforeend", makeMarcup(arr));
  }

  writeDownMarcup() {
    if (this.readInput() === "") {
      return;
    }
    this.makeRequest(this.readInput()).then(this.createMarcup);
    this.page += 1;
  }

  readInput() {
    return input.value.trim();
  }

  clearContainer() {
    gallery.innerHTML = "";
    this.page = 1;
  }
}
