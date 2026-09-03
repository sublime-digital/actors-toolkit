import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../_models/movie.model';

export const ActorsActions = createActionGroup({
  source: 'Actors',
  events: {
    'Load Actors': emptyProps(), // <--- Adds loadActors()
    'Load Actors Success': props<{ actors: Movie[] }>(),
    'Load Actors Failure': props<{ error: string }>(),
  },
});
