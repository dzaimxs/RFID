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
import { UpdateSysConfigTypeModel } from './UpdateSysConfigTypeModel';


@Component({
  selector: 'app-itemtype-update-dialog',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatLabel,MatTableModule,MatFormField,MatInputModule,MatOptionModule,CommonModule,MatSelectModule,MatOptionModule],
  templateUrl: './itemtype-update-dialog.component.html',
  styleUrl: './itemtype-update-dialog.component.css'
})
export class ItemtypeUpdateDialogComponent implements OnInit{


  assetCategories: any[] = [];


  constructor(public dialogRef: MatDialogRef<ItemtypeUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateSysConfigTypeModel, private http:HttpClient) {}

  ngOnInit(): void {
    
    this.loadAssetCategories();
  }

  loadAssetCategories(): void {
    this.http.get<any[]>('http://localhost:5016/api/Dashboard/categories').subscribe(
      (categories) => {
        this.assetCategories = categories;
      },
      (error) => {
        console.error('Error fetching asset categories', error);
      }
    );
  }


  onSubmit(): void {
    this.dialogRef.close(this.data); 
  }
}
