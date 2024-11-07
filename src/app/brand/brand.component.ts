import { Component,OnInit } from '@angular/core';
import { LogoService } from '../logo.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface ColorModel  {
  PrimaryColor1: string;
  PrimaryColor2: string;
  PrimaryColor3: string;
}

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  selectedFile: File | null = null;
  logoUrl: string = '../../assets/company.JPG'; // Default logo
  
  primaryColors: string[] = ['#ffffff', '#ffffff', '#ffffff']; // Initialize with default colors

  constructor(private logoService: LogoService,private http: HttpClient) {}

  ngOnInit() {
    this.loadColors();
    this.loadLogo();
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoUrl = e.target?.result as string; // Update logo URL for preview
    };
    reader.readAsDataURL(this.selectedFile);
    this.uploadLogo(); // Automatically upload logo after selection
  }
}
uploadLogo() {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:5016/api/logo/upload', formData).subscribe(response => {
      console.log('Logo uploaded successfully:', response);
      this.loadLogo(); // Reload the logo after upload to ensure the URL is updated
  
      
    }, error => {
      console.error('Error uploading logo:', error);
    });
  } else {
    console.log('No file selected to upload.');
  }
}

loadLogo() {
  this.http.get('http://localhost:5016/api/logo/1', { responseType: 'blob' }).subscribe(
      (response: Blob) => {
          const url = URL.createObjectURL(response);
          this.logoService.changeLogoUrl(url); // Update the LogoService with the new logo URL
          this.logoUrl = url; // Update local logoUrl for preview if needed
      },
      error => {
          console.error('Error loading logo:', error);
      }
  );
}

  onColorChange(index: number) {
    console.log(`Color ${index + 1} changed to: ${this.primaryColors[index]}`);
    this.updateSiteColors();
  }

  saveColors() {
    const colorModel = {      
      PrimaryColor1: this.primaryColors[0].replace('#', ''),
      PrimaryColor2: this.primaryColors[1].replace('#', ''),
      PrimaryColor3: this.primaryColors[2].replace('#', '')
    };

    this.http.post('http://localhost:5016/api/SideNavColors', colorModel).subscribe(response => {
      console.log('Colors saved successfully:', response);
    }, error => {
      console.error('Error saving colors:', error);
    });

    this.logoService.changePrimaryColors(this.primaryColors); // Save and apply colors
  }


  loadColors() {
    this.http.get<any>('http://localhost:5016/api/SideNavColors/colors').subscribe(
      response => {
        if (response && response.primaryColor1 && response.primaryColor2 && response.primaryColor3) {
          this.primaryColors[0] = `#${response.primaryColor1}`;
          this.primaryColors[1] = `#${response.primaryColor2}`;
          this.primaryColors[2] = `#${response.primaryColor3}`;
          //this.updateSiteColors();
        }
      },
      error => {
        console.error('Error fetching colors:', error);
      }
    );

    // Listen for color changes in LogoService and apply them
    this.logoService.primaryColors$.subscribe(colors => {
      this.primaryColors = colors;
      this.updateSiteColors();
    });
  }

  updateSiteColors() {
    document.documentElement.style.setProperty('--primary-color-1', this.primaryColors[0]);
    document.documentElement.style.setProperty('--primary-color-2', this.primaryColors[1]);
    document.documentElement.style.setProperty('--primary-color-3', this.primaryColors[2]);

  }



}

