import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { OnInit, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatMenuModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebarForMe: EventEmitter<any>=new EventEmitter();

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }

  userEmail: string | null = null;
  private emailSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the user's email and update the component when it changes
    this.emailSubscription = this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  logout() {
    // Call the AuthService to handle logout
    this.authService.logout();
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }

}
