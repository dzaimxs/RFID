import { Component,OnInit  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth-service.service';

import { LogoService } from '../logo.service';


import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatIconModule,RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{

  currentRole: string | null = null;
  
  logoUrl: string = '../../assets/company.JPG'; // Default logo

  constructor(private authService: AuthService, private logoService: LogoService) {
    this.authService.role$.subscribe(role => {
      this.currentRole = role;
    });
  
  }

  shouldShowUserManagement(): boolean {
    return this.currentRole === 'Administrator'; //only admin to view usermanagement, roles & permissions
  }

  ngOnInit() {
    this.logoService.logoUrl$.subscribe(url => {
      this.logoUrl = url; // Update the logo URL when it changes
    });
  }

}
