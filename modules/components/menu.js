export default class Menu {
  constructor(id) {
    this.id = id;
    this.hash = null;
  }

  update(hash) {
    // TODO
    this.hash = hash;
  }
}