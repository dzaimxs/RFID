import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { RoleCreateDialogComponent } from '../role-create-dialog/role-create-dialog.component';
import { RoleUpdateDialogComponent } from '../role-update-dialog/role-update-dialog.component';
import { RoleDeleteDialogComponent } from '../role-delete-dialog/role-delete-dialog.component';
import { CreateUserRoleModel } from '../role-create-dialog/CreateUserRoleModel';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';


interface UserRoleModel{
  idusers: number;
  idroles: number;
  firstname: string;
  lastname: string;
  rolename: string;
}


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [MatTableModule, MatTooltip,HttpClientModule,MatTableModule,FormsModule,MatFormFieldModule,NgIf,MatPaginatorModule,MatPaginator,MatInputModule,MatIcon],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit{


  roles: MatTableDataSource<UserRoleModel> = new MatTableDataSource<UserRoleModel>([]);

  isInputVisible: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void{
    this.loadRoles();
  }

  loadRoles(): void{
    this.http.get<UserRoleModel[]>('http://localhost:5016/api/Role').subscribe(
      data => {
        this.roles.data = data;
        console.log('Roles:',this.roles)
      },
      error =>{
        console.error('Error occured while trying to fetch userrole data',error)
      }
    )
  }
  openCreateUserRoleDialog(): void {
    const dialogRef = this.dialog.open(RoleCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createRole(result); 
      }
    });
  }

  createRole(user: CreateUserRoleModel): void {
    this.http.post<UserRoleModel>('http://localhost:5016/api/Role', user).subscribe(
      response => {
        this.loadRoles(); 
      },
      error => {
        if (error.status === 404) {
          // Handle user not found case
          this.showErrorMessage(error.error.message); // Access the message property from JSON
        } else {
          console.error('Error creating role', error);
        }
      }
    );
  }
  
  showErrorMessage(message: string): void {
    alert(message);
  }

  // Method to open the edit dialog
  openEditUserRoleDialog(userrole: UserRoleModel): void {
    const dialogRef = this.dialog.open(RoleUpdateDialogComponent, {
      data: userrole, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateRole(result); 
      }
    });
  }

  updateRole(userrole: UserRoleModel): void {
    this.http.put(`http://localhost:5016/api/Role/${userrole.idusers}/${userrole.idroles}`, userrole).subscribe(
      response => {
        this.loadRoles(); 
      },
      error => {
        console.error('Error updating userrole', error);
      }
    );
  }


  openDeleteUserRoleDialog(idusers: number): void {
    const dialogRef = this.dialog.open(RoleDeleteDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRole(idusers); 
      }
    });
  }
  
  deleteRole(idusers: number): void {
    this.http.delete(`http://localhost:5016/api/Role/${idusers}`).subscribe(
      () => {
        this.loadRoles(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }


  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  
    this.roles.filterPredicate = (data: UserRoleModel, filter: string) => {
      return data.firstname.toLowerCase().includes(filter) || 
             data.lastname.toLowerCase().includes(filter) ||
             data.rolename.toLowerCase().includes(filter)

    };
  
    this.roles.filter = filterValue.trim().toLowerCase();
  }


 




}
