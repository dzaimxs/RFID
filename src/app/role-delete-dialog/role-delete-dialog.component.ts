import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './role-delete-dialog.component.html',
  styleUrl: './role-delete-dialog.component.css'
})
export class RoleDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<RoleDeleteDialogComponent>) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  confirm(): void {
      this.dialogRef.close(true);
  }
}
