import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page]  
  ,providers: [
    UserService
  ]
})
export class Tab3PageModule {}
