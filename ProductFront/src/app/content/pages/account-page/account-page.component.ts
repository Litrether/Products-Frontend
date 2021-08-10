import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { IAccountData } from 'src/app/core/interfaces/accounts-interfaces';
import { IProduct, IProductParams } from 'src/app/core/interfaces/products-interfaces';
import { AccountApiService } from 'src/app/core/services/account-api-service';
import { CartApiService } from 'src/app/core/services/cart-api.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  isLoad: boolean = false;

  accountData: IAccountData;
  cartProducts: IProduct[];

  public productParams: IProductParams = {
    pageNumber: 1,
  }

  constructor(private accountService: AccountApiService,
    private cartService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/account-bg.jpg')";
  }

  ngOnInit(): void {
    this.query();
  }

  query() {
    this.isLoad = false;

    this.productParams.pageNumber = 1;

    const result = zip(
      this.accountService.GetAccountData(),
      this.cartService.GetCartProducts(this.productParams));

    result.subscribe(([accountData, cartProducts]: any) => {
      this.accountData = accountData;
      this.cartProducts = cartProducts;
      this.isLoad = true;
    })
  }

  deleteProductFromCart(product: IProduct) {
    this.cartService.DeleteProductFromCart(product.id);
  }

  changePassword() { }

  deleteAccount() { }
}
