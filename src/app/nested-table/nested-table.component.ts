import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // Add this import for mat-select
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-nested-table',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, MatFormFieldModule, MatLabel, MatInputModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatPaginator, MatOption, MatSelectModule,CommonModule],
  templateUrl: './nested-table.component.html',
  styleUrl: './nested-table.component.css'
})

export class NestedTableComponent {

 

}
