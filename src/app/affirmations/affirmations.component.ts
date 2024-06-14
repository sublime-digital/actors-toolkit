import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.css']
})
export class AffirmationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  affirmation = ""

  allaffirmation = [
    "today will be an awesome day",
    "i am hopeful for all my tomorrows",
    "i am letting go of the painful memories",
    "i am leading my life from a place of love",
    "i deserve the good things only if i work hard for them"
  ]

  getNew() {
    this.affirmation = this.allaffirmation[Math.floor(Math.random()*this.allaffirmation.length)];
  }

submitted = false;

onSubmit() { this.submitted = true; }
}

