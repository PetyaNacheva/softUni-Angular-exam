import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css']
})
export class PhotosPageComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
