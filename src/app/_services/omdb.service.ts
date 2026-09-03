import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Movie, MovieReview } from '../_models/movie.model';

export interface OmdbRating {
  Source: string;
  Value: string;
}

export interface OmdbMovieDetails {
  Title: string;
  Year: string;
  Rated?: string;
  Released: string;
  Runtime?: string;
  Genre: string;
  Director: string;
  Writer?: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: OmdbRating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  Response?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private http = inject(HttpClient);
  private apiKey = 'OMDB_API_KEY';
  private apiUrl = 'https://www.omdbapi.com/';

  getNewReleasesWithReviews(query: string = '2024'): Observable<OmdbMovieDetails[]> {
    return this.http.get<any>(`${this.apiUrl}?s=${encodeURIComponent(query)}&type=movie&apikey=${this.apiKey}`).pipe(
      switchMap((searchResponse) => {
        if (searchResponse.Response === 'True' && searchResponse.Search) {
          const detailRequests: Observable<OmdbMovieDetails>[] = searchResponse.Search.map(
            (movie: { imdbID: string }) =>
              this.http.get<OmdbMovieDetails>(`${this.apiUrl}?i=${movie.imdbID}&plot=short&apikey=${this.apiKey}`)
          );
          return forkJoin(detailRequests);
        }
        return of([]);
      })
    );
  }

  mapToMovie(item: OmdbMovieDetails): Movie {
    return {
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
        : [],
    };
  }
}
