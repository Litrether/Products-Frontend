import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { AuthService } from 'src/app/core/account/auth-service';
import { IAccountData, IAuthAccount, IChangePassword } from 'src/app/core/interfaces/accounts-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { IProductParams } from 'src/app/core/interfaces/params-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { AccountApiService } from 'src/app/core/services/account-api.service';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  isLoad: boolean = false;

  changePasswordForm: boolean = false;
  deleteAccountForm: boolean = false;

  accountData: IAccountData;
  cartProducts: IProduct[];

  public pagination: IPagination;

  public productParams: IProductParams = {
    pageNumber: 1,
  }

  constructor(
    private accountService: AccountApiService,
    private authService: AuthService,
    private notice: NotificationService,
    private pagService: PaginationService,
    private cartService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/account-bg.jpg')";
  }

  ngOnInit(): void {
    this.accountService.GetAccountData().subscribe((data: any) =>
      this.accountData = data);

    this.query();
  }

  query() {
    this.isLoad = false;
    this.productParams.pageNumber = this.pagService.MetaData.CurrentPage;

    this.cartService.GetCartProducts(this.productParams).subscribe((data: any) => {
      this.cartProducts = data.body;
      this.pagService.MetaData.TotalPages = JSON.parse(data.headers.get('pagination')).TotalPages;
      this.isLoad = true;
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something went wrong.`)
    })
  }

  deleteProductFromCart(product: IProduct) {
    this.cartService.DeleteProductFromCart(product).subscribe(() => {
      this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
      this.notice.productNotice(`Product ${product.name} successfuly delete from your cart.`, product);
    }, () => {
      this.notice.textNotice(`Something went wrong.`)
    });
  }

  changePassword(changePasswordData: IChangePassword) {
    this.changePasswordForm = false;
    if (changePasswordData) {
      this.accountService.ChangePassword(changePasswordData).subscribe((data: any) => {
        this.notice.textNotice('Password successfully changed!')
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice('Something went wrong!')
      })
    }
  }

  deleteAccount(password: string) {
    this.deleteAccountForm = false;
    if (password) {
      let account: IAuthAccount = {
        username: this.accountData.username,
        password: password,
      }

      this.accountService.DeleteAccount(account).subscribe((data: any) => {
        this.notice.textNotice('Account successfully deleted. Come back!');
        this.authService.logout();
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice('Something went wrong');
      })
    }
  }
}
