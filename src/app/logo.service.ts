import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logoUrlSource = new BehaviorSubject<string>('../../assets/company.JPG'); // Default logo
  logoUrl$ = this.logoUrlSource.asObservable();

  private primaryColorsSource = new BehaviorSubject<string[]>(['#ffffff', '#ffffff', '#ffffff']); // Default colors
  primaryColors$ = this.primaryColorsSource.asObservable();

  constructor() {
    const savedLogoUrl = localStorage.getItem('logoUrl');
    const savedColors = localStorage.getItem('primaryColors');

    // Load saved logo URL if available
    if (savedLogoUrl) {
      this.logoUrlSource.next(savedLogoUrl);
    }

    // Load saved colors if available
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      this.primaryColorsSource.next(parsedColors);
      this.applyColors(parsedColors);  // Apply the colors when loading
    }
  }

  // Save logo URL and update BehaviorSubject
  changeLogoUrl(newUrl: string) {
    this.logoUrlSource.next(newUrl);
    localStorage.setItem('logoUrl', newUrl);
  }

  // Save primary colors and update BehaviorSubject
  changePrimaryColors(newColors: string[]) {
    this.primaryColorsSource.next(newColors);
    localStorage.setItem('primaryColors', JSON.stringify(newColors));
    this.applyColors(newColors);  // Apply colors when saving
  }

  // Apply colors to the page's CSS variables
  private applyColors(colors: string[]) {
    document.documentElement.style.setProperty('--primary-color-1', colors[0]);
    document.documentElement.style.setProperty('--primary-color-2', colors[1]);
    document.documentElement.style.setProperty('--primary-color-3', colors[2]);
  }
}
