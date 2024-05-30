import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood-record',
  templateUrl: './mood-record.component.html',
  styleUrls: ['./mood-record.component.css']
})
export class MoodRecordComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  goodmood = false;

  logMood(): void {
    
  }

  sound = new Audio("../../assets/bell.wav");
  playSound() {
    this.sound.play();
    console.log("sound played");
  }


}
