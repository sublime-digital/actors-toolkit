import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalService } from './auth-modal.service.';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (authModalService.isOpen()) {
      <div class="modal-backdrop-custom d-flex align-items-center justify-content-center" (click)="close()">
        <div class="modal-dialog modal-dialog-centered w-100 px-3" style="max-width: 460px;" (click)="$event.stopPropagation()">
          <div class="modal-card shadow-lg rounded-4 p-4 text-center">

            <div class="mb-3">
              <span class="pro-badge px-3 py-1 rounded-pill fw-semibold">
                PRO FEATURE
              </span>
            </div>

            <h3 class="modal-title h4 fw-bold mb-2">Access Restricted</h3>
            <p class="modal-subtitle mb-4">
             This feature is reserved for Pro members. Unlock full access to training and assessment tools.
            </p>

            <div class="d-grid gap-3 mb-3">
              <button type="button" class="btn btn-action-primary py-2 fw-bold" (click)="login()">
                Log In / Register
              </button>
              <button type="button" class="btn btn-action-secondary py-2 fw-bold" (click)="upgrade()">
                Upgrade to Pro
              </button>
            </div>

            <button type="button" class="btn btn-link link-dismiss p-0" (click)="close()">
              Maybe Later
            </button>

          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop-custom {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(3, 8, 18, 0.82);
      z-index: 99999 !important;
      backdrop-filter: blur(8px);
    }

    .modal-card {
      /* Palette extracted from UI background gradient */
      background: linear-gradient(145deg, #071220 0%, #030a13 100%);
      border: 1px solid rgba(85, 202, 214, 0.2);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(18, 120, 138, 0.15) !important;
      color: #ffffff;
    }

    .pro-badge {
      background: rgba(85, 202, 214, 0.12);
      color: #55cad6;
      border: 1px solid rgba(85, 202, 214, 0.3);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
    }

    .modal-title {
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .modal-subtitle {
      color: #8da4b8;
      font-size: 0.92rem;
      line-height: 1.5;
    }

    .modal-subtitle strong {
      color: #55cad6;
    }

    .btn-action-primary {
      background-color: #55cad6;
      color: #030a13;
      border: none;
      transition: all 0.2s ease-in-out;
    }

    .btn-action-primary:hover {
      background-color: #6ee2ef;
      box-shadow: 0 0 15px rgba(85, 202, 214, 0.4);
      color: #030a13;
    }

    .btn-action-secondary {
      background: transparent;
      color: #ffffff;
      border: 1px solid rgba(141, 164, 184, 0.3);
      transition: all 0.2s ease-in-out;
    }

    .btn-action-secondary:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.6);
      color: #ffffff;
    }

    .link-dismiss {
      color: #6b8296;
      font-size: 0.88rem;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .link-dismiss:hover {
      color: #8da4b8;
    }
  `]
})
export class AuthModalComponent {
  authModalService = inject(AuthModalService);

  close(): void {
    this.authModalService.close();
  }

  login(): void {
    this.close();
  }

  upgrade(): void {
    this.close();
  }
}
