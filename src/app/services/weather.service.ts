import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'API_KEY_PASTE_HERE';

  constructor(private http: HttpClient) {}

  // EXAMPLE: Accept userInput like "02108" (zip) or "Boston,MA" (city/state).
  getWeather(userInput: string): Observable<any> {
    // Trim and check if the input is purely digits => treat as a zip code
    const isZip = /^\d+$/.test(userInput.trim());

    if (isZip) {
      return this.getWeatherByZip(userInput.trim());
    } else {
      return this.getWeatherByCity(userInput.trim());
    }
  }

  // For a ZIP code, e.g.: ?zip=02108,US
  private getWeatherByZip(zip: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${this.apiKey}`;
    return this.http.get(url).pipe(map((res) => res));
  }

  // For a city/state, e.g. "Boston,MA" => ?q=Boston,MA,US
  private getWeatherByCity(cityState: string): Observable<any> {
    // If the user typed "Boston" only, that’s fine too. 
    // You can decide if you want to force them to include state, or default to "US".
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityState},US&units=imperial&appid=${this.apiKey}`;
    return this.http.get(url).pipe(map((res) => res));
  }
}
