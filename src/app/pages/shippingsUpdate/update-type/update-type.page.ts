import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AddOnServiceService } from 'src/app/services/add-on-service.service';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { ShippingStatus, statusEquivalenceV0, statusEquivalenceV1 } from 'src/app/model';
import { timer } from 'rxjs';

// test
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UIMessageService } from 'src/app/services/uimessage.service';

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.page.html',
  styleUrls: ['./update-type.page.scss'],
})
export class UpdateTypePage implements OnInit {

  @ViewChild("modal2") modalstep!: IonModal;
  @ViewChild("modal3") modalstatus!: IonModal;
  @ViewChild("modalFin") modalendShipping!: IonModal;

  isprocessingstep = false;
  isprocessingstatus = false;
  statusRequestComplete = false;

  statuses:ShippingStatus[] = [ShippingStatus.ORDERED, ShippingStatus.DEPOSITED, ShippingStatus.ONWAY, ShippingStatus.ARRIVED, ShippingStatus.DELIVERED];

  ship_reference="";
  operation_type="update-step";
  
  ship_running_stepname="";
  ship_running_stepid=1;
  ship_status = "";
  ship_steps = [];
  updatestepid="";
  updatestatus="";

  nic_taken:boolean=false;
  photoImgBase64:any="";
  signatureImgBase64="";

  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private addOn:AddOnServiceService,
    private remote:RemoteApiService,
    private UINotif:UIMessageService
  ){}

  async ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.operation_type =  params['updateType'];
      this.ship_reference = params['reference'];
    });
    this.remote.getShippingDetailsLimited({shipcode:this.ship_reference}).subscribe((response:HttpResponse<any>)=>{
      this.ship_running_stepid = response.body.data[1];
      this.ship_status = statusEquivalenceV0(response.body.data[2]);
      response.body.data[0].forEach((step:any)=>{
        if(step.id == this.ship_running_stepid){
          this.ship_running_stepname = step.name;
        }
        this.ship_steps.push(step);
      });
    });
  }

  //=========================== UPDATE METHOD ================================
  async updateStatusShip(){
    const timer$ = timer(30000); 
    timer$.subscribe({
      next: () => {},
      complete: () => {
        if(this.statusRequestComplete == false){
          this.UINotif.presentToast("Traitement plus long que prevue, patientez","alert-circle-outline");
        }
      }
    });
    this.updateStatusProcess();
  }

  async updateStep(){
    this.isprocessingstep = true;
    console.log("update");
    this.remote.updateShippingStep({
      shipcode: this.ship_reference,
      new_step_id: this.updatestepid
    }).subscribe(data =>{
      this.isprocessingstep = false;
      console.log(data);
      this.UINotif.presentToast("Mise à jour de l'étape éffectué avec succès","checkmark-done-circle-outline").then(after =>{
        this.router.navigate(["/shippings/home"]);
      });
    });
  }

  async updateStatusProcess(){
    if(this.updatestatus == ShippingStatus.DELIVERED){
      if(this.photoImgBase64 == "" || this.signatureImgBase64==""){
        console.log("update sta case 2.1");
        this.modalendShipping.present();
      }else{
        this.isprocessingstatus = true;
        console.log("update sta case 2.2");
        let dataToPost = {
          shipcode: this.ship_reference,
          new_status: statusEquivalenceV1(this.updatestatus),
          photo: this.photoImgBase64,
          signature: this.signatureImgBase64
        };
        this.remote.updateShippingStatus(dataToPost).subscribe(data =>{
          this.statusRequestComplete = true;
          this.isprocessingstatus = false;
          console.log(data);
          this.UINotif.presentToast("Mise à jour du status éffectué avec succès","checkmark-done-circle-outline").then(after =>{
            this.router.navigate(["/shippings/home"]);
          });
        });
      }
    }else{
      this.isprocessingstatus = true;
      console.log("update sta case 1");
      this.remote.updateShippingStatus({
        shipcode: this.ship_reference,
        new_status: statusEquivalenceV1(this.updatestatus),
      }).subscribe(data =>{
        this.statusRequestComplete = true;
        this.isprocessingstatus = false;
        console.log(data);
        this.UINotif.presentToast("Mise à jour du status éffectué avec succès","checkmark-done-circle-outline").then(after =>{
          this.router.navigate(["/shippings/home"]);
        });
      });
    } 
  }


  //=========================== MEDIA DATA CAPTURE METHOD ================================
  async saveDestPicture(){
    this.photoImgBase64 = await this.addOn.addNewToGallery(this.ship_reference); 
    this.nic_taken = true;
  }
  onSignatureSubmit(base64Data:any){
    this.signatureImgBase64 = base64Data;
    this.modalendShipping.dismiss();
  }


  //=========================== MODAL INTERACTION ================================  
  setShippingStep(modal:IonModal, step_id){
    this.updatestepid = step_id;
    this.ship_running_stepname =  this.ship_steps.filter(step => step.id == step_id)[0].name,
    console.log("step id set to: ",step_id);
    modal.dismiss();
  }
  setShippingStatus(modal:IonModal, status:string){
    this.updatestatus = status;
    this.ship_status = status;
    console.log("status set to: ",status);
    modal.dismiss();
  }
}



// ============ Camera web testing purpose =======================
// test code
// let imagePath = 'assets/images/package_time.png';
// let res = await fetch(imagePath);
// let blob = await res.blob();
// this.photoImgBase64 =  await this.addOn.convertBlobToBase64(blob) as string;

// =============== Working base to launch exp finsing =============
// if(status=="Delivered"){
//   this.modalend.present();
// }

// =============== Working base to upload photo =====================
// let imagePath = 'assets/images/utilisateur.png';
// fetch(imagePath).then(res => res.blob()).then(async blob =>{
//   let imageBase64 =  await this.addOn.convertBlobToBase64(blob) as string;
//   let dataToPost = {
//     image: imageBase64,
//     shipcode: this.ship_reference,
//     image_type: 'destinataire_identity_card'
//   }
//   this.remote.uploadImage(dataToPost).subscribe(response =>{
//     console.log(response.body);
//   });
// });



// ================ Take photo old method ======================
// this.nic_taken = true;
// this.addOn.addNewToGallery(this.ship_reference).then(IMGbase64 =>{ });



// =============== No more used ======================
// setShipping(modal:IonModal){
//   modal.dismiss();
// }
