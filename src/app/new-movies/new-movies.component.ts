import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Service & Interfaces
import { OmdbService, OmdbMovieDetails } from '../_services/omdb.service';

@Component({
  selector: 'app-new-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './new-movies.component.html',
  styleUrls: ['./new-movies.component.css'],
})
export class NewMoviesComponent implements OnInit {
  private omdbService = inject(OmdbService);
  private snackBar = inject(MatSnackBar);

  movies = signal<OmdbMovieDetails[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.isLoading.set(true);
    this.omdbService.getNewReleasesWithReviews('2024').subscribe({
      next: (data) => {
        this.movies.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching OMDb data:', err);
        this.isLoading.set(false);
        this.snackBar.open('Failed to load new movie releases.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  failedImageIds = signal<Set<string>>(new Set());

  onImageError(imdbID: string): void {
    this.failedImageIds.update(set => {
      const updated = new Set(set);
      updated.add(imdbID);
      return updated;
    });
  }

  isImageValid(movie: OmdbMovieDetails): boolean {
    return (
      !!movie.Poster &&
      movie.Poster !== 'N/A' &&
      !this.failedImageIds().has(movie.imdbID)
    );
  }
}
