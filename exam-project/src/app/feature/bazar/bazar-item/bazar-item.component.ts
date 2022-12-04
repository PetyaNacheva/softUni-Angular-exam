import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { IOffer } from 'src/app/core/interfaces';

@Component({
  selector: 'app-bazar-item',
  templateUrl: './bazar-item.component.html',
  styleUrls: ['./bazar-item.component.css']
})
export class BazarItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  canSubscribe$: Observable<boolean>

  @Input() offer: IOffer

  constructor(private authService: AuthService) { }

  ngOnChanges(): void {
    //console.log('from photos-item ' + this.photo.userId.username)
    this.canSubscribe$ = this.authService.currentUser$.pipe(map((currentUser) => {
      if(!currentUser || !this.offer) {
        return false;
      }
      return !this.offer.interested.includes(currentUser._id)
    }))
  }

}
