import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsightPage } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { InsightPageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    InsightPageRoutingModule
  ],
  declarations: [InsightPage]
})
export class InsightPageModule {}
