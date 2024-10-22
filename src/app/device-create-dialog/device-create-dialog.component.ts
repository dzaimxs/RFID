import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { CreateDeviceModel } from './CreateDeviceModel';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-device-create-dialog',
  standalone: true,
  imports: [MatFormField,MatLabel,MatTableModule,FormsModule, MatDivider, MatLabel,MatInputModule ],
  templateUrl: './device-create-dialog.component.html',
  styleUrl: './device-create-dialog.component.css'
})
export class DeviceCreateDialogComponent {
  device: CreateDeviceModel = {devicename: '', ipaddress: '', designatedaddress: ''};

  constructor(private dialogRef: MatDialogRef<DeviceCreateDialogComponent>) {}

  onSubmit():void{
    this.dialogRef.close(this.device)
  }
}
