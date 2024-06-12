import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Barcode, BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AddOnServiceService {

  public photos: NICPhoto[] = [];
  
  constructor(private platform: Platform, private storage:StorageService) { }

  /**
   * ================== CODE SCANNING METHOD =================================
  */
  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [
        BarcodeFormat.QrCode,
        BarcodeFormat.Ean13,
        BarcodeFormat.UpcA,
        BarcodeFormat.UpcE]
    });
    return barcodes;
  }

  async camerarequestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  /**
   * =============== TAKE PHOTO WITH CAMERA CODE =========================
  */
  public async addNewToGallery(shiprefence:any) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const base64Data = await this.readAsBase64(capturedPhoto);
    const savedImageFile = await this.savePicture(capturedPhoto, base64Data);
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!,
      shipreference: 'my ship reference'
    });
    this.storage.create("photos", JSON.stringify(this.photos));
    return base64Data;
  }

  private async savePicture(photo: Photo, base64Data) { 
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
        shipreference: 'my ship reference'
      };
    }else{
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        shipreference: 'my ship reference'
      };
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
  
  public convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
    let photoDirPath = await this.storage.checkIfKeyExist("photos");
    if(photoDirPath.valueOf()){
      const { value } = await this.storage.read("photos");
      this.photos = (value ? JSON.parse(value) : []) as NICPhoto[];
    }
  }

}

export interface NICPhoto {
  filepath: string;
  webviewPath?: string;
  shipreference: string;
}