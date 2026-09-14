import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

export const proAccessGuard: CanActivateFn = () => {
  const dialog = inject(MatDialog);
  const router = inject(Router);

  // Check user subscription/auth status here
  const isProUser = false;

  if (isProUser) {
    return true;
  }

  const dialogRef = dialog.open(AuthModalComponent, {
    panelClass: 'pro-feature-dialog'
  });

  // Handles backdrop clicks (outside the modal)
  dialogRef.afterClosed().subscribe(() => {
    router.navigate(['/']);
  });

  return false;
};
