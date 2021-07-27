import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticationAccount } from 'src/app/core/interfaces/accounts-interfaces';
import { AccountApiService } from 'src/app/core/services/api-services/account-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  account: IAuthenticationAccount =  {
    username: '',
    password: ''
}
message: string = 'asd'


  constructor(private router: Router,
    private accountService: AccountApiService) {
  }

  ngOnInit(): void {
  }

  login(){
    this.account.username = (<HTMLInputElement>(document.getElementById('username-input'))).value;
    this.account.password = (<HTMLInputElement>(document.getElementById('password-input'))).value;

    console.log(this.account);

    this.accountService.Authentication(this.account).subscribe((data:any) => this.message=data.token);
  }
}
