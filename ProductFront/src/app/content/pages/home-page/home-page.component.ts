import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/account/auth-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    document.body.style.backgroundImage = "url('assets/img/home-bg.jpg')";
  }

}
