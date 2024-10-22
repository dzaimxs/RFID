import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { UpdateUserModel } from './UpdateUserModel';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-user-update-dialog',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatLabel,MatTableModule,MatFormField,MatInputModule],
  templateUrl: './user-update-dialog.component.html',
  styleUrl: './user-update-dialog.component.css'
})
export class UserUpdateDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateUserModel) {}

  onSubmit(): void {
    this.dialogRef.close(this.data); // Pass back the updated user data
  }

}
