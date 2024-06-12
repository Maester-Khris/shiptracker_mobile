import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model';
import { Observable } from 'rxjs';

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

  getShippings():Observable<any>{
    return this.http.get<any>(`${this.BASE_API}/shippings`, {headers: this.httpHeaderAuth.headers});
  }

  getShippingDetails(dataToPost:any):Observable<any>{
    return this.http.post<any>(`${this.BASE_API}/shippings/detail`, dataToPost, {headers: this.httpHeaderAuth.headers});
  }
  getShippingDetailsLimited(dataToPost:any){
    return this.http.post<any>(`${this.BASE_API}/shippings/detail-limited`, dataToPost, {headers: this.httpHeaderAuth.headers, observe: 'response' });
  }

  updateShippingStep(dataToPost:any):Observable<Boolean>{
    return this.http.post<Boolean>(`${this.BASE_API}/shipping/update-step`, dataToPost, {headers: this.httpHeaderAuth.headers});
  }
  updateShippingStatus(dataToPost:any):Observable<Boolean>{
    return this.http.post<Boolean>(`${this.BASE_API}/shipping/update-status`, dataToPost, {headers: this.httpHeaderAuth.headers});
  }

  addNewShipping(dataToPost:any):Observable<any>{
    return this.http.post<any>(`${this.BASE_API}/shippings/add-one`, dataToPost, {headers: this.httpHeaderAuth.headers});
  }

  checkExistingShipping(dataToPost:any):Observable<string>{
    return this.http.post<string>(`${this.BASE_API}/shipping/exist`, dataToPost, {headers: this.httpHeaderAuth.headers});
  }
  uploadImage(dataToPost:any){
    return this.http.post<any>(`${this.BASE_API}/shipfolder/saveImage`, dataToPost, {headers: this.httpHeaderNoAuth.headers, observe: 'response' });
  }




  // ================= Test Routes ===========================
  testRemoteConnection(){
    return this.http.get<any>(`${this.BASE_API}/test`, {headers: this.httpHeaderNoAuth.headers, observe: 'response' });
  }

  somethingElse(){
    return this.http.get<any>(`${this.BASE_API}/shipping/test`);
  }
}
