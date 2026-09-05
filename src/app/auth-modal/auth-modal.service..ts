import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  isOpen = signal<boolean>(false);
  targetFeature = signal<string>('Pro Feature');

  open(featureName: string = 'Pro Feature'): void {
    this.targetFeature.set(featureName);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
