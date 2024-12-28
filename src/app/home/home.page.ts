import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { WeatherService } from '../services/weather.service';
import { OutfitService } from '../services/outfit.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    // Angular & Ionic
    CommonModule,
    FormsModule,
    IonicModule,

    // Material modules
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule, 
    OverlayModule,
    PortalModule
  ],
})
export class HomePage implements OnInit {
  weather: any;
  outfits: string[] = [];
  userOutfit = '';

  userLocation = '';

  constructor(
    private weatherService: WeatherService,
    private outfitService: OutfitService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.scheduleFeedback();
  }

  async fetchWeather(defaultCity = 'Boston') {
    try {
      this.weather = await this.weatherService
        .getWeather(defaultCity)
        .toPromise(); // Because we used Observable in the service
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.weather = {
        name: 'Unknown',
        weather: [{ description: 'No data available' }],
        main: { temp: 0 },
      };
    }
  }

  async searchWeather(): Promise<void> {
    if (!this.userLocation.trim()) return; // no input
    try {
      this.weather = await this.weatherService
        .getWeather(this.userLocation.trim())
        .toPromise();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  getOutfitRecommendation(): string {
    if (!this.weather) return '';
    return this.outfitService.recommendOutfit(this.weather.main?.temp);
  }

  submitOutfit(): void {
    if (this.userOutfit.trim()) {
      this.outfits.push(this.userOutfit);
      this.userOutfit = '';
    }
  }

  async scheduleFeedback(): Promise<void> {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Kronako-Weather',
          body: 'Was our outfit recommendation accurate?',
          schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 2) },
        },
      ],
    });
  }
}
