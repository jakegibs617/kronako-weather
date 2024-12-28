// src/environments/environment.prod.ts (production)
import { environmentSecrets } from './environment.secrets';

export const environment = {
  production: true,
  // ...
  openWeatherApiKey: environmentSecrets.openWeatherApiKey,
};
