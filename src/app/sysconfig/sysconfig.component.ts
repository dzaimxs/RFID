import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { SysconfigDeleteDialogComponent } from '../sysconfig-delete-dialog/sysconfig-delete-dialog.component';
import { SysconfigUpdateDialogComponent } from '../sysconfig-update-dialog/sysconfig-update-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SysconfigCreateDialogComponent } from '../sysconfig-create-dialog/sysconfig-create-dialog.component';
import { ItemtypeCreateDialogComponent } from '../itemtype-create-dialog/itemtype-create-dialog.component';
import { ItemtypeUpdateDialogComponent } from '../itemtype-update-dialog/itemtype-update-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';

interface TypeModel {
  id: number;
  name: string;
  description:string;
  categoryname:string;
}

interface CategoryModel {
  id: number;
  name: string;
  description:string;
}

interface LocationsModel {
  id: number;
  name: string;
  description:string;
}


@Component({
  selector: 'app-sysconfig',
  standalone: true,
  imports: [CommonModule, MatTooltip,MatTableModule, MatTabsModule, HttpClientModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatIconModule,FormsModule,MatCheckboxModule,MatNativeDateModule,MatButtonModule,MatMenuModule,MatMenuTrigger,MatDialogModule],
  templateUrl: './sysconfig.component.html',
  styleUrl: './sysconfig.component.css'
})
export class SysconfigComponent implements OnInit {

  categorycolumns: string[]  = ['id','name','actions'];
  locationscolumns: string[]  = ['id','name','actions'];
  typescolumns: string[]  = ['id','name','categname','actions'];

  categories: CategoryModel[] = [];
  locations: LocationsModel[] = [];
  types: TypeModel[]=[];


  constructor(private http: HttpClient, private dialog: MatDialog) {} 

  ngOnInit(): void {

    this.loadReportC();
    this.loadReportL();
    this.loadReportT();

  }


  loadReportC(): void {
    this.http.get<CategoryModel[]>('http://localhost:5016/api/Config/categories').subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  loadReportL(): void {
    this.http.get<LocationsModel[]>('http://localhost:5016/api/Config/locations').subscribe(
      data => {
        console.log('Locations data:', data); // Log the data to check the response
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations data', error);
      }
    );
}

loadReportT(): void {
  this.http.get<TypeModel[]>('http://localhost:5016/api/Config/itemtypes').subscribe(
    data => {
      this.types = data;
    },
    error => {
      console.error('Error fetching  data', error);
    }
  );
}


  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(SysconfigCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory(result.description);
      }
    });
  }

  addCategory(element: CategoryModel): void {
    this.http.post(`http://localhost:5016/api/Config/categories/${element}`,element).subscribe(
      () => {
        this.loadReportC(); // Refresh the category list
      },
      error => {
        console.error('Error adding category', error);
      }
    );
  }

  openAddTypeDialog(element:TypeModel): void {
    const dialogRef = this.dialog.open(ItemtypeCreateDialogComponent,{
      data:element,
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addType(result);
      }
    });
  }

  addType(element: TypeModel): void {
    this.http.post(`http://localhost:5016/api/Config/itemtypes/${element.description}/${element.categoryname}`,element).subscribe(

      () => {
        this.loadReportT(); // Refresh the category list
      },
      error => {
        console.error('Error adding type', error);
      }
    );
  }

  openAddLocationDialog(): void {
    const dialogRef = this.dialog.open(SysconfigCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addLocation(result.description);
      }
    });
  }

  addLocation(element: LocationsModel): void {
    this.http.post(`http://localhost:5016/api/Config/locations/${element}`,element).subscribe(
      () => {
        this.loadReportL(); 
      },
      error => {
        console.error('Error adding location', error);
      }
    );
  }

  openEditCategoryDialog(element: CategoryModel): void {
    const dialogRef = this.dialog.open(SysconfigUpdateDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(result);
      }
    });
  }

  updateCategory(element: CategoryModel): void {
    this.http.put(`http://localhost:5016/api/Config/categories/${element.id}/${element.description}`,element).subscribe(
      () => {
        this.loadReportC(); // Refresh the category list
      },
      error => {
        console.error('Error updating category', error);
      }
    );
  }

  openEditTypeDialog(element: TypeModel): void {
    const dialogRef = this.dialog.open(ItemtypeUpdateDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateType(result);
      }
    });
  }

  updateType(element: TypeModel): void {
    this.http.put(`http://localhost:5016/api/Config/itemtypes/${element.id}/${element.description}/${element.categoryname}`,element).subscribe(
      () => {
        this.loadReportT(); // Refresh the category list
      },
      error => {
        console.error('Error updating ', error);
      }
    );
  }

  openEditLocationDialog(element: LocationsModel): void {
    const dialogRef = this.dialog.open(SysconfigUpdateDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLocation(result);
      }
    });
  }

  updateLocation(element: LocationsModel): void {
    this.http.put(`http://localhost:5016/api/Config/locations/${element.id}/${element.description}`,element).subscribe(
      () => {
        this.loadReportL(); // Refresh the category list
      },
      error => {
        console.error('Error updating location', error);
      }
    );
  }

  openDeleteCategoryDialog(Id: number): void {
    const dialogRef = this.dialog.open(SysconfigDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(Id);
      }
    });
  }

  deleteCategory(id: number): void {
    this.http.delete(`http://localhost:5016/api/Config/categories/${id}`).subscribe(
      () => {
        this.loadReportC(); // Refresh the category list
      },
      error => {
        console.error('Error deleting category', error);
      }
    );
  }

  openDeleteLocationDialog(Id: number): void {
    const dialogRef = this.dialog.open(SysconfigDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocation(Id);
      }
    });
  }

  deleteLocation(id: number): void {
    this.http.delete(`http://localhost:5016/api/Config/locations/${id}`).subscribe(
      () => {
        this.loadReportL(); // Refresh the category list
      },
      error => {
        console.error('Error deleting category', error);
      }
    );
  }

  openDeleteTypeDialog(Id: number): void {
    const dialogRef = this.dialog.open(SysconfigDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteType(Id);
      }
    });
  }

  deleteType(id: number): void {
    this.http.delete(`http://localhost:5016/api/Config/itemtypes/${id}`).subscribe(
      () => {
        this.loadReportT(); 
      },
      error => {
        console.error('Error deleting ', error);
      }
    );
  }



}
