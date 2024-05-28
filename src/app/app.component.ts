import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'happy-app';
  sound = new Audio("../assets/sound.mp3");
  playSound() {
    this.sound.play();
  }

}
