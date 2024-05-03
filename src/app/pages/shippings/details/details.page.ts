import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { InternetService } from 'src/app/services/internet.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  shipping:any = {};
  shipref = "";
  isNetworkWorking = false;

  constructor(private route:ActivatedRoute, private remote:RemoteApiService,private internet:InternetService ) { }

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
        // prompt a toast no connection detexted
      }
    });
  }

  getDetails(){
    this.remote.getShippingDetails({ship_reference:this.shipref}).subscribe((response:HttpResponse<any>)=>{
      this.shipping = JSON.parse(response.body.data);
      this.shipping['route_size'] = this.shipping.route_points.length;
      this.shipping['package_size'] = this.shipping.packages.length;
      console.log(this.shipping)
    });
  }

}
