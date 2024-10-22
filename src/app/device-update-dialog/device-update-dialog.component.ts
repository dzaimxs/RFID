import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { UpdateDeviceModel } from './UpdateDeviceModel';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-device-update-dialog',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatLabel,MatTableModule,MatFormField,MatInputModule],
  templateUrl: './device-update-dialog.component.html',
  styleUrl: './device-update-dialog.component.css'
})


export class DeviceUpdateDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeviceUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateDeviceModel) {}

  onSubmit(): void {
    console.log('Submitting:', this.data);
    this.dialogRef.close(this.data); // Pass back the updated device data
  }

}
