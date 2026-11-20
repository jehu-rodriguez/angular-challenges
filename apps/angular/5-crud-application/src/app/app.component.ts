import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoFacade } from './features/todos/state/todo.facade';
import { Todo } from './features/todos/models/models';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <mat-spinner />
    }@else if(error()){
      <p>{{ error() }} </p>
    }
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly todoFacade = inject(TodoFacade)
  todos = this.todoFacade.todos
  isLoading = this.todoFacade.isLoading
  error = this.todoFacade.error

  ngOnInit(): void {
    this.todoFacade.loadTodos()
  }

  update(todo: Todo): void {
    this.todoFacade.updateTodo(todo)
  }

  delete(id: number): void {
    this.todoFacade.deleteTodo(id)
  }

}
