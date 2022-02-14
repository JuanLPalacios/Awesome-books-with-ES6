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
      this.navigate(window.location.hash);
      window.addEventListener('popstate', () => this.navigate(window.location.hash));
      const form = document.getElementById('form');
      form.addEventListener('submit', (e) => {
        const { author, title } = e.namedValues;
        const book = { author, title };
        this.add(book);
        e.preventDefault();
      });
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