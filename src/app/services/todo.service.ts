import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';
declare var require:any;
const crypto = require('crypto');

@Injectable()
export class TodoService {
  private todos: Todo[];
  private nextId: number;

  constructor() {
    var saved = localStorage.getItem('todos');
    this.todos = (localStorage.getItem('todos')!==null) ? JSON.parse(saved) : [];
    localStorage.setItem('todos', JSON.stringify(this.todos));
    }

  public addTodo(text: string): void {
    if(text){
      
      var current_date = (new Date()).valueOf().toString();
      var random = Math.random().toString();
      var id = current_date+random;
      
      let todo = new Todo(id, text);
      this.todos.push(todo);

      this.setLocalStorageTodos(this.todos);
    }
  }

  public getTodos(): Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  public removeTodo(t: Todo): void {
    this.todos = this.getTodos().filter((todo)=> todo.id != t.id);
    this.setLocalStorageTodos(this.todos);
  }

  private setLocalStorageTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }));
  }
}
