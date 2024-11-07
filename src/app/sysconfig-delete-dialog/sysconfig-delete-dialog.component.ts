import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sysconfig-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './sysconfig-delete-dialog.component.html',
  styleUrl: './sysconfig-delete-dialog.component.css'
})
export class SysconfigDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<SysconfigDeleteDialogComponent>) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  confirm(): void {
      this.dialogRef.close(true);
  }
}
