import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesListItemComponent } from './movies-list-item/movies-list-item.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesDetailPageComponent } from './movies-detail-page/movies-detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesNewPageComponent } from './movies-new-page/movies-new-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MoviesNewCommentComponent } from './movies-new-comment/movies-new-comment.component';

@NgModule({
    declarations: [
      MoviesListComponent,
      MoviesListItemComponent,
      MoviesPageComponent,
      MoviesDetailPageComponent,
      MoviesNewPageComponent,
      MoviesNewCommentComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      MoviesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
    ]
  })
  export class MoviesModule { }