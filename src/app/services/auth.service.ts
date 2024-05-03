import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../model';
import { RemoteApiService } from './remote-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isuserAuthenticaed:boolean = false;

  constructor( private remote:RemoteApiService, private storage:StorageService, private router:Router) { }

  async login(email:string, pass:string): Promise<string>{
    let deviceid = await this.storage.read('custom_device_id');
    let data = {email: 'darrel05@example.net', password: 'test users', device: deviceid.value};
    
    let response:HttpResponse<any> = await firstValueFrom(this.remote.connectToRemote(data)) ;
    if(response.status == 200){
      let user:User = JSON.parse(response.body.data) as User;
      user.api_token = response.body.apiToken;
      console.log(user);
      this.storage.create('logged_user',JSON.stringify(user));
      localStorage.setItem("apiToken",response.body.apiToken);
      localStorage.setItem('isUserAuth','true');
      // this.isuserAuthenticaed = true;
    }
    return response.status == 200 ? 'Login Succeed' : 'Error When attempted login';
  }

  logout(){
    // this.storage.delete();
    console.log("logged out");
    localStorage.setItem('isUserAuth','false');
    this.router.navigate(['/login']);
  }

  checkIsAuthenticated(){
    return localStorage.getItem('isUserAuth');
  }
}
