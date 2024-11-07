import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateUserRoleModel } from './CreateUserRoleModel';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-role-create-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel,MatTableModule,FormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSelectModule,MatOptionModule],
  templateUrl: './role-create-dialog.component.html',
  styleUrl: './role-create-dialog.component.css'
})
export class RoleCreateDialogComponent implements OnInit{
  user: CreateUserRoleModel = { email: '' , idroles: 0};

  userRoles: any[] = [];

  constructor(private dialogRef: MatDialogRef<RoleCreateDialogComponent>, private http:HttpClient) {}

  ngOnInit(): void {
    this.loadUserRoles();
  }


  loadUserRoles(): void {
    this.http.get<any[]>('http://localhost:5016/api/Role/roles').subscribe(
      (roles) => {
        this.userRoles = roles;
      },
      (error) => {
        console.error('Error fetching asset types', error);
      }
    );
  }

  onSubmit(): void {
    this.dialogRef.close(this.user); // Close the dialog and return the user data
  }
}
