import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggingInterceptorService } from './interceptors/logging-interceptor.service';
import { HeaderInterceptorService } from './interceptors/header-interceptor.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})


export class AppModule {}
