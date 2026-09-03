import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { actorsReducer } from './state/actors.reducer';
import { ActorsEffects } from './state/actors.effects';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import your AppRoutingModule

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppRoutingModule), // Wrap AppRoutingModule here
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({ actors: actorsReducer }),
    provideEffects([ActorsEffects]),
  ],
};
