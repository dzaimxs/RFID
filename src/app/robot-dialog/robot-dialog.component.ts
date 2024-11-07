import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { DeviceStatus } from './DeviceStatus';

@Component({
  selector: 'app-robot-dialog',
  standalone: true,
  imports: [MatDialogActions,CommonModule,MatDialogContent,MatTableModule,MatIcon],
  templateUrl: './robot-dialog.component.html',
  styleUrl: './robot-dialog.component.css'
})
export class RobotDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RobotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { connectionhistory: DeviceStatus[] }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
