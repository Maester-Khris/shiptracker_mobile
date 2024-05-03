import { Injectable } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class InternetService {
  networkStatus: any;
  networkListener!: PluginListenerHandle;

  constructor() { }

  getInternetStatus(){
    return Network.getStatus()
  }

  endNetworkListener() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }
}
