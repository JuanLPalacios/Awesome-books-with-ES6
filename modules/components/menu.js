export default class Menu {
  constructor(id) {
    this.id = id;
  }

  update(hash) {
    document.querySelectorAll(`#${this.id} a.active`).forEach((a) => a.classList.remove('active'));
    document.querySelector(`#${this.id} a[href=${hash}]`).classList.remove('active');
  }
}