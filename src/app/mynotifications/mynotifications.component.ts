import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NgModel } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-mynotifications',
  standalone: true,
  imports: [MatMenuModule, MatCheckboxModule,FormsModule,CommonModule,MatIconModule,MatButtonModule,MatCard,MatLabel,MatFormField],
  templateUrl: './mynotifications.component.html',
  styleUrl: './mynotifications.component.css'
})
export class MynotificationsComponent {

  subscribeToAssetStatus: boolean = false;
  subscribeToAssetMovement: boolean = false;

  // Toggle Asset Status subscription
  toggleAssetStatus(): void {
    this.subscribeToAssetStatus = !this.subscribeToAssetStatus;
    console.log('Asset Status Subscribed:', this.subscribeToAssetStatus);
  }

  // Toggle Asset Movement subscription
  toggleAssetMovement(): void {
    this.subscribeToAssetMovement = !this.subscribeToAssetMovement;
    console.log('Asset Movement Subscribed:', this.subscribeToAssetMovement);
  }

}
