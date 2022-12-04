import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { IPhoto } from 'src/app/core/interfaces';
import { PhotoService } from 'src/app/core/photo.service';

@Component({
  selector: 'app-photos-top-list',
  templateUrl: './photos-top-list.component.html',
  styleUrls: ['./photos-top-list.component.css']
})
export class PhotosTopListComponent implements OnInit, AfterViewInit {

  photoList: IPhoto[]
  //data: IPhoto[]

  searchControl = new FormControl('')

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.loadTopPhotoList().subscribe(photoList => {
      this.photoList = photoList
    })

    /*
    this.photoService.loadPhotoList().pipe(
      map((photoList) => {
        photoList.sort((a, b) => {
          return a.subscribers.length < b.subscribers.length ? -1 : 1
        })
        
      })
      ).subscribe(photoList => {
        !this.photoList;
      })
    */
    //.subscribe(photoList => {
    //  this.photoList = photoList
    //})

  }

  ngAfterViewInit(): void {
    //console.log('View was initialized');

  }

}
