import Menu from './components/menu.js';
import List from './components/list.js';

const STATE_KEY = 'state_key';
export default class App {
  constructor() {
    this.state = null;
  }

  init() {
    window.addEventListener('load', () => {
      this.menu = new Menu('menu');
      this.list = new List('books-list');
      this.load();
      this.update();
      this.navigate(window.location.hash);
      window.addEventListener('popstate', () => this.navigate(window.location.hash));
      const form = document.getElementById('form');
      form.addEventListener('submit', (e) => {
        const temp = {};
        new FormData(form).forEach((value, key) => { temp[key] = value; });
        const { author, title } = temp;
        const book = { author, title };
        this.add(book);
        e.preventDefault();
        form.reset();
      });
    });
  }

  add(book) {
    this.state.books.push(book);
    this.update();
    this.save();
  }

  remove(i) {
    this.state.books.splice(i, 1);
    this.update();
    this.save();
  }

  update() {
    this.list.update(this.state.books.map((data, i) => ({ data, action: () => this.remove(i) })));
  }

  navigate(hash) {
    if (!hash) hash = '#list';
    this.menu.update(hash);
    document.querySelectorAll('section.active').forEach((section) => {
      section.classList.remove('active');
    });
    document.querySelector(hash).classList.add('active');
  }

  save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
  }

  load() {
    this.state = JSON.parse(localStorage.getItem(STATE_KEY)) || { books: [] };
  }
}