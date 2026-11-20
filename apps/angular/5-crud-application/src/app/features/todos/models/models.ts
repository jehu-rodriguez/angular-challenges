export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  todos: ReadonlyArray<Todo>;
  isLoading: boolean;
  error: string | null
}
