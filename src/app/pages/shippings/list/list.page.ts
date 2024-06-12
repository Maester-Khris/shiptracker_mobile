import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { MenuController } from '@ionic/angular';
import { ShippingStatus, statusEquivalenceV0 } from 'src/app/model';
import { InternetService } from 'src/app/services/internet.service';
import { RemoteApiService } from 'src/app/services/remote-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  shippings:any[] = [];
  isNetworkWorking = false;

  constructor(  
    private remote:RemoteApiService,
    private internet:InternetService,
    private menu:MenuController
    ){ 
      this.menu.enable(true);
    }

  async ngOnInit() {
    this.internet.getInternetStatus().then(status => {
      console.log(status);
      if(status.connected){
        this.isNetworkWorking = true;
      }
    });
    this.getShippings();
  }

  async getShippings(){
    this.remote.getShippings().subscribe((response:any)=>{
      this.shippings = [];
      JSON.parse(response.data).forEach(ship =>{
        ship['is_finished'] = statusEquivalenceV0(ship.status_exp) == ShippingStatus.DELIVERED ? true : false;
        this.shippings.push(ship);
      });
    });
  }
  
}


// ===================== OLD BARCODE SAVE ==========================
// await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async function(data){
//   if (data.available) {
//     await self.startScanner().then(async function(barcodes){
//       self.code = barcodes[0].rawValue;
//       self.code_available = true;
//       self.scanLogic();
//     });
//   } else {
//     await BarcodeScanner.installGoogleBarcodeScannerModule().then(async function(){
//       await self.startScanner().then(async function(barcodes){
//         self.code = barcodes[0].rawValue;
//         self.code_available = true;
//         self.scanLogic();
//       });
//     });
//   }
// });

// async startScanner() {
//   const { barcodes } = await BarcodeScanner.scan({
//     formats: [
//       BarcodeFormat.QrCode,
//       BarcodeFormat.Ean13,
//       BarcodeFormat.UpcA,
//       BarcodeFormat.UpcE]
//   });
//   return barcodes;
// }

// async requestPermissions(): Promise<boolean> {
//   const { camera } = await BarcodeScanner.requestPermissions();
//   return camera === 'granted' || camera === 'limited';
// }