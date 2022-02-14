import Menu from './components/menu.js';
import List from './components/list.js';

const STATE_KEY = 'state_key';
export default class App {
  constructor() {
    this.state = null;
  }

  init() {
    window.addEventListener('load', () => {
      this.load();
      this.menu = new Menu('menu');
      this.list = new List('books-list');
    });
  }

  add(book) {
    this.state.books.push(book);
    this.list.update(this.state.books.map((data, i) => ({ data, action: () => this.remove(i) })));
    this.save();
  }

  remove(i) {
    this.state.books.splice(i, 1);
    this.list.update(this.state.books.map((data, i) => ({ data, action: () => this.remove(i) })));
    this.save();
  }

  save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
  }

  load() {
    this.state = JSON.parse(localStorage.getItem(STATE_KEY)) || { books: [] };
  }
}