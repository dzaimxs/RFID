import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CreateSysConfigTypeModel } from './CreateSysConfigTypeModel';

@Component({
  selector: 'app-itemtype-create-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel,MatTableModule,FormsModule,MatInputModule,MatFormFieldModule,CommonModule,MatSelectModule,MatOptionModule],
  templateUrl: './itemtype-create-dialog.component.html',
  styleUrl: './itemtype-create-dialog.component.css'
})
export class ItemtypeCreateDialogComponent implements OnInit{
  data: CreateSysConfigTypeModel = { description: '', categoryname:''};


  assetCategories: any[] = [];

  constructor(private dialogRef: MatDialogRef<ItemtypeCreateDialogComponent>, private http:HttpClient) {}

  ngOnInit(): void {
    this.loadAssetCategories();
  }
  loadAssetCategories(): void {
    this.http.get<any[]>('http://localhost:5016/api/Dashboard/categories').subscribe(
      (categories) => {
        this.assetCategories = categories;
      },
      (error) => {
        console.error('Error fetching asset types', error);
      }
    );
  }


  onSubmit(): void {
    this.dialogRef.close(this.data); 
  }
}
