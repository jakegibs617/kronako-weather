import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kronako.weather',
  appName: 'Kronako-Weather',
  webDir: 'www', // Ensure this matches your build output
  bundledWebRuntime: false,
};

export default config;
