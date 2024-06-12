import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InternetService } from 'src/app/services/internet.service';
import { UIMessageService } from 'src/app/services/uimessage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string='';
  pass:string='';
  isprocessing = false;

  constructor(
    private router:Router, 
    private auth:AuthService, 
    private menu:MenuController,
    private uiMessage:UIMessageService,
    private internet:InternetService){ 
    this.menu.enable(false);
  }

  ngOnInit() {}

  async connect(){
    this.isprocessing = true;
    this.internet.getInternetStatus().then(status => {
      if(status.connected){
        this.auth.login(this.email, this.pass).then(result_message=>{
          this.isprocessing = false;
          setTimeout(()=>{
            if(result_message == "Login Succeed"){
              this.router.navigateByUrl("/shippings/home");
            }else{
              this.uiMessage.presentToast(result_message,"ban-outline");
            }
          }, 1000);
        });
      }else{
        this.uiMessage.presentToast("Vous n'etes pas connecté à internet","cloud-offline-outline");
      }
    });
  }
}

// ======================= web test ====================
// this.router.navigateByUrl("/shippings/home");