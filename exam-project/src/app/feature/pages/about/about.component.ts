import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  
  lat = 42.14911303776741;
  lng = 24.74857873466809;


  ngOnInit(): void {
  }

}
