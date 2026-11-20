import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection(), provideEffects()],
}).catch((err) => console.error(err));
