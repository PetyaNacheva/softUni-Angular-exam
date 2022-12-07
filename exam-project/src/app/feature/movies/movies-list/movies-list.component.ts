import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, startWith, switchMap } from 'rxjs';
import { IMovie } from 'src/app/core/interfaces';
import { MovieService } from 'src/app/core/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

    movieList: IMovie[];

  searchControl = new FormControl('', { updateOn: 'blur' });

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // search for word with at least 3 characters
    this.searchControl.valueChanges.pipe(
      filter(searchTerm => searchTerm.length > 2),
      startWith(''),
      // tap(searchTerm => console.log(searchTerm)),
      switchMap(searchTerm => this.movieService.loadMovieList(searchTerm))
      // switchMap => stop previous requests and takes the last
      // mergeMap => return the result from the observable
    )
      .subscribe(movieList => {
        this.movieList = movieList;
      });


    // this.recipeService.loadRecipeList().subscribe(recipeList => {
    //   // console.log(recipeList)
    //   this.recipeList = recipeList;
    // });
  }

}