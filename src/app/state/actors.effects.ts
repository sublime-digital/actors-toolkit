import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OmdbService, OmdbMovieDetails } from '../_services/omdb.service';
import { Movie, MovieReview } from '../_models/movie.model';
import { ActorsActions } from './actors.actions';

@Injectable()
export class ActorsEffects {
  private actions$ = inject(Actions);
  private omdbService = inject(OmdbService);

  loadActors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActorsActions.loadActors),
      switchMap(() =>
        this.omdbService.getNewReleasesWithReviews('2024').pipe(
          map((omdbMovies: OmdbMovieDetails[]) => {
            const mappedMovies: Movie[] = omdbMovies.map((item) => ({
              id: item.imdbID,
              title: item.Title,
              releaseDate: item.Released,
              posterUrl: item.Poster !== 'N/A' ? item.Poster : 'assets/placeholder.png',
              reviews: item.Ratings
                ? item.Ratings.map((r): MovieReview => ({
                    author: r.Source,
                    reviewer: r.Source,
                    comment: r.Value,
                    rating: 5,
                  }))
                : []
            }));

            return ActorsActions.loadActorsSuccess({ actors: mappedMovies });
          }),
          catchError((error) =>
            of(ActorsActions.loadActorsFailure({ error: error?.message || 'Failed to fetch' }))
          )
        )
      )
    )
  );
}
