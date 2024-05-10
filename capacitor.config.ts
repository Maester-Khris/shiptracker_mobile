import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.nk.shiptracker',
  appName: 'Olbizgo.com',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "SplashScreen": {
      "launchShowDuration":2000,
      "launchAutoHide": true,
      "splashFullScreen": true,
      "showSpinner": true,
      "backgroundColor": "#C2D5EB",
      "androidSplashResourceName": "splash",
    }
  }
};

export default config;
