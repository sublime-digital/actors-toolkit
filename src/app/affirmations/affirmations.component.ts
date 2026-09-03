import { Component, OnInit, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { OmdbService, OmdbMovieDetails } from '../_services/omdb.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'app-affirmations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.css']
})

export class AffirmationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.startSwitching();

    // 1. Load the 8 new releases
      this.omdbService.getNewReleasesWithReviews('2024').subscribe({
        next: (movies: OmdbMovieDetails[]) => {
          console.log('Movies with reviews:', movies);
          // movies[0].Ratings will contain Rotten Tomatoes / Metacritic / IMDb reviews
        },
        error: (err) => console.error(err)
      });
  }

  private omdbService = inject(OmdbService);
  private destroyRef = inject(DestroyRef);

  movies = signal<Movie[]>([]);
  currentIndex = signal<number>(0);

  // Computed signals bound to your HTML signals
  currentMovie = computed(() => this.movies()[this.currentIndex()]);

  currentImage = computed(() => {
    const movie = this.currentMovie();
    // Return movie poster or fallback placeholder image
    return movie?.posterUrl || '../../assets/adverts/advert004.png';
  });

  currentLink = computed(() => {
    const movie = this.currentMovie();
    return movie ? `/movies/${movie.id}` : '#';
  });

  currentTitle = computed(() => this.currentMovie()?.title ?? 'Featured Releases');

  private startCarousel(): void {
    // 2. Cycle index every 5 seconds (auto-unsubscribes on component destroy)
    interval(5000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.movies().length > 0) {
          this.currentIndex.update((idx) => (idx + 1) % this.movies().length);
        }
      });
  }

  //Start affirmations code
  affirmation = ""

  allaffirmation = [
    "Today will be an awesome day",
    "I am hopeful for all my tomorrows",
    "I am letting go of the painful memories",
    "I am leading my life from a place of love",
    "I deserve the good things only if i work hard for them"
  ]

  getNew() {
    this.affirmation = this.allaffirmation[Math.floor(Math.random()*this.allaffirmation.length)];
  }

  submitted = false;

  onSubmit() { this.submitted = true; }

    // Start Advertisement Code

    /*

      private images = [
      '../../assets/adverts/advert001.png',
      '../../assets/adverts/advert002.png',
      '../../assets/adverts/advert003.png',
      '../../assets/adverts/advert004.png',
    ];

  private links = [
      "https://www.youtube.com/@AllDay-Foodie",
      "/",
      "https://www.patreon.com/plants_and_poetry/shop/zenfit-spinning-classes-10-videos-1750922",
      "/",
      "/",
    ];

    private currentIndex = signal(0);
    private timerId: any;

    // 3. Computed signal for the template
    readonly currentImage = computed(() => this.images[this.currentIndex()]);
    readonly currentLink = computed(() => this.links[this.currentIndex()]);

    ngOnDestroy(): void {
            if (this.timerId) clearInterval(this.timerId);
    }

    startSwitching() {
      this.timerId = setInterval(() => {
        this.currentIndex.update(idx => (idx + 1) % this.images.length);
      }, 5000); // 5000ms = 5 seconds
    } */
}


