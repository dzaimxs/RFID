import { Component, OnInit, ViewChild } from '@angular/core';
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

interface DashboardModel {
  idassettransactions: number;
  transactiondatetime: string;
  itemtypename: string;
  categoryname: string;
  locationname: string;
}

interface DashboardDropdownOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, MatFormFieldModule, MatLabel, MatInputModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatPaginator, MatOption, MatSelectModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  transactions: DashboardModel[] = [];
  filteredTransactions: MatTableDataSource<DashboardModel> = new MatTableDataSource();
  filter = {
    fromDate: '',
    toDate: '',
    itemTypes: [] as string[],   // Modified to handle multiple selected item types
    categories: [] as string[],  // Modified to handle multiple selected categories
    locations: [] as string[]   // Modified to handle multiple selected locations
  };

  itemTypes: DashboardDropdownOption[] = [];
  categories: DashboardDropdownOption[] = [];
  locations: DashboardDropdownOption[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  displayedColumns: string[] = [
    'idassettransactions', 'transactiondatetime', 'itemtypename', 'categoryname', 'locationname'
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadDropdownOptions(); // Load the dropdown options
  }

  loadTransactions(): void {
    this.http.get<DashboardModel[]>('http://localhost:5016/api/Dashboard').subscribe(
      data => {
        this.transactions = data;
        this.filteredTransactions.data = data; // Initialize filtered transactions
        this.filteredTransactions.paginator = this.paginator;
      },
      error => {
        console.error('Error fetching dashboard transactions', error);
      }
    );
  }

  loadDropdownOptions(): void {
    // Fetch the item types, categories, and locations from the API
    this.http.get<DashboardDropdownOption[]>('http://localhost:5016/api/Dashboard/itemtypes').subscribe(data => {
      this.itemTypes = data;
    });
    this.http.get<DashboardDropdownOption[]>('http://localhost:5016/api/Dashboard/categories').subscribe(data => {
      this.categories = data;
    });
    this.http.get<DashboardDropdownOption[]>('http://localhost:5016/api/Dashboard/locations').subscribe(data => {
      this.locations = data;
    });
  }

  applyFilters(): void {
    const filteredData = this.transactions.filter((transaction) => {
      const matchesFromDate =
        !this.filter.fromDate ||
        new Date(transaction.transactiondatetime) >= new Date(this.filter.fromDate);
      const matchesToDate =
        !this.filter.toDate ||
        new Date(transaction.transactiondatetime) <= new Date(this.filter.toDate);
      
      const matchesItemTypes = 
        this.filter.itemTypes.length === 0 ||
        this.filter.itemTypes.includes(transaction.itemtypename);

      const matchesCategories = 
        this.filter.categories.length === 0 ||
        this.filter.categories.includes(transaction.categoryname);

      const matchesLocations = 
        this.filter.locations.length === 0 ||
        this.filter.locations.includes(transaction.locationname);

      return matchesFromDate && matchesToDate && matchesItemTypes && matchesCategories && matchesLocations;
    });

    this.filteredTransactions.data = filteredData;
  }

  // Apply global search across all columns
  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredTransactions.filter = filterValue.trim().toLowerCase();
  }
}
