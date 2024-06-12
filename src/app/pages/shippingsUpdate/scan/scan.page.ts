import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddOnServiceService } from 'src/app/services/add-on-service.service';
import { Barcode, BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { NavigationExtras, Router } from '@angular/router';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { firstValueFrom } from 'rxjs';
import { UIMessageService } from 'src/app/services/uimessage.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  isSupported = false;
  code_available = false;
  code: string = "";
  barcodes: Barcode[] = [];

  constructor(
    private addons:AddOnServiceService, 
    private alertController: AlertController, 
    private router:Router,
    private remote:RemoteApiService,
    private UInotif: UIMessageService
  ) { 
    
  }

  async ngOnInit() {
    var self = this;
    BarcodeScanner.isSupported().then(function(result){
      self.isSupported = result.supported;
    });
    const granted = await this.addons.camerarequestPermissions();
    if(!granted) {
      this.presentAlert();
      return;
    }
  }

  // ===================== Scanning Methods ===============================
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission refusé',
      message: 'Autorisé l\'utilisation de la caméra.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async scan(): Promise<void> {
    var self = this;
    let doShipExist:any = await firstValueFrom(self.remote.checkExistingShipping({codedigit:"100624575523"}));
      if(doShipExist.data != ""){
        let retrievedshipcode = doShipExist.data;
        const navigationExtras: NavigationExtras = {state:{data:retrievedshipcode}};
        self.router.navigate(['shipping/update/operation'], navigationExtras);
      }else{
        self.UInotif.presentToast("Code d'expedition introuvable","alert-circle-outline").then(()=>{
          self.router.navigate(['shippings/home']);
        });
      }
    // this.addons.startScanner().then(async function(barcodes){
    //   self.code = barcodes[0].rawValue;
    //   self.code_available = true;
    //   console.log(self.code);
    //   let doShipExist:any = await firstValueFrom(self.remote.checkExistingShipping({codedigit:self.code}));
    //   if(doShipExist.data != ""){
    //     let retrievedshipcode = doShipExist.data;
    //     const navigationExtras: NavigationExtras = {state:{data:retrievedshipcode}};
    //     self.router.navigate(['shipping/update/operation'], navigationExtras);
    //   }else{
    //     self.UInotif.presentToast("Code d'expedition introuvable","alert-circle-outline").then(()=>{
    //       self.router.navigate(['shippings/home']);
    //     });
    //   }
    // });
  }

}

// ================= Scan web testing purpose ================
// let doShipExist:any = await firstValueFrom(self.remote.checkExistingShipping({codedigit:"100624575523"}));
//       if(doShipExist.data != ""){
//         let retrievedshipcode = doShipExist.data;
//         const navigationExtras: NavigationExtras = {state:{data:retrievedshipcode}};
//         self.router.navigate(['shipping/update/operation'], navigationExtras);
//       }else{
//         self.UInotif.presentToast("Code d'expedition introuvable","alert-circle-outline").then(()=>{
//           self.router.navigate(['shippings/home']);
//         });
//       }


// ======== Old behavior after barcode selected =================
// console.log("the decoded code is: " + self.code);
// console.log('Business logic that deals with the barcode');
// window.open(`https://www.olbizgo.com/userpace/expeditions?detail=true&shipcode=${self.code}`);
// });