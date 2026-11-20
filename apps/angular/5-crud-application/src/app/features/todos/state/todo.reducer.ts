import { createReducer, on } from "@ngrx/store"
import { TodoState } from "../models/models"
import { TodoActions } from "./todo.actions"

export const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null
}

export const TodoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    isLoading: true
  })),

  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    isLoading: false
  })),

  on(TodoActions.loadTodosError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),

  on(TodoActions.updateTodo, (state) => ({
    ...state,
    isLoading: true
  })),

  on(TodoActions.updateTodoSuccess, (state, { todos }) => ({
    ...state,
    todos: state.todos.map((t) => t.id === todos.id ? todos : t),
    isLoading: false
  })),

  on(TodoActions.updateTodoError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),

  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    isLoading: true
  })),

  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id != id),
    isLoading: false
  })),

  on(TodoActions.deleteTodoError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  }))
)
