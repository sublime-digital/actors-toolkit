import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModalComponent } from '../app/auth-modal/auth-modal.component';
import { AuthModalService } from './auth-modal/auth-modal.service.';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      AuthModalComponent,
      RouterOutlet,
      RouterLink,       // 2. Add RouterLink
      RouterLinkActive  // 3. Add RouterLinkActive
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ActorsToolkit';

  isLoggedIn = false; // Replace with your Auth state signal or service

    private authModalService = inject(AuthModalService);

    proTools(): void {
      if (!this.isLoggedIn) {
        // Launch auth guard modal if unauthenticated
        this.authModalService.open('Pro Modal');
        return;
      }

      // Unlocked feature execution
    }

    showProModal = false;

    closeProModal(): void {
      this.showProModal = false;
    }

}
