import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RemoteApiService {

  // BASE_API = "http://127.0.0.1:8000/api";
  BASE_API = "https://olbizgo.com/api";
  httpHeaderAuth = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  httpHeaderNoAuth = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'skip-auth': 'true'
    })
  };

  constructor(private http:HttpClient) { }

  connectToRemote(dataToPost:any){
    return this.http.post<any>(`${this.BASE_API}/login`, dataToPost, {headers: this.httpHeaderNoAuth.headers, observe: 'response' });
  }

  getMyShipping(dataToPost:any){
    return this.http.post<any>(`${this.BASE_API}/user/shippings`, dataToPost, {headers: this.httpHeaderAuth.headers, observe: 'response' });
  }

  getShippingDetails(dataToPost:any){
    return this.http.post<any>(`${this.BASE_API}/user/shippings/detail`, dataToPost, {headers: this.httpHeaderAuth.headers, observe: 'response' });
  }
}
