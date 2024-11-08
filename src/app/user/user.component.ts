import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModel } from '../user-create-dialog/CreateUserModel';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { UnlockAccountDialogComponent } from '../unlock-account-dialog/unlock-account-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

interface UserModel{
  idusers: number;
  firstname: string;
  lastname: string;
  email: string;
  dateadded: string;
  status: string;
  passwordhash: string; // Add passwordHash
  passwordresetrequired: number; // Add passwordResetRequired
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatTooltip,HttpClientModule,MatTableModule,FormsModule,MatFormFieldModule,NgIf,UserCreateDialogComponent,MatPaginatorModule,MatPaginator,MatInputModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  users: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>([]);

  isInputVisible: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void{
    this.loadUsers();
  }

  loadUsers(): void{
    this.http.get<UserModel[]>('http://localhost:5016/api/User').subscribe(
      data => {
        this.users.data = data;
        console.log('Users:',this.users)
      },
      error =>{
        console.error('Error occured while trying to fetch user data',error)
      }
    )
  }
  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(UserCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createUsers(result); // Call createUsers with the returned data
      }
    });
  }

  createUsers(user: CreateUserModel): void {
    this.http.post<UserModel>('http://localhost:5016/api/User', user).subscribe(
      response => {
        this.loadUsers(); // Refresh the user list
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  }

  // Method to open the edit dialog
  openEditUserDialog(user: UserModel): void {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      data: user, // Pass the user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(result); // Call updateUser with the updated data
      }
    });
  }


  updateUser(user: UserModel): void {
    this.http.put(`http://localhost:5016/api/User/${user.idusers}`, user).subscribe(
      response => {
        this.loadUsers(); // Refresh the user list
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }


  openDeleteUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId); // Pass the userId directly
      }
    });
  }

  deleteUser(id: number): void {
    this.http.delete(`http://localhost:5016/api/User/${id}`).subscribe(
      () => {
        this.loadUsers(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }

  toggleStatus(user: UserModel): void {

    this.http.put(`http://localhost:5016/api/User/toggleStatus/${user.idusers}`, {}).subscribe(
        () => {
            this.loadUsers();
        },
        error => {
            console.error(`Error toggling user`, error);
        }
    );
  }


  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  
    this.users.filterPredicate = (data: UserModel, filter: string) => {
      return data.firstname.toLowerCase().includes(filter) || 
             data.lastname.toLowerCase().includes(filter) ||
             data.email.toLowerCase().includes(filter) ||
             data.dateadded.toLowerCase().includes(filter) ||
             data.status.toLowerCase().includes(filter);
    };
  
    this.users.filter = filterValue.trim().toLowerCase();
  }


  openResetPasswordDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetPassword(result.email);//this.resetPassword(result.email, result.password);
    }
    });
  }
  resetPassword(email: string): void {
    this.http.put(`http://localhost:5016/api/User/resetpassword/${email}`, {}).subscribe(
      //this.http.put(`http://localhost:5016/api/User/resetpassword/${email}/${password}`, {}).subscribe(
      response => {
        console.log('Password reset completed');
      },
      error => {
        console.error('Error resetting password', error);
      }
    );
  }

  openUnlockAccountDialog(): void {
    const dialogRef = this.dialog.open(UnlockAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unlockUser(result.email);
    }
    });
  }
  unlockUser(email: string): void {
    this.http.put(`http://localhost:5016/api/User/unlock/${email}`, {}).subscribe(
    
      response => {
        console.log('Account reactivated');
      },
      error => {
        console.error('Error occured while trying to unlock the account', error);
      }
    );
  }




};

