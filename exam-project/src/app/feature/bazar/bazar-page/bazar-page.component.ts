import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-bazar-page',
  templateUrl: './bazar-page.component.html',
  styleUrls: ['./bazar-page.component.css']
})
export class BazarPageComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
