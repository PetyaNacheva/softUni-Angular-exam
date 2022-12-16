import { Component, OnInit} from '@angular/core';
import { IMovie } from 'src/app/core/interfaces';
import { MovieService } from 'src/app/core/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  mostLikedList: IMovie[];
  mostCommentList: IMovie[];
  movieMostLiked: IMovie;
  movieMostCommented: IMovie;

  likedList: Subscription;
  commentedList : Subscription;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    
      this.likedList = this.movieService.loadMovieList().subscribe((data)=>{
        // console.log(data);
        this.mostLikedList = data.sort((a,b)=> b.likes.length - a.likes.length)
        this.movieMostLiked = this.mostLikedList[0];

      });

      this.commentedList = this.movieService.loadMovieList().subscribe((comment)=>{
        // console.log(comment);
        this.mostCommentList = comment.sort((a,b)=> b.comments.length - a.comments.length)
        this.movieMostCommented = this.mostCommentList[0];

      });
   
  
  }

}
