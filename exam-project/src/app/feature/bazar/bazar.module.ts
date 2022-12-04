import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BazarPageComponent } from './bazar-page/bazar-page.component';
import { BazarListComponent } from './bazar-list/bazar-list.component';
import { BazarItemComponent } from './bazar-item/bazar-item.component';
import { BazarItemDetailsComponent } from './bazar-item-details/bazar-item-details.component';
import { BazarNewOfferComponent } from './bazar-new-offer/bazar-new-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BazarRoutingModule } from './bazar-routing.module';



@NgModule({
  declarations: [
    BazarPageComponent,
    BazarListComponent,
    BazarItemComponent,
    BazarItemDetailsComponent,
    BazarNewOfferComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BazarRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BazarModule { }
