import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CreateSysConfigModel } from './CreateSysConfigModel';

@Component({
  selector: 'app-sysconfig-create-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel,MatTableModule,FormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSelectModule,MatOptionModule],
  templateUrl: './sysconfig-create-dialog.component.html',
  styleUrl: './sysconfig-create-dialog.component.css'
})
export class SysconfigCreateDialogComponent {

  user: CreateSysConfigModel = { description: ''};

  constructor(private dialogRef: MatDialogRef<SysconfigCreateDialogComponent>, private http:HttpClient) {}

  onSubmit(): void {
    this.dialogRef.close(this.user); // Close the dialog and return the user data
  }

}
