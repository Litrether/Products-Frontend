import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public accountService: AccountService,
              public router: Router) { 
              }

  ngOnInit(): void {
    document.body.style.backgroundImage = "url('assets/img/home-bg.jpg')";
  }

}
