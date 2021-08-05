import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/account/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profileStatus: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
  }

}
