import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DeviceCreateDialogComponent } from '../device-create-dialog/device-create-dialog.component';
import { CreateDeviceModel } from '../device-create-dialog/CreateDeviceModel';
import { DeviceUpdateDialogComponent } from '../device-update-dialog/device-update-dialog.component';
import { DeviceDeleteDialogComponent } from '../device-delete-dialog/device-delete-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';


interface DeviceModel{
  iddevices: number;
  devicename: string;
  ipaddress: string;
  designatedaddress: string;
  dateadded: string;
  status: string;
  lastconnectiondatetime: string;
}

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatTableModule, MatTooltip,MatIcon,HttpClientModule,MatTableModule,FormsModule,MatFormFieldModule,DeviceCreateDialogComponent,MatPaginator,MatPaginatorModule,MatInputModule,CommonModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit{

  devices: MatTableDataSource<DeviceModel> = new MatTableDataSource<DeviceModel>([]);

 isInputVisible:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  constructor(private http: HttpClient, private dialog: MatDialog,private authService: AuthService) {}

  displayedColumns: string[] = ['devicename', 'ipaddress', 'designatedaddress', 'dateadded', 'status'];

  getDisplayedColumns(): string[] {
    if (this.shouldShowActions()) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }


  shouldShowActions(): boolean {
    const role = this.authService.getRole();
    return role !== 'User'; // Hide actions if the role is 'User'
  }

  ngOnInit(): void{
    this.loadDevices();
  }

  loadDevices(): void{
    this.http.get<DeviceModel[]>('http://localhost:5016/api/Device').subscribe(
      data => {
        this.devices.data = data;
        console.log('Devices:',this.devices)
        console.log('Fetched devices:', data); // Check the fetched devices
      },
      error =>{
        console.error('Error occured while trying to fetch device data',error)
      }
    )
  }
  openCreateDeviceDialog(): void {
    const dialogRef = this.dialog.open(DeviceCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createDevices(result); 
      }
    });
  }

  createDevices(device: CreateDeviceModel): void {
    this.http.post<DeviceModel>('http://localhost:5016/api/Device', device).subscribe(
      response => {
        this.loadDevices(); // Refresh the  list
      },
      error => {
        console.error('Error creating device', error);
      }
    );
  }

 // Method to open the edit dialog
 openEditDeviceDialog(device: DeviceModel): void {
  const dialogRef = this.dialog.open(DeviceUpdateDialogComponent, {
    data: device, // Pass data to the dialog
    
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Result from dialog:', result);
      this.updateDevice(result); 
    }
  });
}


updateDevice(device: DeviceModel): void {
  this.http.put(`http://localhost:5016/api/Device/${device.iddevices}`, device).subscribe(
    response => {
      this.loadDevices(); // Refresh the list
    },
    error => {
      console.error('Error updating device', error);
    }
  );
}


openDeleteDeviceDialog(deviceId: number): void {
  const dialogRef = this.dialog.open(DeviceDeleteDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteDevice(deviceId); 
    }
  });
}

deleteDevice(id: number): void {
  this.http.delete(`http://localhost:5016/api/Device/${id}`).subscribe(
    () => {
      this.loadDevices(); // Refresh the list after deletion
    },
    error => {
      console.error('Error deleting device', error);
    }
  );
}

applySearch(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;

  this.devices.filterPredicate = (data: DeviceModel, filter: string) => {
    return data.devicename.toLowerCase().includes(filter) || 
           data.ipaddress.toLowerCase().includes(filter) ||
           data.designatedaddress.toLowerCase().includes(filter) ||
           data.dateadded.toLowerCase().includes(filter) ||
           data.status.toLowerCase().includes(filter);
  };

  this.devices.filter = filterValue.trim().toLowerCase();
}



};







