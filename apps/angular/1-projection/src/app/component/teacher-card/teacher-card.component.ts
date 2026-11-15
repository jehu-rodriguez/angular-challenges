import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../directives/card-row-directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="bg-light-red">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />

      <ng-template cardRow let-teacher>
        <app-list-item
          [name]="teacher.firstName"
          (deleted)="deleteTeacher(teacher.id)" />
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewTeacher()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardRowDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
