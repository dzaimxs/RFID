import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { UpdateAssetModel } from './UpdateAssetModel';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-update-dialog',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatLabel,MatTableModule,MatFormField,MatOptionModule,MatSelectModule,CommonModule],
  templateUrl: './asset-update-dialog.component.html',
  styleUrl: './asset-update-dialog.component.css'
})
export class AssetUpdateDialogComponent implements OnInit{
  
  asset: UpdateAssetModel = {rfidserialnr: '', itemtypename: 0, categoryname: 0, idassets: '', status: ''};

  assetTypes: any[] = [];
  assetCategories: any[] = [];
  
  isCategorySelected: boolean = false;

  constructor(public dialogRef: MatDialogRef<AssetUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateAssetModel,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAssetTypes();
    this.loadAssetCategories();
    this.asset = { ...this.data };

    if (this.asset.categoryname) {
      this.isCategorySelected = true;
      this.loadAssetTypesByCategory(this.asset.categoryname); // Load types for selected category
    }
  }


  loadAssetTypesByCategory(categoryId: number): void {
    this.http.get<any[]>(`http://localhost:5016/api/Asset/${categoryId}`).subscribe(
      (types) => {
        this.assetTypes = types;
      },
      (error) => {
        console.error('Error fetching asset types', error);
      }
    );
  }

  loadAssetTypes(): void {
    this.http.get<any[]>(`http://localhost:5016/api/Dashboard/itemtypes`).subscribe(
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
        console.error('Error fetching asset categories', error);
      }
    );
  }

  onCategoryChange(): void {
    // Check if a category is selected and then load asset types
    if (this.asset.categoryname) {
      this.isCategorySelected = true;
      this.loadAssetTypesByCategory(this.asset.categoryname); // Load types based on the selected category
    } else {
      this.isCategorySelected = false;
      this.assetTypes = []; // Clear asset types if no category is selected
    }
  }

  onSubmit(): void {
    console.log('Submitting:', this.data);
    this.dialogRef.close(this.data); // Pass back the updated device data
  }
}
