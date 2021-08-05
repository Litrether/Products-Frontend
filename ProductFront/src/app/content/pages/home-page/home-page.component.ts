import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public authService: AuthService,
    public router: Router) {
  }

  ngOnInit(): void {
    document.body.style.backgroundImage = "url('assets/img/home-bg.jpg')";
  }

}
