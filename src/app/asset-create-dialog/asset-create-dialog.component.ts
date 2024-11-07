import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { CreateAssetModel } from './CreateAssetModel';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgForOf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-asset-create-dialog',
  standalone: true,
  imports: [MatFormField,MatLabel,MatTableModule,FormsModule, MatDivider, MatLabel,MatInputModule,MatOptionModule,MatOption,MatFormFieldModule,MatSelectModule,MatOption,CommonModule],
  templateUrl: './asset-create-dialog.component.html',
  styleUrl: './asset-create-dialog.component.css'
})
export class AssetCreateDialogComponent implements OnInit{
  asset: CreateAssetModel = {rfidserialnr: '', itemtypename: 0, categoryname: 0};

  assetTypes: any[] = []; 
  assetCategories: any[] = []; 

  isCategorySelected: boolean = false;

  constructor(private dialogRef: MatDialogRef<AssetCreateDialogComponent>,private http: HttpClient) {}

  ngOnInit(): void {
    //this.loadAssetTypes();
    this.loadAssetCategories();
  }


  loadAssetTypes(categoryId: number): void {
    this.http.get<any[]>(`http://localhost:5016/api/Asset/${categoryId}`).subscribe(
      (types) => {
        this.assetTypes = types;
      },
      (error) => {
        console.error('Error fetching asset types', error);
      }
    );
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

  onCategoryChange(): void {
    // Check if a category is selected and then load asset types
    if (this.asset.categoryname) {
      this.isCategorySelected = true;
      this.loadAssetTypes(this.asset.categoryname); // Load types based on the selected category
    } else {
      this.isCategorySelected = false;
      this.assetTypes = []; // Clear asset types if no category is selected
    }
  }

  onSubmit():void{
    this.dialogRef.close(this.asset)
  }
}
