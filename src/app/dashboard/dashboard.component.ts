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

//For export 
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { MatTooltipModule } from '@angular/material/tooltip';
//import 'jspdf-autotable';  // For better table rendering in PDF


interface AssetReportModel {
  idassettransactions: number;
  rfidserialnr: string;
  transactiondatetime: string;
  itemtypename: string;
  categoryname: string;
  locationname: string;
  dateadded:string;
  status:string;

}

interface DeviceReportModel {
  devicename: string;
  ipaddress: string;
  designatedaddress: string;
  lastconnectiondatetime: string;
  status: string;  
}


interface HistoricalReportModel {
  transactiondatetime : string;
  rfidserialnr: string;
  fromlocation: string;
  newlocation: string;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatTooltipModule, MatTableModule, MatTabsModule, HttpClientModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatIconModule,FormsModule,MatCheckboxModule,MatNativeDateModule,MatButtonModule,MatMenuModule,MatMenuTrigger],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected from styleUrl to styleUrls
})
export class DashboardComponent implements OnInit {
  assetreportcolumns: string[] = ['idassettransactions', 'rfidserialnr','transactiondatetime', 'itemtypename', 'categoryname', 'locationname','dateadded','status'];
  devicereportcolumns: string[]  = ['devicename','ipaddress','designatedaddress','lastconnectiondatetime','status'];
  historicalreportcolumns: string[]  = ['transactiondatetime','rfidserialnr','fromlocation','newlocation'];

  assets: AssetReportModel[] = [];
  devices: DeviceReportModel[] = [];
  history: HistoricalReportModel[] = [];

  filteredAssets: AssetReportModel[] = [];
  filteredDevices: DeviceReportModel[] = [];
  filteredHistory: HistoricalReportModel[] = [];
  //filter
  isDateFilterVisible = false;

  startDate: Date | null = null;;
  endDate: Date | null = null; 

  
  //assetfilters
  uniqueItemTypes: string[] = []; 
  uniqueCategories: string[] = []; 
  uniqueLocations: string[] = []; 
  uniqueStatuses: string[] = []; 
  
  //devicefilters
  uniqueDeviceName: string[] = [];
  uniqueDeviceStatus: string[] = [];

  //historicalfilters
  uniqueSerialNr: string[] = [];
  uniqueFromLocation: string[] = [];
  uniqueNewLocation: string[] = [];
  
  filters = {
    //asset
    itemType: {} as { [key: string]: boolean },
    category: {} as { [key: string]: boolean },
    location: {} as { [key: string]: boolean },
    status: {} as { [key: string]: boolean },
  
    //device
    devName: {} as { [key: string]: boolean },
    devStatus: {} as { [key: string]: boolean }, 

    //history
    serialnr: {} as { [key: string]: boolean },
    flocation : {} as { [key: string]: boolean },
    nlocation: {} as { [key: string]: boolean }

  };

  constructor(private http: HttpClient) {} // Add HttpClient constructor

  ngOnInit(): void {
    this.loadReportA();
    this.loadReportD();
    this.loadReportH();
  }

  loadReportA(): void {
    this.http.get<AssetReportModel[]>('http://localhost:5016/api/AssetReport').subscribe(
      data => {
        this.assets = data;
        this.filteredAssets = data;
        this.populateUniqueValues();
      },
      error => {
        console.error('Error fetching asset report data', error);
      }
    );
  }

  loadReportD(): void {
    this.http.get<DeviceReportModel[]>('http://localhost:5016/api/DeviceReport').subscribe(
      data => {
        this.devices = data;
        this.filteredDevices = data;
        this.populateUniqueValues();
      },
      error => {
        console.error('Error fetching device report data', error);
      }
    );
  }
 
  loadReportH(): void {
    this.http.get<HistoricalReportModel[]>('http://localhost:5016/api/HisAssetMoveReport').subscribe(
      data => {
        this.history = data;
        this.filteredHistory = data;
        this.populateUniqueValues();
      },
      error => {
        console.error('Error fetching history report data', error);
      }
    );
  }




toggleDateFilter() {
  this.isDateFilterVisible = !this.isDateFilterVisible;
}


  // Function to populate unique values from the assets array
  populateUniqueValues(): void {
    //asset
    this.uniqueItemTypes = this.getUniqueValues(this.assets, 'itemtypename');
    this.uniqueCategories = this.getUniqueValues(this.assets, 'categoryname');
    this.uniqueLocations = this.getUniqueValues(this.assets, 'locationname');
    this.uniqueStatuses = this.getUniqueValues(this.assets, 'status');
    //device
    this.uniqueDeviceName = this.getUniqueValues(this.devices, 'devicename');
    this.uniqueDeviceStatus = this.getUniqueValues(this.devices, 'status'); 
    
    //history
    this.uniqueSerialNr = this.getUniqueValues(this.history,'rfidserialnr')
    this.uniqueFromLocation = this.getUniqueValues(this.history,'fromlocation')
    this.uniqueNewLocation = this.getUniqueValues(this.history,'newlocation')
  }
   
