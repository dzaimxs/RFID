import { Component,Inject, OnInit } from '@angular/core';
import { UpdateUserRoleModel } from './UpdateUserRoleModel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatLabel} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-role-update-dialog',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatLabel,MatTableModule,MatFormField,MatInputModule,MatOptionModule,CommonModule,MatSelectModule,MatOptionModule],
  templateUrl: './role-update-dialog.component.html',
  styleUrl: './role-update-dialog.component.css'
})

export class RoleUpdateDialogComponent implements OnInit{

  userRoles: any[] = [];

  constructor(public dialogRef: MatDialogRef<RoleUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateUserRoleModel, private http:HttpClient) {}


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
    this.dialogRef.close(this.data); 
  }
}
