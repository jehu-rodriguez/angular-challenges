import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TodoActions } from "./todo.actions";
import { selectTodos, selectTodosError, selectTodosIsLoading } from "./todo.selector";
import { Todo } from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class TodoFacade {
  // interface for selecting and dispatching actions for todos
  private readonly store = inject(Store);
  todos = this.store.selectSignal(selectTodos)
  isLoading = this.store.selectSignal(selectTodosIsLoading)
  error = this.store.selectSignal(selectTodosError)

  loadTodos(): void {
    this.store.dispatch(TodoActions.loadTodos())
  }

  updateTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.updateTodo({ todo: todo }))
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({ id: id }));
  }
}
