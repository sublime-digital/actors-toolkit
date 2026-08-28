import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

import { AffirmationsComponent } from './affirmations.component';
import { ImdbService, Movie } from '../_services/imdb-service.service';

describe('AffirmationsComponent', () => {
  let component: AffirmationsComponent;
  let fixture: ComponentFixture<AffirmationsComponent>;
  //let imdbServiceMock: { getNewReleasesWithReviews: ReturnType<typeof vi.fn> };
  let imdbServiceMock: any;

  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Inception',
      releaseDate: '2010-07-16',
      posterUrl: 'https://example.com/inception.jpg',
      reviews: [{ author: 'Elena', rating: 9.5, comment: 'Mind-bending!' }],
    },
    {
      id: '2',
      title: 'Interstellar',
      releaseDate: '2014-11-07',
      posterUrl: 'https://example.com/interstellar.jpg',
      reviews: [{ author: 'Marcus', rating: 10, comment: 'Visual masterpiece.' }],
    },
  ];

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [AffirmationsComponent],
    providers: [
      { provide: ImdbService, useValue: imdbServiceMock },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(AffirmationsComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- 1. INITIALIZATION TESTS ---
  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch new releases from ImdbService on init', () => {
      fixture.detectChanges(); // Trigger ngOnInit

      expect(imdbServiceMock.getNewReleasesWithReviews).toHaveBeenCalledTimes(1);
      expect(component.movies()).toEqual(mockMovies);
    });

    it('should initialize with the first movie selected', () => {
      fixture.detectChanges();

      expect(component.currentIndex()).toBe(0);
      expect(component.currentMovie()).toEqual(mockMovies[0]);
      expect(component.currentTitle()).toBe('Inception');
      expect(component.currentImage()).toBe('https://example.com/inception.jpg');
      expect(component.currentLink()).toBe('/movies/1');
    });
  });

  // --- 2. DOM RENDERING TESTS ---
  describe('DOM Rendering', () => {
    it('should render the active movie title, image, link, and review in the DOM', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;

      const titleEl = compiled.querySelector('.card-header h6');
      const imgEl = compiled.querySelector('.image-frame img') as HTMLImageElement;
      const linkEl = compiled.querySelector('a') as HTMLAnchorElement;
      const reviewText = compiled.querySelector('.italic')?.textContent;

      expect(titleEl?.textContent).toContain('Inception');
      expect(imgEl?.src).toBe('https://example.com/inception.jpg');
      expect(linkEl?.getAttribute('href')).toBe('/movies/1');
      expect(reviewText).toContain('Mind-bending!');
    });
  });

  // --- 3. CAROUSEL & TIMER TESTS ---
  describe('Carousel Rotation', () => {
    it('should cycle to the next movie every 5 seconds', fakeAsync(() => {
      fixture.detectChanges(); // ngOnInit starts interval

      expect(component.currentIndex()).toBe(0);

      // Advance clock by 5000ms
      tick(5000);
      fixture.detectChanges();

      expect(component.currentIndex()).toBe(1);
      expect(component.currentTitle()).toBe('Interstellar');
      expect(component.currentImage()).toBe('https://example.com/interstellar.jpg');

      // Clean up pending timers in fakeAsync zone
      tick(5000);
    }));

    it('should wrap back to the first movie after reaching the end of the list', fakeAsync(() => {
      fixture.detectChanges();

      // Tick twice to wrap back (2 items in array)
      tick(5000); // Index -> 1
      tick(5000); // Index -> 0
      fixture.detectChanges();

      expect(component.currentIndex()).toBe(0);
      expect(component.currentTitle()).toBe('Inception');

      tick(5000);
    }));
  });

  // --- 4. EDGE CASE TESTS ---
  describe('Edge Cases', () => {
    it('should handle empty movie array gracefully', () => {
      imdbServiceMock.getNewReleasesWithReviews.mockReturnValue(of([]));
      fixture.detectChanges();

      expect(component.movies()).toEqual([]);
      expect(component.currentTitle()).toBe('Featured Releases');
      expect(component.currentImage()).toBe('assets/placeholder-ad.jpg');
      expect(component.currentLink()).toBe('#');
    });

    it('should use placeholder image if posterUrl is missing', () => {
      const movieWithoutPoster: Movie[] = [
        { id: '99', title: 'No Poster Movie', releaseDate: '2024-01-01', posterUrl: '', reviews: [] },
      ];
      imdbServiceMock.getNewReleasesWithReviews.mockReturnValue(of(movieWithoutPoster));
      fixture.detectChanges();

      expect(component.currentImage()).toBe('assets/placeholder-ad.jpg');
    });
  });
});
