import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { IMovie } from 'src/app/core/interfaces';
import { IAuthModuleState } from '../+store';
import { MovieService } from 'src/app/core/movie.service';
import { UserService } from 'src/app/core/user.service';
import { enterEditMode, exitEditMode, profilePageInitalized, updateProfileStarted } from '../+store/actions';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('itemAnimation', [
      transition('* => *', [
        query('div', style({ transform: 'translateX(-100%)' })),
        query('div',
          stagger('100ms', [
            animate('300ms', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser$: Observable<IUser> = this.store.select(state => state.auth.profile.currentProfile)

  // newProfilePicture?: File

  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorHappened: Observable<boolean> = this.store.select(state => state.auth.profile.errorHappened);

  userMovies: IMovie[] = [];

  isShowMovies: boolean = false;

  isLikedShow: boolean = false;
  likedMovies: IMovie[] = [];

  isDisabled: boolean = true;

  constructor(
    private userService: UserService,
    private movieService: MovieService,
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

  showUserMovies(currentUser: IUser, action: string) {

    if (action == 'show') {
      // console.log(this.currentUser._id)
      this.movieService.getAllMoviesByUser$(currentUser._id).subscribe({
        next: (movies) => {
          
          this.userMovies = movies;
          this.isShowMovies = !this.isShowMovies;
          this.isDisabled = !this.isDisabled;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (action == 'hide') {
      this.isShowMovies = !this.isShowMovies;
      this.isDisabled = !this.isDisabled;
    }
  }

  updateProfile(): void {
    this.store.dispatch(updateProfileStarted({
      user: {
        username: this.editProfileForm.value.username,
        email: this.editProfileForm.value.email,
        // profilePicture: this.newProfilePicture
      }
      
    }));
  }


  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }

  handleProfilePictureChange(event: InputEvent){
    const input: HTMLInputElement = event.target as HTMLInputElement;
    

  }

  showLikedByUserMovies(currentUser: IUser, action: string) {
    if (action == 'show') {
      this.movieService.getAllLikedByUser$(currentUser._id).subscribe({
        next: (movies) => {
          
          this.likedMovies = movies;
          this.isLikedShow = !this.isLikedShow;
          this.isDisabled = !this.isDisabled;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (action == 'hide') {
      this.isLikedShow = !this.isLikedShow;
      this.isDisabled = !this.isDisabled;
    }
  }


}
