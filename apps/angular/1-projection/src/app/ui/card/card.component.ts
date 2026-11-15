import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
} from '@angular/core';
import { CardRowDirective } from '../../directives/card-row-directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img" />
      <section>
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="row()?.templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>
      <ng-content select="button" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule],
})
export class CardComponent<T> {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly row = contentChild(CardRowDirective<T>);
}
