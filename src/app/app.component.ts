import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    // check if plugin installed and then install
    this.platform.ready().then(async () => {
      BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async function (data) {
        if (!data.available) {
          BarcodeScanner.installGoogleBarcodeScannerModule().then(async function () {
            console.log('installed');
          });
        }
      });
    });
  }

}
