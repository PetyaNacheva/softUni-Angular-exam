import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, tap } from 'rxjs/operators';
import { IPhoto } from 'src/app/core/interfaces/photo';
import { PhotoService } from 'src/app/core/photo.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit, AfterViewInit {

  private pageChanges$ = new BehaviorSubject(undefined)

  photoList: IPhoto[]

  readonly pageSize = 8;
  currentPage: number = 0;
  totalResults: number = 0;

  searchControl = new FormControl('')

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        //filter(searchTerm => searchTerm.length > 3),
        startWith(''),
        tap(searchTerm => (console.log('searchTerm', searchTerm))
        )),
        this.pageChanges$
    ])
    .pipe(
      switchMap(([searchTerm]) => this.photoService.loadPhotoPaginatedList(searchTerm, this.currentPage * this.pageSize, this.pageSize))
    ) 
    .subscribe(photoList => {
      this.totalResults = photoList.totalResults;
      this.photoList = photoList.results;
    })
  }

  goOnePageBack(): void {
    this.currentPage--;
    this.pageChanges$.next(undefined)
  }

  goOnePageForward(): void {
    this.currentPage++;
    this.pageChanges$.next(undefined)
  }

  ngAfterViewInit(): void {
    console.log('View was initialized');
  }

}
