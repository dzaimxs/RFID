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

import { SetNewPasswordDialogComponent } from '../set-new-password-dialog/set-new-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  email: string;  
  role:string;
  requiresPasswordReset?: boolean;
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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService,private dialog: MatDialog){}
  
  onLogin() {
      this.http.post<LoginResponse>('http://localhost:5016/api/Login/login', this.loginObj).subscribe(
          (response) => {
              console.log('API Response:', response); // Log the response
              if (response && response.email) {
                  // Check if password reset is required
                  if (response.requiresPasswordReset) {
                      this.promptNewPassword(response.email);
                  } else {
                      this.authService.login(response.token, response.email,response.role);
                      this.router.navigate(['home']);
                  }
              } else {
                  console.log('Invalid login response:', response); // Log invalid response
                  alert('Login failed, please try again.');
              }
          },
          (error) => {
            console.error('Login error:', error);
            const errorMessage = error.error?.message || 'An unknown error occurred';
            alert(errorMessage);
          }
      );
  }
    promptNewPassword(email: string): void {
      const dialogRef = this.dialog.open(SetNewPasswordDialogComponent, {
        width: '400px',
        data: { email: email }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Password set successfully');
          // Handle successful password reset
        }
      });
    }

  
} 