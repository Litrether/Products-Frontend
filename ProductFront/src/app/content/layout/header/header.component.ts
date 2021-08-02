import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profileStatus: string;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void { }

  logout(){
    this.accountService.logout();
  }

}
