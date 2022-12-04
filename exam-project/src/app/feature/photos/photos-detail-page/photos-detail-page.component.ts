import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { IPost, IUser } from 'src/app/core/interfaces';
import { IPhoto } from 'src/app/core/interfaces/photo';
import { PhotoService } from 'src/app/core/photo.service';

@Component({
  selector: 'app-photos-detail-page',
  templateUrl: './photos-detail-page.component.html',
  styleUrls: ['./photos-detail-page.component.css']
})
export class PhotosDetailPageComponent implements OnInit {

  photo: IPhoto<IPost, string>
  //@Input() photo: IPhoto<IPost>

  canSubscribe: boolean = false
  currentUser?: IUser
  isUserOwner: boolean = false
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const photoId = params['photoId'];
            return this.photoService.loadPhotoById(photoId)
          })),
          this.authService.currentUser$.pipe(
            tap(currentUser => 
            this.currentUser = this.currentUser))
    ])
.subscribe(([photo, user]) => {
        this.currentUser = user
        this.photo = photo;
        this.canSubscribe = user && !this.photo.subscribers.includes(user?._id)
        this.isUserOwner = user && this.photo.userId === user._id


      })
  }

  getUsernameFromPhoto(photo){
    
  }

  canLike(comment: IPost){
    return this.currentUser && !comment.likes.includes(this.currentUser._id)
  }

  subscribe(){
    this.photoService.subscribeToPhoto(this.photo._id)
    .pipe(
      mergeMap(() => {
        return this.photoService.loadPhotoById(this.photo._id)
      })
    )
    .subscribe(newPhoto => {
      this.photo = newPhoto;
      this.canSubscribe = false

    })
  }

  unsubscribe(){
    this.photoService.unsubscribeToPhoto(this.photo._id)
    .pipe(
      mergeMap(() => {
        return this.photoService.loadPhotoById(this.photo._id)
      })
    )
    .subscribe(newPhoto => {
      this.photo = newPhoto;
      this.canSubscribe = true

    })
  }

  deletePhoto(){
    //console.log('this is the photo id' + this.photo._id);
    this.photoService.deletePhotoItem(this.photo._id).subscribe({
      next: (photo) => {
        this.router.navigate(['/photos'])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

}
