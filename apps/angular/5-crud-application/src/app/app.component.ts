import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { TodoService } from '../app/services/todo.service';
import { Todo } from './models/models';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <mat-spinner />
    }
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);

  todos = signal<Todo[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.todoService
      .getTodos()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (todos) => this.todos.set(todos),
        error: (err) => console.log(err),
      });
  }

  update(todo: Todo): void {
    this.todoService.update(todo).subscribe({
      next: (updatedTodo) => {
        this.todos.update((todos) =>
          todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
        console.log(`updated: ${todo.id}`);
      },
      error: (err) => console.error(`error ${err}`),
    });
  }

  delete(todo: Todo): void {
    this.todoService.delete(todo).subscribe({
      next: () => {
        this.todos.update((todos) => todos.filter((t) => t.id != todo.id));
      },
      error: (err) => console.error(`error ${err}`),
    });
  }
}
