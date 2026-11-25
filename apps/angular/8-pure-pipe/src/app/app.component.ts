import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyComputationPipe } from './pipes/heavy-computation.pipe';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [HeavyComputationPipe],
  template: `
    @for (person of persons; track $index) {
      {{ person | heavyComputation: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
