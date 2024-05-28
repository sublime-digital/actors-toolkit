import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.css']
})
export class TraitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goodmoods = false;
  
  sound = new Audio("../assets/sound.mp3");
  playSound() {
    this.sound.play();
  }

}
