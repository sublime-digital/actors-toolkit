import { Component, computed, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalService } from '../auth-modal/auth-modal.service.';

@Component({
  selector: 'app-traits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.css']
})
export class TraitsComponent implements OnInit, OnDestroy {
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

  // 3. Slider & Storage State (Key-Indexed Signal Map for all 12 sliders)
  public sliderValues = signal<Record<string, number>>({
    slider1: 50,
    slider2: 50,
    slider3: 50,
    slider4: 50,
    slider5: 50,
    slider6: 50,
    slider7: 50,
    slider8: 50,
    slider9: 50,
    slider10: 50,
    slider11: 50,
    slider12: 50
  });

  // 4. Component Feature Flags & Audio
  public isLoggedIn = false; // Replace with Auth Signal/Service as needed
  public showProModal = false;
  public goodmoods = false;
  private sound = new Audio('../../assets/bell.wav');

  // 5. Lifecycle Hooks
  ngOnInit(): void {
    // Start automated ad rotation
    this.startSwitching();

    // Restore saved slider values from localStorage on page refresh
    const savedData = localStorage.getItem('userTraitsSliders');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.sliderValues.set({ ...this.sliderValues(), ...parsed });
      } catch (e) {
        console.error('Error loading traits sliders from localStorage:', e);
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
  public onSliderInput(sliderId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    this.sliderValues.update(current => ({
      ...current,
      [sliderId]: value
    }));
  }

  public onSubmit(): void {
    this.playSound();
    localStorage.setItem('userTraitsSliders', JSON.stringify(this.sliderValues()));
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
