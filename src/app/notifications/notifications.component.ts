import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

interface UserNotificationModel {
  id: number;
  email: string;
  description: string;
}

interface GroupNotificationModel {
  id: number;
  email: string;
  description: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule, HttpClientModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatIconModule,FormsModule,MatCheckboxModule,MatNativeDateModule,MatButtonModule,MatMenuModule,MatMenuTrigger],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  usernotificationreportcolumns: string[]  = ['id','email','description','actions'];
  groupnotificationreportcolumns: string[]  = ['id','email','description','actions'];

  users: UserNotificationModel[] = [];
  groups: GroupNotificationModel[] = [];

  constructor(private http: HttpClient) {} 

  ngOnInit(): void {
    this.loadReportUser();
    this.loadReportGroup();

  }

  loadReportUser(): void {
    this.http.get<UserNotificationModel[]>('http://localhost:5016/api/Notification').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  loadReportGroup(): void {
    this.http.get<GroupNotificationModel[]>('http://localhost:5016/api/Notification').subscribe(
      data => {
        this.groups = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
  openCreateNotificationDialog(): void {

  }
  openEditNotificationDialog(): void {

  }
  openDeleteNotificationDialog(): void {

  }

}
