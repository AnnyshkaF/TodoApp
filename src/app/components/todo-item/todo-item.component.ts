import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../classes/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
 
  @Input()
  public todo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  private getText(): string{
    return this.todo.text;
  }
  private removeTodo(): void {
    console.log(this.todo);
    this.todoService.removeTodo(this.todo);
  }
  private editTodo(): void {
    console.log(this.todo);
    this.todoService.editTodo(this.todo);
  }
}
