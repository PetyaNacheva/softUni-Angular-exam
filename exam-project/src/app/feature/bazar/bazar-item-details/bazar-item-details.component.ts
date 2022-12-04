import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { IOffer, IPost, IUser } from 'src/app/core/interfaces';
import { OfferService } from 'src/app/core/offer.service';
import { PhotoService } from 'src/app/core/photo.service';

@Component({
  selector: 'app-bazar-item-details',
  templateUrl: './bazar-item-details.component.html',
  styleUrls: ['./bazar-item-details.component.css']
})
export class BazarItemDetailsComponent implements OnInit {

  offer: IOffer<IPost>

  canSubscribe: boolean = false
  currentUser?: IUser
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private authService: AuthService,
    private router: Router) { }

    ngOnInit(): void {
      combineLatest([
        this.activatedRoute.params
          .pipe(
            mergeMap(params => {
              const offerId = params['offerId'];
              return this.offerService.loadOfferById(offerId)
            })),
            this.authService.currentUser$.pipe(
              tap(currentUser => 
              this.currentUser = this.currentUser))
      ])
  .subscribe(([offer, user]) => {
          this.offer = offer;
          this.canSubscribe = user && !this.offer.interested.includes(user?._id)
          //console.log('try user ' + offer)
          //console.log('try photo ' + offer.userId.username)
          //console.log('try photo ' + offer.userId.username)
          //console.log('try photo ' + this.offer.userId.username)
  
        })
    }



}
