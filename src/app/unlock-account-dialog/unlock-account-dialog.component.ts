import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UnlockUserModel } from './UnlockUserModel';


@Component({
  selector: 'app-unlock-account-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel,MatTableModule,FormsModule,MatInputModule,MatFormFieldModule],
  templateUrl: './unlock-account-dialog.component.html',
  styleUrl: './unlock-account-dialog.component.css'
})
export class UnlockAccountDialogComponent {
  user: UnlockUserModel = {email: ''};//{email: '',password:'' };

  constructor(private dialogRef: MatDialogRef<UnlockAccountDialogComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.user); 
  }
}
