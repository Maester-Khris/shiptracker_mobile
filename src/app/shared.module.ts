import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoInternetComponent } from './component/shared/no-internet/no-internet.component';
import { SignaturePadComponent } from './component/shared/signature-pad/signature-pad.component';


@NgModule({
  declarations: [NoInternetComponent, SignaturePadComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NoInternetComponent, SignaturePadComponent]
})
export class SharedModule { }
