import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      RouterOutlet,
      RouterLink,       // 2. Add RouterLink
      RouterLinkActive  // 3. Add RouterLinkActive
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ActorsToolkit';
}
