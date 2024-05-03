import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  userToken="";
  constructor(private storage:StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.has('skip-auth')){
      console.log('no auth request');
      let newRequest = req.clone({
        headers: req.headers.delete('skip-auth')
      });
      return next.handle(newRequest)
    }
    else{
          
      let newRequest = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ localStorage.getItem("apiToken"),
        }
      });
      return next.handle(newRequest)
    }
  }


}
