import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { IAccountData } from 'src/app/core/interfaces/accounts-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { IProductParams } from 'src/app/core/interfaces/params-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { AccountApiService } from 'src/app/core/services/account-api-service';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  isLoad: boolean = false;

  accountData: IAccountData;
  cartProducts: IProduct[];

  public pagination: IPagination;

  public productParams: IProductParams = {
    pageNumber: 1,
  }

  constructor(
    private accountService: AccountApiService,
    private notice: NotificationService,
    private cartService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/account-bg.jpg')";
  }

  ngOnInit(): void {
    this.query();
  }

  query() {
    this.isLoad = false;

    const result = zip(
      this.accountService.GetAccountData(),
      this.cartService.GetCartProducts(this.productParams));

    result.subscribe(([accountData, cartProducts]: any) => {
      this.accountData = accountData;
      this.cartProducts = cartProducts.body;
      this.pagination = JSON.parse(cartProducts.headers.get('pagination'));
      this.isLoad = true;
    }, (error: HttpErrorResponse) => {
    })
  }

  deleteProductFromCart(product: IProduct) {
    this.cartService.DeleteProductFromCart(product).subscribe(() => {
      this.notice.productNotice(`Product ${product.name} successfuly delete from your cart.`, product)
      this.query()
    }, () => {
      this.notice.textNotice(`Something went wrong.`)
    });
  }

  changePassword() { }

  deleteAccount() { }

  leftPage() {
    if (this.productParams.pageNumber > 1) {
      this.productParams.pageNumber--;
      this.query();
    }
  }

  rightPage() {
    if (this.productParams.pageNumber < this.pagination.TotalPages) {
      this.productParams.pageNumber++;
      this.query();
    }
  }
}
