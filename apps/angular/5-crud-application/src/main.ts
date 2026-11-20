import { provideZoneChangeDetection } from '@angular/core';
import { appConfig } from './app/app.config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { errorHandlingInterceptor } from './app/features/todos/interceptors/errorHandling.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideZoneChangeDetection(),
    ...appConfig.providers,
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
  ],
}).catch((err) => console.error(err));
