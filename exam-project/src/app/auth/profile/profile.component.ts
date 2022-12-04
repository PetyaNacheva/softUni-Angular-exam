import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profilePageInitalized, updateProfileStarted } from '../+store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser$: Observable<IUser> = this.store.select(state => state.auth.profile.currentProfile)

  newProfilePicture?: File

  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorHappened: Observable<boolean> = this.store.select(state => state.auth.profile.errorHappened);

  constructor(
    private router: Router,
    private store: Store<IAuthModuleState>) { }

  ngOnInit(): void {
    this.store.dispatch(profilePageInitalized());

    this.hasErrorHappened.subscribe((hasError) => {
      if (hasError) {
        this.router.navigate(['/user/login'])
      }
    })
  }

  enterEditMode(currentUser: IUser): void {
    this.store.dispatch(enterEditMode());

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        email: currentUser.email,
        username: currentUser.username,
      })
    });
  }

  updateProfile(): void {
    this.store.dispatch(updateProfileStarted({
      user: {
        username: this.editProfileForm.value.username,
        email: this.editProfileForm.value.email,
        profilePicture: this.newProfilePicture
      }
      
    }));
  }


  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }

  handleProfilePictureChange(event: InputEvent){
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.newProfilePicture = input.files[0]
    console.log(this.newProfilePicture)

  }

}
