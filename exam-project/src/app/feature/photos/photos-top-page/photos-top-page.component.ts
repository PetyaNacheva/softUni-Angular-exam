import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-photos-top-page',
  templateUrl: './photos-top-page.component.html',
  styleUrls: ['./photos-top-page.component.css']
})
export class PhotosTopPageComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
