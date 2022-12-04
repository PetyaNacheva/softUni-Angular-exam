import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/core/photo.service';

@Component({
  selector: 'app-photos-new-page',
  templateUrl: './photos-new-page.component.html',
  styleUrls: ['./photos-new-page.component.css']
})
export class PhotosNewPageComponent implements OnInit {


  addphotoForm: FormGroup = new FormGroup(
    {
      photoTitle: new FormControl(''),
      photoUrl: new FormControl(''),
      photoExif: new FormControl(''),
      photoGenre: new FormControl('')
  }
  ) 

  constructor(private httpClient: HttpClient, 
    private photoService: PhotoService, private router: Router) { }

  ngOnInit(): void {
  }

  submitNewPhoto(addphotoForm: NgForm): void {
    //console.log(addphotoForm.value);
    this.photoService.addPhoto$(addphotoForm.value).subscribe({
      next: (photo) => {
        this.router.navigate(['/photos'])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
