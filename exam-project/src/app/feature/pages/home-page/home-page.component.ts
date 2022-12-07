import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/core/interfaces';
import { MovieService } from 'src/app/core/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  movieList: IMovie[] = [];
  movieMostLiked: IMovie;
  movieMostCommented: IMovie;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.loadMostLiked$().subscribe(movieList => {
      this.movieMostLiked = movieList[0];
      // console.log('liked:',recipeList)
    });
    this.movieService.loadMostComment$().subscribe(movieList => {
      this.movieMostCommented = movieList[0];
      // console.log('commented:',recipeList)
    });
  }

}
