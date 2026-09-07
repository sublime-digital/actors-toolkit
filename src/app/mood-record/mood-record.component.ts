import { Component, computed, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalService } from '../auth-modal/auth-modal.service.';

@Component({
  selector: 'app-mood-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood-record.component.html',
  styleUrls: ['./mood-record.component.css']
})
export class MoodRecordComponent implements OnInit, OnDestroy {
  // 1. Services & Dependencies
  private authModalService = inject(AuthModalService);

  // 2. Advert Carousel State & Signals
  private currentIndex = signal<number>(0);
  private timerId: ReturnType<typeof setInterval> | null = null;

  private readonly images: string[] = [
    '../../assets/adverts/advert001.png',
    '../../assets/adverts/advert002.png',
    '../../assets/adverts/advert003.png',
    '../../assets/adverts/advert004.png',
  ];

  private readonly links: string[] = [
    'https://www.youtube.com/@AllDay-Foodie',
    '/',
    'https://www.patreon.com/plants_and_poetry/shop/zenfit-spinning-classes-10-videos-1750922',
    '/',
  ];

  // Computed carousel properties for the template
  readonly currentImage = computed(() => this.images[this.currentIndex()]);
  readonly currentLink = computed(() => this.links[this.currentIndex()]);

  // 3. Good Feelings Sliders Signal Map
  public feelingsSliders = signal<Record<string, number>>({
    'range-spectacular': 50,
    'range-hopeful': 50,
    'range-kind': 50,
    'range-focused': 50,
    'range-powerful': 50,
    'range-strong': 50,
    'range-supportive': 50,
    'range-creative': 50,
    'range-nonchalant': 50,
    'range-open': 50,
    'range-relaxed': 50,
    'range-smooth': 50
  });

  // 4. Feature Flags & Audio
  public isLoggedIn = false;
  public showProModal = false;
  public goodmoods = false;
  private sound = new Audio('../../assets/bell.wav');

  constructor() {}

  // 5. Lifecycle Hooks
  ngOnInit(): void {
    // Start automated ad rotation
    this.startSwitching();

    // Restore saved slider values from localStorage on page refresh
    const savedFeelings = localStorage.getItem('userFeelingsSliders');
    if (savedFeelings) {
      try {
        const parsed = JSON.parse(savedFeelings);
        this.feelingsSliders.set({ ...this.feelingsSliders(), ...parsed });
      } catch (e) {
        console.error('Error loading feelings sliders from localStorage:', e);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  // 6. Advert Carousel Methods
  private startSwitching(): void {
    this.timerId = setInterval(() => {
      this.currentIndex.update(idx => (idx + 1) % this.images.length);
    }, 5000); // 5 seconds
  }

  // 7. Slider State Management Methods
  public onFeelingSliderInput(sliderId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    this.feelingsSliders.update(current => ({
      ...current,
      [sliderId]: value
    }));
  }

  public onSubmitFeelings(): void {
    this.playSound();
    localStorage.setItem('userFeelingsSliders', JSON.stringify(this.feelingsSliders()));
  }

  // 8. Interactive & Sound Actions
  public playSound(): void {
    this.sound.play();
    console.log('sound played');
  }

  public proTools(): void {
    if (!this.isLoggedIn) {
      // Launch auth guard modal if unauthenticated
      this.authModalService.open('Pro Modal');
      return;
    }
    // Unlocked feature execution
    this.goodmoods = false;
  }

  public closeProModal(): void {
    this.showProModal = false;
  }
}
