import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-user-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './user-delete-dialog.component.html',
  styleUrl: './user-delete-dialog.component.css'
})
export class UserDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<UserDeleteDialogComponent>) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  confirm(): void {
      this.dialogRef.close(true);
  }
}
