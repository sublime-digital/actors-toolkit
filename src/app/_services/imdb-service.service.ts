import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MovieReview {
  author: string;
  rating: number;
  comment: string;
}

export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  posterUrl: string; // <-- Add this property
  reviews: MovieReview[];
}

@Injectable({
  providedIn: 'root',
})
export class ImdbService {

  private http = inject(HttpClient);
  private apiUrl = 'https://api.example.com/imdb/new-releases';

  // private apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_TMDB_API_KEY';

  /* getNewReleasesWithReviews(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      map((movies) => movies.slice(0, 8))
    );
  } */

    // Mock implementation for testing without an actual API
  getNewReleasesWithReviews(): Observable<Movie[]> {
    return of([
      {
        id: '1',
        title: 'Inception',
        releaseDate: '2010-07-16',
        posterUrl: 'https://picsum.photos/400/225?random=1',
        reviews: [{ author: 'Alice', rating: 9, comment: 'Mind-bending classic.' }]
      },
      {
        id: '2',
        title: 'Interstellar',
        releaseDate: '2014-11-07',
        posterUrl: 'https://picsum.photos/400/225?random=2',
        reviews: [{ author: 'Bob', rating: 10, comment: 'Visual masterpiece.' }]
      }
    ]);
  }
}
