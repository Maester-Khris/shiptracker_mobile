import { Injectable } from '@angular/core';
import { LoadingController, ToastController, IonRouterOutlet } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIMessageService {

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  async presentToast(boxMessage:string, iconName:string) {
    const toast = await this.toastController.create({ 
      message: boxMessage, 
      duration: 3000, 
      position: 'bottom',
      icon: iconName
    });
    toast.onDidDismiss().then(()=>{
    
    });
    await toast.present();
  }

}
