import { provideHttpClient, withXhr } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { TodoReducer } from './features/todos/state/todo.reducer';
import { provideEffects } from '@ngrx/effects';
import { deleteTodo, loadTodos, updateTodo } from './features/todos/state/todo.effects';


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr()),
  provideStore({
    todos: TodoReducer
  }),
  provideEffects({
    loadTodos: loadTodos,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
  })
  ],
};
