import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { storageServiceProvider } from './storage.service';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

import { CommentService } from './comment.service';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        UserService,
        MovieService,
        CommentService,
        storageServiceProvider,
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: AuthInterceptor,
        },
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: ErrorHandlerInterceptor,
        }
      ]
    }
  }
}


