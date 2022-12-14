import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './email-validator.directive';
import { StoreModule } from '@ngrx/store';
import { IAuthState, loginReducer, profileReducer } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './+store/profile.effects';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EmailValidatorDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature<IAuthState>('auth', {
      profile: profileReducer,
      login: loginReducer,
    }),
    EffectsModule.forFeature([ProfileEffects])
  ]
})
export class AuthModule { }