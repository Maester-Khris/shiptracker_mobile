import { Component } from '@angular/core';
import { Barcode, BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isSupported = false;
  code_available = false;
  code: string = "";
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    var self = this;
    BarcodeScanner.isSupported().then(function(result){
      self.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    var self = this;
    await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async function(data){
      if (data.available) {
        await self.startScanner().then(async function(barcodes){
          self.code = barcodes[0].rawValue;
          self.code_available = true;
          self.scanLogic();
        });
      } else {
        await BarcodeScanner.installGoogleBarcodeScannerModule().then(async function(){
          await self.startScanner().then(async function(barcodes){
            self.code = barcodes[0].rawValue;
            self.code_available = true;
            self.scanLogic();
          });
        });
      }
    });

  }

  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [
        BarcodeFormat.QrCode,
        BarcodeFormat.Ean13,
        BarcodeFormat.UpcA,
        BarcodeFormat.UpcE]
    });
    return barcodes;
  }

  scanLogic() {
    console.log("the decoded code is: " + this.code);
    console.log('Business logic that deals with the barcode');
    window.open("https://www.google.com");
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
