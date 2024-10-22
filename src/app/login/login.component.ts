import { Component } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

interface LoginResponse {
  token: string;
  email: string;  
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FlexLayoutModule,MatFormFieldModule, MatInputModule,MatButtonModule,MatCardModule,MatToolbar,MatIcon,
    HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    "email":"",
    "passwordhash":""
  };
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
  
  isPasswordVisible: boolean = false;  // Variable to track password visibility
    // Method to toggle password visibility
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    }

  constructor(private http: HttpClient, private router: Router, private authService: AuthService){}
  
  onLogin() {
    this.http.post<LoginResponse>('http://localhost:5016/api/Login/login', this.loginObj).subscribe(
      (response) => {
        console.log('API Response:', response);

        if (response && response.token && response.email) {
          // Store the token and email using AuthService
          this.authService.login(response.token, response.email);
          // Redirect to the home page
          this.router.navigate(['home']);
        } else {
          alert('Login failed, please try again.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert(error.error.message || 'An unknown error occurred');
      }
    );
  }

  
} 