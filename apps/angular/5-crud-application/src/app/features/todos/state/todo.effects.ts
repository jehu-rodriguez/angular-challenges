import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TodoActions } from './todo.actions';

export const loadTodos = createEffect((
  actions$ = inject(Actions),
  todoService = inject(TodoService)
) => {
  return actions$.pipe(
    ofType(TodoActions.loadTodos),
    exhaustMap(() => todoService.getTodos().pipe(
      map((todos) => TodoActions.loadTodosSuccess({ todos: todos })),
      catchError((err) => of(
        TodoActions.loadTodosError({
          error: err
        }),
      ),)
    ))
  )
},
  { functional: true }
)

export const updateTodo = createEffect((
  actions$ = inject(Actions),
  todoService = inject(TodoService)
) => {
  return actions$.pipe(
    ofType(TodoActions.updateTodo),
    exhaustMap(({ todo }) => todoService.update(todo).pipe(
      map((todos) => TodoActions.updateTodoSuccess({ todos: todos })),
      catchError((err) => of(
        TodoActions.updateTodoError({
          error: err
        }),
      ),)
    ))
  )
},
  { functional: true }
)

export const deleteTodo = createEffect((
  actions$ = inject(Actions),
  todoService = inject(TodoService)
) => {
  return actions$.pipe(
    ofType(TodoActions.deleteTodo),
    exhaustMap(({ id }) => todoService.delete(id).pipe(
      map(() => TodoActions.deleteTodoSuccess({ id: id })),
      catchError((err) => of(
        TodoActions.updateTodoError({
          error: err
        }),
      ),)
    ))
  )
},
  { functional: true }
)
