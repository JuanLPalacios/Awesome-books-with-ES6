export default class List {
  constructor(id) {
    this.id = id;
  }

  update(list) {
    document.getElementById(this.id).innerHTML = list.map(({ data }) => `<li>
      <h6>"${data.title}"  by ${data.author} </h6>
      <button type="button">Remove</button>
    </li>`).join('');
    document.querySelectorAll(`#${this.id} > li button`).forEach((li, i) => li.addEventListener('click', () => list[i].action()));
  }
}