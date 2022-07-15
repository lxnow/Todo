/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */

// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.


class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    const marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todoItem) {
    if (todoItem.constructor === Todo) this.todos.push(todoItem);
    else throw new TypeError("can only add Todo objects");
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(position) {
    this.itemAt(position).markDone();
  }

  markUndoneAt(position) {
    this.itemAt(position).markUndone();
  }

  _validateIndex(index) { // _ in name suggests a "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(position) {
    this._validateIndex(position);
    return this.todos.splice(position, 1);
  }

  toString() {
    let title = (`---- ${this.title} ----\n`);
    let list = this.todos.map(todo => todo.toString()).join('\n');
    return title + list;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let filteredList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) filteredList.add(todo);
    })
    return filteredList;
  }

  findByTitle(title) {
    // let foundTodo;
    // this.forEach(todo => {
    //   if (todo.title === title) foundTodo = todo;
    // });
    // return foundTodo;
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    // let doneList = new TodoList(this.title);
    // list.forEach(todo => {
    //   if (todo.isDone()) doneList.add(todo);
    // });
    // return doneList;
    return this.filter(todo => todo.isDone());
  }

  markDone(title) {
    // list.forEach(todo => {
    //   if (todo.title === title) todo.markDone();
    // });
    list.findByTitle(title).markDone();
  }

  markAllDone() {
    list.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    list.forEach(todo => todo.markUndone());
  }

  toArray() {
    // let arr = [];
    // this.forEach(todo => arr.push(todo));
    // return arr;
    return this.todos.slice();
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

console.log(list.findByTitle('Buy milk'))
console.log(list.findByTitle('Buyxx'))
console.log(list.allDone())

todo3.markDone();
console.log(`${list}`)

console.log(list.toArray())