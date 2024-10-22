// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmailSubject = new BehaviorSubject<string | null>(null); // To track email
  private authTokenSubject = new BehaviorSubject<string | null>(null); // To track auth token

  // Observables to be used in components to get the current state
  userEmail$ = this.userEmailSubject.asObservable();
  authToken$ = this.authTokenSubject.asObservable();

  constructor() {}

  login(token: string, email: string) {
    // Store token and email in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    
    // Update BehaviorSubjects
    this.authTokenSubject.next(token);
    this.userEmailSubject.next(email);
  }

  logout() {
    // Clear localStorage and update BehaviorSubjects
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    
    this.authTokenSubject.next(null);
    this.userEmailSubject.next(null);
  }

  checkAuthStatus() {
    // Initialize BehaviorSubjects with values from localStorage
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    this.authTokenSubject.next(token);
    this.userEmailSubject.next(email);
  }
}
