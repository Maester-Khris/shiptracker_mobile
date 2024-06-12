import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { InternetService } from 'src/app/services/internet.service';
import { ShippingStatus, statusEquivalenceV0 } from 'src/app/model';
import { UIMessageService } from 'src/app/services/uimessage.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  shipref = "";
  isNetworkWorking = false;

  steps:any[] = [];
  packageCnt:Number;
  clientDetails:any = {};
  ship_running_step_id=0;
  isShipDelivered:boolean=false;
  ship_departure="";
  ship_arrival="";
  ship_status="";

  constructor(private route:ActivatedRoute, private remote:RemoteApiService,private internet:InternetService, private UINotif:UIMessageService) { }

  ngOnInit() {
    this.internet.getInternetStatus().then(status => {
      console.log(status);
      if(status.connected){
        this.isNetworkWorking = true;
      }
    });
    this.route.queryParams.subscribe(params => {
      this.shipref = params["ship_reference"];
      this.getDetails();
    });
  }

  refresh(){
    this.internet.getInternetStatus().then(status => {
      if(status.connected){
        this.getDetails();
        console.log('refreshed');
      }else{
        this.UINotif.presentToast("Vous etes hors connexion, verifiez vos parametre","cloud-offline-outline");
      }
    });
  }

  getDetails(){
    this.remote.getShippingDetails({shipcode:this.shipref}).subscribe((response:any)=>{
      this.ship_running_step_id = response.data[3];
      this.clientDetails = response.data[1];
      this.packageCnt = response.data[2];
      this.steps = [];
      response.data[4].forEach(step =>{
        this.steps.push(step);
      });
      this.ship_status = response.data[0];
      this.isShipDelivered = statusEquivalenceV0(response.data[0]) == ShippingStatus.DELIVERED ? true : false;
      this.ship_departure = response.data[5];
      this.ship_arrival = response.data[6];
      console.log(this.isShipDelivered);
    });
  }

}
