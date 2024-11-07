import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild,ElementRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; 
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AssetUpdateDialogComponent } from '../asset-update-dialog/asset-update-dialog.component';
import { AssetCreateDialogComponent } from '../asset-create-dialog/asset-create-dialog.component';
import { CreateAssetModel } from '../asset-create-dialog/CreateAssetModel';
import { AssetDeleteDialogComponent } from '../asset-delete-dialog/asset-delete-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import Papa from 'papaparse';
import { AssetDisableDialogComponent } from '../asset-disable-dialog/asset-disable-dialog.component';
import { DisableAssetModel } from '../asset-disable-dialog/DisableAssetModel';
import { AuthService } from '../auth-service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

interface AssetModel{
  idassets:number,
  rfidserialnr: string;
  itemtypename: string;
  categoryname:string;
  dateadded: string;
  status: string;

}

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatTooltip,HttpClientModule,MatTableModule,FormsModule,MatFormFieldModule,AssetCreateDialogComponent,MatLabel,MatInputModule,MatPaginator,MatPaginatorModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})

export class AssetComponent implements OnInit, OnDestroy {

  userEmail: string | null = null;
  emailSubscription: Subscription | null = null;;

  assets: MatTableDataSource<AssetModel> = new MatTableDataSource<AssetModel>([]);

  isInputVisible: boolean = false;

  @ViewChild('csvFileInput') csvFileInput!: ElementRef; //ref input file
  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  constructor(private http: HttpClient, private dialog: MatDialog,private authService: AuthService) {}


  displayedColumns: string[] = ['rfidserialnr', 'itemtypename', 'categoryname','dateadded', 'status'];

  getDisplayedColumns(): string[] {
    if (this.shouldShowActions()) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }


  shouldShowActions(): boolean {
    const role = this.authService.getRole();
    return role !== 'User'; // Hide actions if the role is 'User'
  }


  ngOnInit(): void{

    this.emailSubscription = this.authService.userEmail$.subscribe(email => {
      this.userEmail = email; // Get the email from AuthService
    });

    this.loadAssets();
    this.fetchAssetReasons();
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }

  loadAssets(): void{
    this.http.get<AssetModel[]>('http://localhost:5016/api/Asset').subscribe(
      data => {
        this.assets.data = data;
        console.log('Assets:',this.assets)
      },
      error =>{
        console.error('Error occured while trying to fetch asset data',error)
      }
    )
  }

  openCreateAssetDialog(): void {
    const dialogRef = this.dialog.open(AssetCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createAsset(result.rfidserialnr,result.itemtypename); 
      }
    });
  }

  createAsset(rfidserialnr: string, itemtypename: number): void {
    this.http.post<any>(`http://localhost:5016/api/Asset/${rfidserialnr}/${itemtypename}/Enabled`, null).subscribe(
      response => {
        this.loadAssets(); // Refresh the  list
      },
      error => {
        console.error('Error creating asset', error);
      }
    );
  }


 // Method to open the edit dialog
 openEditAssetDialog(asset: AssetModel): void {
  const dialogRef = this.dialog.open(AssetUpdateDialogComponent, {
    data: asset, // Pass the user data to the dialog
    
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Result from dialog:', result);
      this.updateAsset(result); 
    }
  });
}


updateAsset(asset: AssetModel): void {
  this.http.put(`http://localhost:5016/api/Asset/${asset.idassets}`, asset).subscribe(
    response => {
      this.loadAssets(); 
    },
    error => {
      console.error('Error updating asset', error);
    }
  );
}

openDeleteAssetDialog(assetId: number): void {
  const dialogRef = this.dialog.open(AssetDeleteDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteAsset(assetId); 
    }
  });
}

deleteAsset(id: number): void {
  this.http.delete(`http://localhost:5016/api/Asset/${id}`).subscribe(
    () => {
      this.loadAssets(); // Refresh the list after deletion
    },
    error => {
      console.error('Error deleting asset', error);
    }
  );
}


//disble asset
reasons: DisableAssetModel[] = [];

fetchAssetReasons(): void {
  this.http.get<DisableAssetModel[]>('http://localhost:5016/api/Asset/AssetReasons').subscribe(
      (data) => {
          this.reasons = data;
      },
      (error) => {
          console.error('Error fetching reasons', error);
      }
  );
}

openDisableAssetDialog(assetId: number): void {
  const dialogRef = this.dialog.open(AssetDisableDialogComponent, {
      data: { reasons: this.reasons }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.disableAsset(assetId, result.reasonId,result.customReason);
    }
  });
}

disableAsset(assetId: number, reasonId: number, customReason: string): void {
  const requestBody = {
    Id: assetId,
    ReasonId: reasonId,
    CustomReason: customReason,
    UserEmail: this.userEmail
  };

  this.http.put(`http://localhost:5016/api/Asset/toggleStatus`, requestBody).subscribe(
      response => {
        console.log('Enable response:', response);
          this.loadAssets();
      },
      error => {
          console.error(`Error disabling asset`, error);
      }
  );
}

enableAsset(assetId: number): void {
  const requestBody = {
      Id: assetId,
      ReasonId: null,
      CustomReason:null
  };

  this.http.put(`http://localhost:5016/api/Asset/toggleStatus`, requestBody).subscribe(
      response => {
          console.log('Enable response:', response);
          this.loadAssets();
      },
      error => {
          console.error(`Error toggling asset to enabled`, error.error);
      }
  );
}
//end

applySearch(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;

  this.assets.filterPredicate = (data: AssetModel, filter: string) => {
    return data.rfidserialnr.toLowerCase().includes(filter) || 
           data.itemtypename.toLowerCase().includes(filter) ||
           data.dateadded.toLowerCase().includes(filter) ||
           data.status.toLowerCase().includes(filter);
  };

  this.assets.filter = filterValue.trim().toLowerCase();
}


//import csv


 // Trigger file input when button is clicked
 triggerFileInput(): void {
  this.csvFileInput.nativeElement.click();
}

// Handle file change and upload using FormData
onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file, file.name); // Append the file to FormData

    // Send the file to the backend using HttpClient
    this.http.post('http://localhost:5016/api/Asset/import', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        this.loadAssets(); // Optionally reload assets after file upload
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}






};






