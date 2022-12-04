import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { PhotosNewPageComponent } from './photos-new-page/photos-new-page.component';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotosItemComponent } from './photos-item/photos-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosDetailPageComponent } from './photos-detail-page/photos-detail-page.component';
import { UserService } from 'src/app/core/user.service';
import { AuthModule } from 'src/app/auth/auth.module';
import { PhotosTopPageComponent } from './photos-top-page/photos-top-page.component';
import { PhotosTopListComponent } from './photos-top-list/photos-top-list.component';



@NgModule({
  declarations: [
    PhotosPageComponent,
    PhotosNewPageComponent,
    PhotosListComponent,
    PhotosItemComponent,
    PhotosDetailPageComponent,
    PhotosTopPageComponent,
    PhotosTopListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PhotosRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PhotosModule { }
