import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-device-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './device-delete-dialog.component.html',
  styleUrl: './device-delete-dialog.component.css'
})
export class DeviceDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeviceDeleteDialogComponent>) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  confirm(): void {
      this.dialogRef.close(true);
  }
}
