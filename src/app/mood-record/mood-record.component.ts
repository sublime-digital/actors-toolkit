import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule

@Component({
  selector: 'app-mood-record',
  standalone: true,
  imports: [CommonModule], // 2. Add here
  templateUrl: './mood-record.component.html',
  styleUrls: ['./mood-record.component.css']
})
export class MoodRecordComponent implements OnInit {


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

  goodmood = false;

  logMood(): void {

  }

  sound = new Audio("../../assets/bell.wav");
  playSound() {
    this.sound.play();
    console.log("sound played");
  }


}
