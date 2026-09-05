import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthModalService } from '../auth-modal/auth-modal.service.';

@Component({
  selector: 'app-traits',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.css']
})
export class TraitsComponent implements OnInit {


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

        // 2. State management with signals
    private currentIndex = signal(0);
    private timerId: any;

    // 3. Computed signal for the template
    readonly currentImage = computed(() => this.images[this.currentIndex()]);
    readonly currentLink = computed(() => this.links[this.currentIndex()]);

    ngOnInit() {
      this.startSwitching();
    }

    ngOnDestroy(): void {
            if (this.timerId) clearInterval(this.timerId);
    }

    startSwitching() {
      this.timerId = setInterval(() => {
        this.currentIndex.update(idx => (idx + 1) % this.images.length);
      }, 5000); // 5000ms = 5 seconds
    }

  constructor() { }

  goodmoods = false;

  sound = new Audio("../../assets/bell.wav");
  playSound() {
    this.sound.play();
    console.log("sound played");
  }

  isLoggedIn = false; // Replace with your Auth state signal or service

  private authModalService = inject(AuthModalService);


  proTools(): void {
    if (!this.isLoggedIn) {
      // Launch auth guard modal if unauthenticated
      this.authModalService.open('Pro Modal');
      return;
    }

    // Unlocked feature execution
    this.goodmoods = false;
  }

  showProModal = false;

  closeProModal(): void {
    this.showProModal = false;
  }

}
