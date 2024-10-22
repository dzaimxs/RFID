import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { CreateAssetModel } from './CreateAssetModel';

@Component({
  selector: 'app-asset-create-dialog',
  standalone: true,
  imports: [MatFormField,MatLabel,MatTableModule,FormsModule, MatDivider, MatLabel,MatInputModule],
  templateUrl: './asset-create-dialog.component.html',
  styleUrl: './asset-create-dialog.component.css'
})
export class AssetCreateDialogComponent {
  asset: CreateAssetModel = {rfidserialnr: '', itemtypename: ''};

  constructor(private dialogRef: MatDialogRef<AssetCreateDialogComponent>) {}

  onSubmit():void{
    this.dialogRef.close(this.asset)
  }
}
