import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // Check if the user is logged in. You can check the presence of a token or other indicators
    const isAuthenticated = sessionStorage.getItem('authToken') !== null;

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
