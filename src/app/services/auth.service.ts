import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private remote:RemoteApiService, private storage:StorageService) { }

  async login(email:string, pass:string): Promise<string>{
    let deviceid = await this.storage.read('custom_device_id')
    let data = {
      email: 'darrel05@example.net', 
      password: 'test users',
      device: deviceid.value
    };
    // this.remote.connectToRemote(data).subscribe(response =>{
    //   console.log(response);
    // });

    return '';
  }

  logout(){

  }
}
