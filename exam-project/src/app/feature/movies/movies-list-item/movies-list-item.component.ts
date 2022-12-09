import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/core/interfaces';

@Component({
  selector: 'app-movies-list-item',
  templateUrl: './movies-list-item.component.html',
  styleUrls: ['./movies-list-item.component.css']
})
export class MoviesListItemComponent implements OnInit {

  @Input() movie: IMovie;

  constructor() { }

  ngOnInit(): void {
  
  }

}