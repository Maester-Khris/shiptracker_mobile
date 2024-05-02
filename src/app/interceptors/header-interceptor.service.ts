import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    if(req.headers.has('skip-auth')){
      console.log('no auth request');
      let newRequest = req.clone({
        headers: req.headers.delete('skip-auth')
      });
      return next.handle(newRequest)
    }
    else{
      let token = "my token";
      let newRequest = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ token,
        }
      });
      return next.handle(newRequest)
    }
  }


}
