import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/model';
import { InternetService } from 'src/app/services/internet.service';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  shippings:any[] = [];
  isSupported = false;
  code_available = false;
  code: string = "";
  barcodes: Barcode[] = [];
  isNetworkWorking = false;

  constructor(
    private storage:StorageService, 
    private alertController: AlertController, 
    private remote:RemoteApiService,
    private internet:InternetService,
    private menu:MenuController
    ){ 
      this.menu.enable(true);
    }

  ngOnInit() {

    // this.internet.getInternetStatus().then(status => {
    //   console.log(status);
    //   if(status.connected){
    //     this.isNetworkWorking = true;
    //   }
    // });

    // var self = this;
    // BarcodeScanner.isSupported().then(function(result){
    //   self.isSupported = result.supported;
    // });
    
    // this.getShippings();


  }


  // ===================== Shipping Methods ===============================
  // async getShippings(){
  //   let data = await this.storage.read("logged_user");
  //   let user:User = data.value ? JSON.parse(data.value) : {};
  //   this.remote.getShippings({user_email:user.email}).subscribe((response:HttpResponse<any>)=>{
  //     console.log(JSON.parse(response.body.data));
  //     this.shippings = JSON.parse(response.body.data);
  //   });
  // }


  // ===================== Scanning Methods ===============================
  // async scan(): Promise<void> {
  //   const granted = await this.requestPermissions();
  //   if (!granted) {
  //     this.presentAlert();
  //     return;
  //   }

  //   var self = this;
  //   await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async function(data){
  //     if (data.available) {
  //       await self.startScanner().then(async function(barcodes){
  //         self.code = barcodes[0].rawValue;
  //         self.code_available = true;
  //         self.scanLogic();
  //       });
  //     } else {
  //       await BarcodeScanner.installGoogleBarcodeScannerModule().then(async function(){
  //         await self.startScanner().then(async function(barcodes){
  //           self.code = barcodes[0].rawValue;
  //           self.code_available = true;
  //           self.scanLogic();
  //         });
  //       });
  //     }
  //   });

  // }

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

  // scanLogic() {
  //   console.log("the decoded code is: " + this.code);
  //   console.log('Business logic that deals with the barcode');
  //   window.open(`https://www.olbizgo.com/userpace/expeditions?detail=true&shipcode=${this.code}`);
  // }

  // async requestPermissions(): Promise<boolean> {
  //   const { camera } = await BarcodeScanner.requestPermissions();
  //   return camera === 'granted' || camera === 'limited';
  // }

  // async presentAlert(): Promise<void> {
  //   const alert = await this.alertController.create({
  //     header: 'Permission denied',
  //     message: 'Please grant camera permission to use the barcode scanner.',
  //     buttons: ['OK'],
  //   });
  //   await alert.present();
  // }

}
