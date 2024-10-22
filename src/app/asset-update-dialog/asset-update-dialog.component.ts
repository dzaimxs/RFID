import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { UpdateAssetModel } from './UpdateAssetModel';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-asset-update-dialog',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatLabel,MatTableModule,MatFormField],
  templateUrl: './asset-update-dialog.component.html',
  styleUrl: './asset-update-dialog.component.css'
})
export class AssetUpdateDialogComponent {
  constructor(public dialogRef: MatDialogRef<AssetUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UpdateAssetModel) {}

  onSubmit(): void {
    console.log('Submitting:', this.data);
    this.dialogRef.close(this.data); // Pass back the updated device data
  }
}
