import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';
import { actorsValidator, urlValidator } from '../utils';

@Component({
  selector: 'app-movies-new-page',
  templateUrl: './movies-new-page.component.html',
  styleUrls: ['./movies-new-page.component.css']
})
export class MoviesNewPageComponent implements OnInit {

  @Input() makeUpdate: boolean;
  @Input() movieToUpdate: IMovie;

  formName: string;
  formBtnName: string;

  movieFormGroup: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'director': new FormControl('', [Validators.required]),
    'genre':new FormControl('', [Validators.required]),
    'releaseDate':new FormControl('', [Validators.required]),
    'poster': new FormControl('', [Validators.required, urlValidator]),
    'shortStory': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'actors': new FormControl('', [Validators.required, actorsValidator])
  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private movieService: MovieService,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    // console.log(this.makeUpdate)
    // console.log(this.recipeToUpdate)

    if (this.makeUpdate) {
      this.formName = 'Edit Movie';
      this.formBtnName = 'Save';
      this.movieFormGroup.controls['title'].setValue(this.movieToUpdate.title);
      this.movieFormGroup.controls['director'].setValue(this.movieToUpdate.director);
      this.movieFormGroup.controls['genre'].setValue(this.movieToUpdate.genre);
      this.movieFormGroup.controls['releaseDate'].setValue(this.movieToUpdate.releaseDate);
      this.movieFormGroup.controls['poster'].setValue(this.movieToUpdate.poster);
      this.movieFormGroup.controls['shortStory'].setValue(this.movieToUpdate.shortStory);
      this.movieFormGroup.controls['actors'].setValue(this.movieToUpdate.actors.join(',\n'));
    } else {
      this.formName = 'Add New Movie';
      this.formBtnName = 'Add Movie';
    }
  }


  handleCreateMovie() {

    // Transform ingridients to array
    if (this.movieFormGroup.value.actors.includes(',\n')) {
      this.movieFormGroup.value.actors = this.movieFormGroup.value.actors.split(',\n');
    }
    this.movieFormGroup.value.title = this.movieFormGroup.value.recipeName.trim();
    this.movieFormGroup.value.director = this.movieFormGroup.value.description.trim();
    this.movieFormGroup.value.genre=this.movieFormGroup.value.genre.trim();
    this.movieFormGroup.value.releaseDate=this.movieFormGroup.value.releaseDate.trim();
    this.movieFormGroup.value.poster = this.movieFormGroup.value.poster.trim();
    this.movieFormGroup.value.shortStory=this.movieFormGroup.value.shortStory.trim();

    // Editing mode
    if (this.makeUpdate) {
      // console.log('update');
      // console.log(this.recipeFormGroup.value);

      this.movieService.updateMovie$(this.movieToUpdate._id, this.movieFormGroup.value).subscribe({
        next: movie => {
          // console.log(recipe._id);
          this.router.navigateByUrl(`/RefreshComponent`, { skipLocationChange: true }).then(() => {
            this.router.navigate(['/movies', movie._id]);
          });

          this.messageBus.notifyForMessage({
            text: 'User successfully updated movie!',
            type: MessageType.Success
          })
        },
        error: (err) => {
          console.log('Error is ', err.error.message)
          // this.errorMessage = err.error.message;
          this.messageBus.notifyForMessage({
            text: err.error.message,
            type: MessageType.Error
          })
        }
      })

      // Creating mode
    } else {
      // console.log('form: ', this.recipeFormGroup.value);

      this.movieService.addMovie$(this.movieFormGroup.value).subscribe({
        next: (movie) => {
          // console.log(recipe);
          this.router.navigate(['/movies', movie._id])

          this.messageBus.notifyForMessage({
            text: 'User successfully create new movie!',
            type: MessageType.Success
          })
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }
}