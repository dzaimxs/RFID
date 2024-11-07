import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResetUserPasswordModel } from './ResetUserPasswordModel';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel,MatTableModule,FormsModule,MatInputModule,MatFormFieldModule],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.css'
})
export class ResetPasswordDialogComponent {
  user: ResetUserPasswordModel = {email: ''};//{email: '',password:'' };

  constructor(private dialogRef: MatDialogRef<ResetPasswordDialogComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.user); 
  }

}
