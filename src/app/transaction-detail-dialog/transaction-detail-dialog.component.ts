import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { DashboardDrillDown } from './DashboardDrillDown';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-transaction-detail-dialog',
  standalone: true,
  imports: [MatDialogActions,CommonModule,MatDialogContent,MatTableModule,MatIcon],
  templateUrl: './transaction-detail-dialog.component.html',
  styleUrl: './transaction-detail-dialog.component.css'
})
export class TransactionDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TransactionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subTransactions: DashboardDrillDown[] }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
