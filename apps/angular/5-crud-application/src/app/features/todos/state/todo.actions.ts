import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../models/models';

export const TodoActions = createActionGroup({
  source: "Todo Page",
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: ReadonlyArray<Todo> }>(),
    'Load Todos Error': props<{ error: string }>(),
    'Update Todo': props<{ todo: Todo }>(),
    'Update Todo Success': props<{ todos: Todo }>(),
    'Update Todo Error': props<{ error: string }>(),
    'Delete Todo': props<{ id: number }>(),
    'Delete Todo Success': props<{ id: number }>(),
    'Delete Todo Error': props<{ error: string }>()
  }
})
