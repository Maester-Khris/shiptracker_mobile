import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { StorageService } from './services/storage.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private storage: StorageService) {
    this.initializeApp();
  }

  /** ========== Actions on Fist launch ===================
   * install google code bar plugin
   * store devide identifier in storage
   * create first launch key
  */
  initializeApp() {
  



    
    this.platform.ready().then(async () => {
      // check if first launch
      let firstlaunchflag = await this.storage.checkIfKeyExist("first_launch_succeed");
      if(!firstlaunchflag.valueOf()){
        let deviceid = await this.getDeviceIdentifier();
        this.storage.create('custom_device_id', deviceid);
        this.storage.create('first_launch_succeed','true');
      }

      // check if plugin installed and then install
      BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async function (data) {
        if (!data.available) {
          BarcodeScanner.installGoogleBarcodeScannerModule().then(async function () {
            console.log('installed');
          });
        }
      });
    });
  }

  async getDeviceIdentifier(){
    let data = await Device.getInfo();
    return `${data.name}-${data.model}`;
  }

}
