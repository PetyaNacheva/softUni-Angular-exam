import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/core/interfaces';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';
// import { ingredientsValidator, urlValidator } from '../utils';

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
    // 'recipeName': new FormControl('', [Validators.required, Validators.minLength(3)]),
    // 'imgUrl': new FormControl('', [Validators.required, urlValidator]),
    // 'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
    // 'ingredients': new FormControl('', [Validators.required, ingredientsValidator])
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
    //   this.recipeFormGroup.controls['recipeName'].setValue(this.recipeToUpdate.recipeName);
    //   this.recipeFormGroup.controls['imgUrl'].setValue(this.recipeToUpdate.imgUrl);
    //   this.recipeFormGroup.controls['description'].setValue(this.recipeToUpdate.description);
    //   this.recipeFormGroup.controls['ingredients'].setValue(this.recipeToUpdate.ingredients.join(',\n'));
    } else {
      this.formName = 'Add New Movie';
      this.formBtnName = 'Add Movie';
    }
  }


  handleCreateMovie() {

    // Transform ingridients to array
    // if (this.recipeFormGroup.value.ingredients.includes(',\n')) {
    //   this.recipeFormGroup.value.ingredients = this.recipeFormGroup.value.ingredients.split(',\n');
    // }
    // this.recipeFormGroup.value.recipeName = this.recipeFormGroup.value.recipeName.trim();
    // this.recipeFormGroup.value.description = this.recipeFormGroup.value.description.trim();
    // this.recipeFormGroup.value.imgUrl = this.recipeFormGroup.value.imgUrl.trim();

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