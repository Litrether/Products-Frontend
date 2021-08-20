import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/account/auth-service';
import { IAccountData, IAuthAccount, IChangePassword } from 'src/app/core/interfaces/accounts-interfaces';
import { IProductParams } from 'src/app/core/interfaces/params-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { AccountApiService } from 'src/app/core/services/account-api.service';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';
import { PaginationComponent } from '../../layout/pagination/pagination.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  @ViewChild(PaginationComponent) pag: PaginationComponent;

  isLoad: boolean = false;

  changePasswordForm: boolean = false;
  deleteAccountForm: boolean = false;

  accountData: IAccountData;
  cartProducts: IProduct[];

  public productParams: IProductParams = {
    pageNumber: 1,
  }

  constructor(
    private accountService: AccountApiService,
    private authService: AuthService,
    private notice: NotificationService,
    private cartService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/account-bg.jpg')";
  }

  ngOnInit() {
    this.accountService.GetAccountData().subscribe((data: any) =>
      this.accountData = data);
  }

  query(pageNumber: number = 1, reset: boolean = false) {
    if (reset)
      this.pag.reset();

    this.productParams.pageNumber = pageNumber;
    this.pag.isActive = this.isLoad = false;

    this.cartService.GetCartProducts(this.productParams).subscribe((data: any) => {
      this.cartProducts = data.body;
      this.pag.MetaData.TotalPages = JSON.parse(data.headers.get('pagination')).TotalPages;
      this.pag.isActive = this.isLoad = true;
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
