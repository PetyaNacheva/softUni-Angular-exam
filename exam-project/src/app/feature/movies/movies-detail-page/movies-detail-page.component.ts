import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, map, mergeMap } from 'rxjs';
// import {  map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { IMovie, IUser } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';
import { UserService } from 'src/app/core/user.service';


@Component({
  selector: 'app-movies-detail-page',
  templateUrl: './movies-detail-page.component.html',
  styleUrls: ['./movies-detail-page.component.css']
})
export class MoviesDetailPageComponent implements OnInit {

  refreshMovieRequest$ = new BehaviorSubject(undefined);
  movie: IMovie;
  currentUser?: IUser;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canLike: boolean = false;
  isUserAuthor: boolean = false;

  makeUpdate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const movieId = params['movieId'];
            return this.refreshMovieRequest$.pipe(mergeMap(() => this.movieService.loadMovieById(movieId)));
          })
        ),
      this.authService.currentUser$
    ])
      .subscribe(([movie, user]) => {
      
        this.currentUser = user;
        this.movie = movie;
        this.canLike = user && !this.movie.likes.includes(user?._id);
      
        this.isUserAuthor = user && user.movies.includes(movie._id);
      })

  }

  updateMovie() {
    this.makeUpdate = true;
  }


  deleteMovieHandler() {
    // console.log('try to delete')
    if (window.confirm(`Are you sure you want to delete - ${this.movie.title} ?`)) {

      this.messageBus.notifyForMessage({
        text: `You delete movie - ${this.movie.title} !`,
        type: MessageType.Success
      })

      this.movieService.deleteMovie(this.movie._id)
        .subscribe((res: any) => {
          this.router.navigate(['/movies']);
        })
    }
  }

  likeMovie() {
    // console.log('like movie');

    this.movieService.likeMovie(this.movie._id)
      .subscribe(() => this.refreshMovieRequest$.next(undefined));

    this.messageBus.notifyForMessage({
      text: 'You liked this movie!',
      type: MessageType.Success
    })
  }

  dislikeMovie() {
    // console.log('dislike movie');

    this.movieService.dislikeMovie(this.movie._id)
      .subscribe(() => this.refreshMovieRequest$.next(undefined));

    this.messageBus.notifyForMessage({
      text: 'You disliked this movie!',
      type: MessageType.Success
    })
  }
}