import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "../models/models";

export const selectFeature = createFeatureSelector<TodoState>('todos');

export const selectTodos = createSelector(
  selectFeature,
  (state) => state.todos
)
export const selectTodosIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
)
export const selectTodosError = createSelector(
  selectFeature,
  (state) => state.error
)


