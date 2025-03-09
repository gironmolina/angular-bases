import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import localLv from '@angular/common/locales/lv';
import { LocaleService } from './services/locale.service';

registerLocaleData(localEs,'es');
registerLocaleData(localLv,'lv');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale
    }
  ]
};
