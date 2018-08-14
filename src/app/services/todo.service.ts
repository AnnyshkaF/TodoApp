import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';
declare var require:any;
const crypto = require('crypto');

@Injectable()
export class TodoService {

  constructor() {
    }

  public addTodo(text: string): void {
    if(text){
      var current_date = (new Date()).valueOf().toString();
      var random = Math.random().toString();
      var id = current_date+random;
      
      let todo = new Todo(id, text);
      let todos = this.getTodos();
      todos.push(todo);
      this.setLocalStorageTodos(todos);

    }
  }

  public getTodos(): Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  public removeTodo(t: Todo): void {
    let todos = this.getTodos();
    todos = todos.filter((todo)=> todo.id != t.id);
    this.setLocalStorageTodos(todos);
  }

  public editTodo(t: Todo): void {
    let todos = this.getTodos();
    let text = prompt('Edit:', t.text);
    if(text){
    for (let i = 0; i < todos.length; i++) {
      if(todos[i].id == t.id){
        todos[i].text = text;
        break;
      }
    }
  }
    this.setLocalStorageTodos(todos);
  }

  private setLocalStorageTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }));
  }
}
