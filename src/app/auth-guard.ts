import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // Check if the user is logged in. You can check the presence of a token or other indicators
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
