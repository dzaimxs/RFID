import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './asset-delete-dialog.component.html',
  styleUrl: './asset-delete-dialog.component.css'
})
export class AssetDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<AssetDeleteDialogComponent>) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  confirm(): void {
      this.dialogRef.close(true);
  }
}
