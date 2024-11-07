import { Component,Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatLabel} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { UpdateSysConfigModel } from './UpdateSysConfigModel';

@Component({
  selector: 'app-sysconfig-update-dialog',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatLabel,MatTableModule,MatFormField,MatInputModule,MatOptionModule,CommonModule,MatSelectModule,MatOptionModule],
  templateUrl: './sysconfig-update-dialog.component.html',
  styleUrl: './sysconfig-update-dialog.component.css'
})
export class SysconfigUpdateDialogComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<SysconfigUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateSysConfigModel, private http:HttpClient) {}
  ngOnInit(): void {
    console.log('Dialog data:', this.data);  // Log the data to check if it's received correctly
  }
  onSubmit(): void {
    this.dialogRef.close(this.data); 
  }

}
