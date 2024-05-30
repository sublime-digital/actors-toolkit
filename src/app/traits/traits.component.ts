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
  
  sound = new Audio("../../assets/bell.wav");
  playSound() {
    this.sound.play();
    console.log("sound played");
  }

}
