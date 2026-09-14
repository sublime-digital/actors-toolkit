import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  public isOpen = signal<boolean>(false);
  public modalTitle = signal<string>('Upgrade to Pro');

  public open(title?: string): void {
    if (title) {
      this.modalTitle.set(title);
    }
    this.isOpen.set(true);
  }

  public openModal(title?: string): void {
    this.open(title);
  }

  public close(): void {
    this.isOpen.set(false);
  }

  public closeModal(): void {
    this.close();
  }
}
