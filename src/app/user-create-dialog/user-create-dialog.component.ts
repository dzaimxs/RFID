import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CreateUserModel } from './CreateUserModel';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-create-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel,MatTableModule,FormsModule,MatInputModule,MatFormFieldModule],
  templateUrl: './user-create-dialog.component.html',
  styleUrl: './user-create-dialog.component.css'
})

export class UserCreateDialogComponent {
  user: CreateUserModel = { firstname: '', lastname: '', email: '' };

  constructor(private dialogRef: MatDialogRef<UserCreateDialogComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.user); // Close the dialog and return the user data
  }
}
