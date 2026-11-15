import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { randText } from '@ngneat/falso';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from '../models/models';

@Service()
export class TodoService {
  private http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.completed,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete(todo: Todo): Observable<void> {
    return this.http
      .delete<void>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => new Error(err.message));
        }),
      );
  }
}
