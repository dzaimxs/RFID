import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { TransactionDetailDialogComponent } from '../transaction-detail-dialog/transaction-detail-dialog.component';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { RobotDialogComponent } from '../robot-dialog/robot-dialog.component';

interface DashboardModel {
  idassettransactions: number;
  idassets:number;
  transactiondatetime: string;
  itemtypename: string;
  categoryname: string;
  locationname: string;
  isExpanded?: boolean; // For quickview
  isExpanded2?: boolean;
  subTransactions?: DashboardDrillDown[]; //for quickview
}

//quickview
interface DashboardDrillDown {
  transactiondatetime: string;
  fromlocation: string;
  newlocation: string;
}
//quickview

interface DashboardDropdownOption {
  id: number;
  name: string;
}

interface DeviceStatus {
  devicename: string;
  ipaddress: string;
  designatedaddress: string;
  lastconnectiondatetime: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatIcon,MatTooltip,HttpClientModule, MatFormFieldModule, MatLabel, MatInputModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatPaginator, MatOption, MatSelectModule,CommonModule,MatIconModule,MatCheckboxModule,MatButtonModule,MatMenuModule,MatMenuTrigger,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, OnDestroy  {

  transactions: DashboardModel[] = [];
  filteredTransactions = new MatTableDataSource<DashboardModel>();
  /*filter = {
    fromDate: '',
    toDate: '',
    itemTypes: [] as string[],   // Modified to handle multiple selected item types
    categories: [] as string[],  // Modified to handle multiple selected categories
    locations: [] as string[]   // Modified to handle multiple selected locations
  };


  itemTypes: DashboardDropdownOption[] = [];
  categories: DashboardDropdownOption[] = [];
  locations: DashboardDropdownOption[] = [];*/

  //changed filters
  
  isDateFilterVisible = false;
  startDate: Date | null = null;;
  endDate: Date | null = null; 

  uniqueItemTypes: string[] = []; 
  uniqueCategories: string[] = []; 
  uniqueLocations: string[] = []; 

  filters = {
    itemType: {} as { [key: string]: boolean },
    category: {} as { [key: string]: boolean },
    location: {} as { [key: string]: boolean },
  }
  //changed filters

  isInputVisible: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  displayedColumns: string[] = [
    'idassettransactions', 'transactiondatetime', 'itemtypename', 'categoryname', 'locationname','actions'//,'expandedDetail'
  ];

  //robotlightsignal
  isDeviceConnected: boolean = true; //initial status , true means connected 
  statusCheckInterval: any;  // Variable to store the interval reference
  statusSubscription: Subscription = new Subscription;  // Subscription for the HTTP request


  constructor(private http: HttpClient,private dialog: MatDialog,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTransactions();
    //robotlightsignal
    this.checkDeviceStatus(); 
    this.startStatusCheckInterval();  // Start the periodic status check every 2 minutes

    //this.loadDropdownOptions(); // Load the dropdown options
  } 

  loadTransactions(): void {
    this.http.get<DashboardModel[]>('http://localhost:5016/api/Dashboard').subscribe(
      data => {      
        //quickviewthis.transactions = data;
        this.transactions = data.map(transaction => ({ ...transaction, isExpanded: false,isExpanded2:false }));
        this.filteredTransactions.data = data; // Initialize filtered transactions
        this.filteredTransactions.paginator = this.paginator;

        this.populateUniqueValues(); //changed filter
        this.initializeFilters();
      },
      error => {
        console.error('Error fetching dashboard transactions', error);
      }
    );
  }

  /*loadDropdownOptions(): void {
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
  }*/

  // Apply global search across all columns
  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredTransactions.filter = filterValue.trim().toLowerCase();
  }

/*  quickView2(transaction: DashboardModel): void {
    // Toggle the quick view state
    transaction.isExpanded = !transaction.isExpanded;

    // Fetch sub-transactions only when expanding
    if (transaction.isExpanded) {
        if (!transaction.subTransactions || transaction.subTransactions.length === 0) {
            // Only fetch if subTransactions are not already loaded
            this.http.get<DashboardDrillDown[]>(`http://localhost:5016/api/Dashboard/${transaction.idassets}/${transaction.transactiondatetime}`).subscribe(
                data => {
                    transaction.subTransactions = data; // Assign the fetched data to subTransactions
                    console.log('Historical Transactions (Quick View):', data);
                },
                error => {
                    console.error('Error fetching historical transactions (Quick View)', error);
                }
            );
        }
    }
    // No need to clear subTransactions when collapsing quick view
}

fullReport2(transaction: DashboardModel): void {
    // Toggle the full report state
    transaction.isExpanded2 = !transaction.isExpanded2;

    // Fetch sub-transactions only when expanding
    if (transaction.isExpanded2) {
        if (!transaction.subTransactions || transaction.subTransactions.length === 0) {
            // Only fetch if subTransactions are not already loaded
            this.http.get<DashboardDrillDown[]>(`http://localhost:5016/api/Dashboard/all/${transaction.idassets}/${transaction.transactiondatetime}`).subscribe(
                data => {
                    transaction.subTransactions = data; // Assign the fetched data to subTransactions
                    console.log('Historical Transactions (Full Report):', data);
                },
                error => {
                    console.error('Error fetching historical transactions (Full Report)', error);
                }
            );
        }
    }
    // No need to clear subTransactions when collapsing full report
}*/

quickView(transaction: DashboardModel): void {
  this.http.get<DashboardDrillDown[]>(`http://localhost:5016/api/Dashboard/${transaction.idassets}/${transaction.transactiondatetime}`).subscribe(
    data => {
        transaction.subTransactions = data;
        this.openDialog(transaction.subTransactions);
    },
    error => {
        console.error('Error fetching historical transactions (Quick View)', error);
    }
);


}

fullReport(transaction: DashboardModel): void {
  this.http.get<DashboardDrillDown[]>(`http://localhost:5016/api/Dashboard/all/${transaction.idassets}/${transaction.transactiondatetime}`).subscribe(
    data => {
        transaction.subTransactions = data;
        this.openDialog(transaction.subTransactions);
    },
    error => {
        console.error('Error fetching historical transactions (Full Report)', error);
    }
);
}

private openDialog(subTransactions: DashboardDrillDown[]): void {
  const dialogRef = this.dialog.open(TransactionDetailDialogComponent, {
      data: { subTransactions },
  });

  dialogRef.afterClosed().subscribe(result => {
      // Handle any post-dialog logic if necessary
  });
}

//changed filters
toggleDateFilter() {
  this.isDateFilterVisible = !this.isDateFilterVisible;
}


