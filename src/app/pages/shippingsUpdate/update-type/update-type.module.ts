import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UpdateTypePageRoutingModule } from './update-type-routing.module';
import { UpdateTypePage } from './update-type.page';

// import { SignaturePadComponent } from '../../../component/shared/signature-pad/signature-pad.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateTypePageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateTypePage]
})
export class UpdateTypePageModule {}
