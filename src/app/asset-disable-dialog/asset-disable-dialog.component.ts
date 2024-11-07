import { MatDialogRef } from '@angular/material/dialog';
import { DisableAssetModel } from './DisableAssetModel';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-asset-disable-dialog',
  standalone:true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatLabel,MatTableModule,CommonModule,MatSelectModule],
  templateUrl: './asset-disable-dialog.component.html',
  styleUrls: ['./asset-disable-dialog.component.css']
})
export class AssetDisableDialogComponent {
  selectedReasonId: number | null = null;
  reasons: DisableAssetModel[];

  customReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<AssetDisableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reasons: DisableAssetModel[] }
  ) {
    this.reasons = data.reasons;
  }

  onSubmit(): void {
    this.dialogRef.close({ 
      reasonId: this.selectedReasonId,
      customReason: this.customReason, });
  }
}
