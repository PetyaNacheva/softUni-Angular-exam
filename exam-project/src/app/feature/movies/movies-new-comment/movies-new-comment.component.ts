import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CommentService } from 'src/app/core/comment.service';
// import { Comments } from '../models/';
import { IComment, IMovie, IUser } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';

@Component({
  selector: 'app-movies-new-comment',
  templateUrl: './movies-new-comment.component.html',
  styleUrls: ['./movies-new-comment.component.css']
})
export class MoviesNewCommentComponent implements OnInit {

  @Input() movieId: string;
  @Input() movie: IMovie;

  // comments:Observable<Comment[]>;
  comments: any[] = [];
  canLikeComment: boolean;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  currUser?: IUser;

  constructor(private router: Router,
    private commentService: CommentService,
    private movieService: MovieService,
    private authService: AuthService,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    this.movieService.loadMovieById(this.movieId).subscribe(movie => {
      this.comments = movie.comments;
      // console.log(movie.comments)

      // get user and check if user._id includes in each comment likes array
      this.comments.forEach(c => {
        this.currentUser$.subscribe(user => this.currUser = user);
        this.canLikeComment = c.likes.includes(this.currUser._id)
        c.canLike = c.likes.includes(this.currUser._id)
        c.isOwner = c.userId._id == this.currUser._id
      })

      // console.log(this.comments);
    })
  }

  submitComment(text: string): void {
    // console.log(text);
    // console.log(this.movieId)
    // this.movieService.commentMovie(text, this.movieId).subscribe({
      
    //   next: (comment) => {
    //     this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
    //       this.router.navigate(['/movies', this.movieId]);
    //     });
    //     this.messageBus.notifyForMessage({
    //       text: 'User successfully add new comment!',
    //       type: MessageType.Success
    //     })
    //   },
    //   error: (error) => {
    //     console.error(error);
      
    //   }
    // })

    // let comments:Comment = new Comment;
    this.commentService.addComment$(text, this.movieId).subscribe({
     
      next: (comment) => {
        debugger;
        // console.log('returned comment: ', comment);

        this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
          this.router.navigate(['/movies', this.movieId]);
        });
        this.messageBus.notifyForMessage({
          text: 'User successfully add new comment!',
          type: MessageType.Success
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  likeComment(comment: IComment | any) {
    console.log('like comment', comment)
    this.commentService.likeComment(comment.movieId, comment._id).subscribe(res => {
      // console.log(res.message)
      this.messageBus.notifyForMessage({
        text: res.message,
        type: MessageType.Success
      })
    })

    this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/movies', this.movieId]);
    });
  }

  dislikeComment(comment) {
    console.log('dislike comment');
    this.commentService.dislikeComment(comment.movieId, comment._id).subscribe(res => {
      this.messageBus.notifyForMessage({
        text: res.message,
        type: MessageType.Success
      })
    })

    this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/movies', this.movieId]);
    });
  }

}