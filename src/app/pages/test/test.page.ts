import { Component, OnInit, ViewChild, EventEmitter  } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { RemoteApiService } from 'src/app/services/remote-api.service';
import { StorageService } from 'src/app/services/storage.service';

import { Observable, of, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  public photos: UserPhoto[] = [];
  requestComplete=false;

  constructor(private platform: Platform, private storage:StorageService, private remote:RemoteApiService) {
    this.platform = platform;
  }

  async ngOnInit() {
    this.getRemoteData();
  }

  onDataReceived(data: any) {
    this.remote.uploadImage({"name":"Jean claude","alias":"Clo clo"}).subscribe(response =>{
      console.log(response);
    })
  }

  test(){
    // this.getRemoteData().subscribe(response =>{
    //   console.log("response of the original request" + response);
    // });
    // this.waitingNotif.subscribe(message =>{
    //   console.log("waiting message: "+message);
    // })
  }

  getRemoteData(){

    const timer$ = timer(8000); // Emits after 1 second

    timer$.subscribe({
      next: () => {},
      complete: () => {
        if(this.requestComplete == false){
          console.log("please wait some instant");
        }
      }
    });

    this.callRemoteApi().subscribe((result) => {
      this.requestComplete =  true;
      console.log('Received result:', result);
    });
    // const startTime = new Date().getTime();
    // return timer(30000).pipe(
    //   switchMap(()=>{
    //     const elapsedTime = new Date().getTime() - startTime;
    //     if (elapsedTime >= 30000) {
    //       this.waitingNotif.emit('The request is taking longer than expected. Please try again later.');
    //     } else {
    //       this.waitingNotif.emit(null);
    //     }

    //     return this.callRemoteApi();
    //   })
    // );
  }

  callRemoteApi(): Observable<any> {
    return of('Result from remote API').pipe(
      delay(10000) 
    );
  }

  // =============== Camera and Gallerie method ============
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });
    this.storage.create("photos", JSON.stringify(this.photos))
  }

  private async savePicture(photo: Photo) { 
    const base64Data = await this.readAsBase64(photo);
    const fileName = Date.now() + '.jpg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }else{
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }

  public async loadSaved() {
    let photoDirPath = await this.storage.checkIfKeyExist("photos");
    if(photoDirPath.valueOf()){
      const { value } = await Preferences.get({ key: "photos"});
      this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];
    }
  }

  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({path: photo.path!});
      return file.data;
    }else{  
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}