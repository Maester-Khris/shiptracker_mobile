import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InternetService } from 'src/app/services/internet.service';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { UIMessageService } from 'src/app/services/uimessage.service';

@Component({
  selector: 'app-add-one',
  templateUrl: './add-one.page.html',
  styleUrls: ['./add-one.page.scss'],
})
export class AddOnePage implements OnInit {

  @ViewChild('colisName') colis_name!: ElementRef;
  @ViewChild('colisWeight') colis_weight!: ElementRef;
  @ViewChild('addBtn') addbtn!: ElementRef;
  @ViewChild('colisBtn') colbtn!: ElementRef;
  isprocessing = false;

  newship = {
    sender:"",sender_telephone:"",
    receiver:"",receiver_telephone:"",
    receiver_address:"", delivery_town:"",
  }
  packages:any[]=[];
  colis = {description:"", weight:1};

  constructor(
    private router:Router,
    private remote:RemoteApiService, 
    private UINotif:UIMessageService, 
    private internet:InternetService
  ) { }

  ngOnInit() {
  }

  addPackage(){
    this.packages.push(this.shallow(this.colis));
    this.colis.description = "";
    this.colis.weight = 1;
  }

  createShip(){
    this.isprocessing = true;
    this.internet.getInternetStatus().then(status => {
      if(status.connected){
        this.remote.addNewShipping({newship: this.newship, packages:this.packages}).subscribe(response =>{
          this.isprocessing = false;
          console.log(response);
          this.emptyData();
          this.router.navigate(['/shippings/home']);
        });
      }else{
        this.UINotif.presentToast("Vous etes hors connexion, verifiez vos parametre","cloud-offline-outline");
      }
    });
  }

  shallow<T extends object>(source: T): T {
    return {...source,}
  }
  emptyData(){
    this.newship.sender = "";
    this.newship.sender_telephone = "";
    this.newship.receiver = "";
    this.newship.receiver_address = "";
    this.newship.receiver_telephone = "";
    this.newship.delivery_town = "";
    this.packages = [];
  }

}
