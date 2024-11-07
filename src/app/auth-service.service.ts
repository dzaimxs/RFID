// auth.service.ts
import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userEmailSubject = new BehaviorSubject<string | null>(null); // To track email
  private authTokenSubject = new BehaviorSubject<string | null>(null); // To track auth token

  private roleSubject = new BehaviorSubject<string | null>(null); // To track auth token

  // Observables to be used in components to get the current state
  userEmail$ = this.userEmailSubject.asObservable();
  authToken$ = this.authTokenSubject.asObservable();

  role$ = this.roleSubject.asObservable();

  constructor() {}



  login(token: string, email: string, role:string) {
    // Store token and email in localStorage
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userEmail', email);

    sessionStorage.setItem('role', role);
    
    // Update BehaviorSubjects
    this.authTokenSubject.next(token);
    this.userEmailSubject.next(email);

    this.roleSubject.next(role)
  }

  logout() {
    // Clear localStorage and update BehaviorSubjects
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');

    sessionStorage.removeItem('role');
    
    this.authTokenSubject.next(null);
    this.userEmailSubject.next(null);

    this.roleSubject.next(null);
  }

  checkAuthStatus() {
    // Initialize BehaviorSubjects with values from localStorage
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('userEmail');

    const role = sessionStorage.getItem('role');
    console.log('Retrieved role from session storage:', role);

    this.authTokenSubject.next(token);
    this.userEmailSubject.next(email);

    this.roleSubject.next(role);
  }
 
  getRole(): string | null {
    return this.roleSubject.value; // Return current role from BehaviorSubject
  }

}
