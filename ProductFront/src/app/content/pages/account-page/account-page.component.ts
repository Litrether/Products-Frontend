import { Component, OnInit } from '@angular/core';
import { IAccountData } from 'src/app/core/interfaces/accounts-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { AccountApiService } from 'src/app/core/services/account-api-service';
import { CartApiService } from 'src/app/core/services/cart-api.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  accountData: IAccountData;
  cartProducts: IProduct[];

  constructor(private accountService: AccountApiService,
    private cartSerrvice: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/account-bg.jpg')";
  }

  ngOnInit(): void {
    this.accountService.GetAccountData().subscribe((data: IAccountData) =>
      this.accountData = data);

    this.cartSerrvice.GetCartProducts().subscribe((data: any) =>
      this.cartProducts = data.body);
    console.log(this.cartProducts);

  }

  changePassword() { }

  deleteAccount() { }
}
