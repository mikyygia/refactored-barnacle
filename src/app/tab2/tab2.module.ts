import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogPage } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LogPageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LogPageRoutingModule
  ],
  declarations: [LogPage]
})
export class LogPageModule {}