  // Utility function to get unique values from a given property
  getUniqueValues(data: any[], property: string): string[] {
    return [...new Set(data.map(item => item[property]))].filter(value => value);
  }


  applyAssetFilters() {
    this.filteredAssets = this.assets.filter(asset => {
      const dateFilter = this.startDate && this.endDate ?
        new Date(asset.transactiondatetime) >= this.startDate && new Date(asset.transactiondatetime) <= this.endDate :
        true;

      const typeFilter = this.filters.itemType[asset.itemtypename] || !Object.values(this.filters.itemType).some(Boolean);
      const categoryFilter = this.filters.category[asset.categoryname] || !Object.values(this.filters.category).some(Boolean);
      const locationFilter = this.filters.location[asset.locationname] || !Object.values(this.filters.location).some(Boolean);
      const statusFilter = this.filters.status[asset.status] || !Object.values(this.filters.status).some(Boolean);

      return dateFilter && typeFilter && categoryFilter && locationFilter && statusFilter;
    });
  }

  applyDeviceFilter() {
    this.filteredDevices = this.devices.filter(device => {
      const deviceDFilter = this.startDate && this.endDate ?
        new Date(device.lastconnectiondatetime) >= this.startDate && new Date(device.lastconnectiondatetime) <= this.endDate :
        true;

      const deviceNFilter = this.filters.devName[device.devicename] || !Object.values(this.filters.devName).some(Boolean);
      const deviceSFilter = this.filters.devStatus[device.status] || !Object.values(this.filters.devStatus).some(Boolean);

      return deviceDFilter && deviceNFilter && deviceSFilter;
    });
  }

  applyHistoryFilter() {
    this.filteredHistory = this.history.filter(his => {
      const historyDateFilter = this.startDate && this.endDate ?
      new Date(his.transactiondatetime) >= this.startDate && new Date(his.transactiondatetime) <= this.endDate :
      true;

    const serialFilter = this.filters.serialnr[his.rfidserialnr] || !Object.values(this.filters.serialnr).some(Boolean);
    const flocationFilter = this.filters.flocation[his.fromlocation] || !Object.values(this.filters.flocation).some(Boolean);
    const nlocationFilter = this.filters.nlocation[his.newlocation] || !Object.values(this.filters.nlocation).some(Boolean);

      return historyDateFilter && serialFilter && flocationFilter && nlocationFilter;
    });
  }

  clearAssetFilters(): void {
    // Reset filter states
    this.filters.itemType = {};
    this.filters.category = {};
    this.filters.location = {};
    this.filters.status = {};
    this.startDate = null; // Clear date filters
    this.endDate = null;

    // Refresh the displayed data
    this.filteredAssets = [...this.assets];
  }

  clearDeviceFilters(): void {
    this.filters.devName = {};
    this.filters.devStatus = {};
    this.startDate = null; 
    this.endDate = null;
    this.filteredDevices = [...this.devices];
  }


  clearHistoryFilters(): void {
    this.filters.serialnr = {};
    this.filters.flocation = {};
    this.filters.nlocation = {};
    this.startDate = null; 
    this.endDate = null;
    this.filteredHistory = [...this.history];
  }
//filter



//export
exportToExcel(reportData: any[], fileName: string): void {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(reportData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  
  // Save the file as Excel (.xlsx)
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

exportToPDF(reportData: any[], columns: any[], title: string): void {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  // Add table to PDF
  const tableData = reportData.map((item: any) => Object.values(item));
  const tableColumns = columns.map((col: any) => col.header);
  
  // Generate PDF table (AutoTable)
  (doc as any).autoTable({
    head: [tableColumns],
    body: tableData,
    startY: 30, // Adjust the starting Y position
  });

  // Save the file as PDF
  doc.save(`${title}.pdf`);
}

// Example method to call for exporting filtered assets to Excel
onExportAssets() {
  this.exportToExcel(this.filteredAssets, 'Asset_Report');
}
onExportDevices() {
  this.exportToExcel(this.filteredDevices, 'Device_Report');
}
onExportHistoricalTransactions() {
  this.exportToExcel(this.filteredHistory, 'Historical_Asset_Movement_Report');
}

// Example method to call for exporting filtered devices to PDF
onExportPDF() {
  this.exportToPDF(this.filteredDevices, [
    { header: 'Device', key: 'devicename' },
    { header: 'IP Address', key: 'ipaddress' },
    { header: 'Status', key: 'status' },
  ], 'Device_Report');
}
//export



}