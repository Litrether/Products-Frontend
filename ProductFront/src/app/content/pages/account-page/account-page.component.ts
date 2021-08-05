import { Component, OnInit } from '@angular/core';
import { IAccountData } from 'src/app/core/interfaces/accounts-interfaces';
import { AccountApiService } from 'src/app/core/services/api-services/account-api-service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  accountData: IAccountData;

  constructor(private accountService: AccountApiService) { }

  ngOnInit(): void {
    this.accountService.GetAccountData().subscribe((data: IAccountData) =>
      this.accountData = data);
  }
}
