import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { StorageService } from './services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Preference, User } from './model';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  logged_user:User = {name:"", email:"", telephone:"", api_token:"", created_at:"", updated_at:"", email_verified_at:""};
  parameters:Preference = {email_alert:true, sms_alert:false, payment_method:"OM", payment_option:"Subscription"};


  constructor(
    private platform: Platform, 
    private storage: StorageService, 
    private auth:AuthService,
    private menu:MenuController) {
    this.initializeApp();
  }

  async ngOnInit() {
    let data = await this.storage.read("logged_user");
    let user:User = data.value ? JSON.parse(data.value) : {};
    this.logged_user = this.shallow(user);
    localStorage.setItem("apiToken","25|H0ZUosv0UkQu1tTUbl6USIrNVEMivdecgfLCaTOw");
  }
  /** ========== Actions on Fist launch ===================
   * install google code bar plugin
   * store devide identifier in storage
   * create first launch key
   * initializa local data: user and preferences
  */
  initializeApp() {    
    this.platform.ready().then(async () => {
      let firstlaunchflag = await this.storage.checkIfKeyExist("first_launch_succeed");
      if(!firstlaunchflag.valueOf()){
        let deviceid = await this.getDeviceIdentifier();
        this.storage.create('custom_device_id', deviceid);
        this.storage.create('first_launch_succeed','true');
        this.storage.create('logged_user',JSON.stringify(this.logged_user));
        this.storage.create('parameters',JSON.stringify(this.parameters));
      }

      BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async function (data) {
        if (!data.available) {
          BarcodeScanner.installGoogleBarcodeScannerModule().then(async function () {
            console.log('installed');
          });
        }
      });
    });
  }

  ReferToWebApp(){
    window.open("https://www.olbizgo.com");
  }

  async getDeviceIdentifier(){
    let data = await Device.getInfo();
    return `${data.name}-${data.model}`;
  }

  logout(){
    this.menu.close().then(data =>{
      this.menu.enable(false);
      this.auth.logout();
    });
  }

  closeApp(){
    App.exitApp()​;
  }
  
  shallow<T extends object>(source: T): T {
    return {...source,}
  }

}
