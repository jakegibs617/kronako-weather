import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OutfitService {
  recommendOutfit(temp: number): string {
    if (temp >= 80) return 'T-shirt, shorts, and sunglasses';
    if (temp >= 60) return 'Light jacket and jeans';
    if (temp >= 40) return 'Sweater and coat';
    return 'Heavy coat, gloves, and scarf';
  }
}
