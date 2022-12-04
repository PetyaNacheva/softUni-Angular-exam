import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { IPhoto } from 'src/app/core/interfaces/photo';

@Component({
  selector: 'app-photos-item',
  templateUrl: './photos-item.component.html',
  styleUrls: ['./photos-item.component.css']
})
export class PhotosItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  //canSubscribe: boolean = false;
  canSubscribe$: Observable<boolean>

  @Input() photo: IPhoto

  constructor(private authService: AuthService) { }

  ngOnChanges(): void {
    //console.log('from photos-item ' + this.photo.userId.username)
    //this.canSubscribe = !this.photo.subscribers.includes('5fa64b162183ce1728ff371d');
    this.canSubscribe$ = this.authService.currentUser$.pipe(map((currentUser) => {
      if(!currentUser || !this.photo) {
        return false;
      }
      return !this.photo.subscribers.includes(currentUser._id)
    }))
  }

}
