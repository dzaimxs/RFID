import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./sidenav/sidenav.component";

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetNewPasswordDialogComponent } from './set-new-password-dialog/set-new-password-dialog.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth-service.service';
import { MatTableModule } from '@angular/material/table';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidenavComponent,SetNewPasswordDialogComponent,  
    MatSidenavModule,MatToolbarModule,MatMenuModule,MatIconModule, MatDividerModule,MatListModule,MatTableModule,MatTabsModule,
    FlexLayoutModule,MatFormFieldModule, MatInputModule,MatButtonModule,MatCardModule,HttpClientModule,FormsModule,MatDialogModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'Project';
  sideBarOpen=true;
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check the user's auth status when the app starts
    this.authService.checkAuthStatus();
  }
}
