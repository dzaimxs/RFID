import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-set-new-password-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogContent, MatDialogActions, FormsModule, CommonModule,MatLabel,MatInputModule],
  templateUrl: './set-new-password-dialog.component.html',
  styleUrls: ['./set-new-password-dialog.component.css'] // Fixed typo here (styleUrls instead of styleUrl)
})
export class SetNewPasswordDialogComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    public dialogRef: MatDialogRef<SetNewPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private http: HttpClient // Inject HttpClient here
  ) {}

  onSetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    this.setNewPassword(this.data.email, this.newPassword).subscribe(
      () => {
        this.dialogRef.close(true); // Close the dialog and indicate success
      },
      error => {
        console.error('Error setting new password', error);
        alert('Failed to set new password. Please try again.');
      }
    );
  }

  setNewPassword(email: string, password: string): Observable<any> {
    return this.http.put(`http://localhost:5016/api/User/setnewpassword/${email}/${password}`,{});
    //return this.http.put(`http://localhost:5016/api/User/setnewpassword/${email}`, { passwordhash: password });
  }
  

}
