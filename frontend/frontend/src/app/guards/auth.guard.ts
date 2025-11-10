import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.auth.getUserLocal();
    if (user) return true;

    alert('Debes iniciar sesión primero.');
    this.router.navigate(['/login']);
    return false;
  }
}