  // Function to populate unique values from the assets array
  populateUniqueValues(): void {
    //asset
    this.uniqueItemTypes = this.getUniqueValues(this.transactions, 'itemtypename');
    this.uniqueCategories = this.getUniqueValues(this.transactions, 'categoryname');
    this.uniqueLocations = this.getUniqueValues(this.transactions, 'locationname');
  } 
  // Utility function to get unique values from a given property
  getUniqueValues(data: any[], property: string): string[] {
    return [...new Set(data.map(item => item[property]))].filter(value => value);
  }

  initializeFilters(): void {
    this.uniqueItemTypes.forEach(type => this.filters.itemType[type] = false);
    this.uniqueCategories.forEach(category => this.filters.category[category] = false);
    this.uniqueLocations.forEach(location => this.filters.location[location] = false);
  }

  applyNewFilters(): void {
    const filteredData = this.transactions.filter(transaction => {
      const dateFilter = this.startDate && this.endDate
        ? new Date(transaction.transactiondatetime) >= this.startDate && new Date(transaction.transactiondatetime) <= this.endDate
        : true;

      const typeFilter = this.filters.itemType[transaction.itemtypename] || Object.values(this.filters.itemType).every(v => !v);
      const categoryFilter = this.filters.category[transaction.categoryname] || Object.values(this.filters.category).every(v => !v);
      const locationFilter = this.filters.location[transaction.locationname] || Object.values(this.filters.location).every(v => !v);

      return dateFilter && typeFilter && categoryFilter && locationFilter;
    });

    this.filteredTransactions.data = filteredData;
  }

  clearFilters(): void {
    this.startDate = null;
    this.endDate = null;
    this.initializeFilters();
    this.filteredTransactions.data = this.transactions;
  }

  // Method to handle notification button click
  onNotificationClick(): void {
    console.log('Notification button clicked');
    // You can handle the notification logic here
  }



  checkDeviceStatus(): void {
    this.http.get<boolean>('http://localhost:5016/api/Dashboard/deviceconnectionstatus').subscribe(
      (status) => {
        console.log('Device Connection Status:', status);  // Check if status is correct
        this.isDeviceConnected = !status;  // If true, devices are disabled, so set `isDeviceConnected` to false (red)
        this.cd.detectChanges();  // Manually trigger change detection if needed
      },
      (error) => {
        console.error('Error checking device connection status', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to avoid memory leaks
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  }

  // Function to periodically check the device status
  startStatusCheckInterval(): void {
    this.statusCheckInterval = setInterval(() => {
      this.checkDeviceStatus();
    }, 120000);  // 120000ms = 2 minutes
  }


  onRobotClick(): void {
    console.log('Robot button clicked');
    this.http.get<DeviceStatus[]>(`http://localhost:5016/api/Dashboard/deviceconnectionstatusdetails`).subscribe(
      data => {
        const connectionhistory = data;  // This is already an array of DeviceStatus
        if (data && data.length > 0) {
          // If there are devices, open the dialog
          this.openDeviceStatusDialog(connectionhistory);
        } else {
          // If no devices found, show an alert
          alert('No disabled devices found');
        }
      },
      error => {
        // If the status code is 404, show the message "No disabled devices found"
        if (error.status === 404) {
          alert('No disabled devices found');
        } else {
          // Handle other errors (e.g., server issues)
          console.error('Error fetching device connection status details', error);
          alert('Error fetching device connection status details');
        }
      }
    );
  }
  
  private openDeviceStatusDialog(connectionhistory: DeviceStatus[]): void {
    const dialogRef = this.dialog.open(RobotDialogComponent, {
      data: { connectionhistory },  // Pass the array of device statuses
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any post-dialog logic if necessary
    });
  }

}
