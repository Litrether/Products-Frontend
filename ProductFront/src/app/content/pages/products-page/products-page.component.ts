import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams, IProductParams } from 'src/app/core/interfaces/params-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';
import { ProductApiService } from 'src/app/core/services/product-api.service';
import { PaginationComponent } from '../../layout/pagination/pagination.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  isLoaded: boolean = false;
  metaData: IPagination = {
    CurrentPage: 1,
    TotalPages: 1,
  }

  products: IProduct[];
  public productParams: IProductParams = {
    pageNumber: 1,
    currency: 'USD',
  }

  categories: ICategory[];
  public categoryParams: ICommonParams = {
    pageNumber: 1,
    pageSize: 50,
  }

  constructor(private router: Router,
    private productService: ProductApiService,
    private categoryService: CategoryApiService,
    private notice: NotificationService,
    public authService: AuthService,
    public cartApiService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/products-bg.jpg')";
  }

  ngOnInit() {
    this.categoryService.GetAllCategories(this.categoryParams).subscribe((data: any) =>
      this.categories = data.body);

    this.query();
  }

  query() {
    this.isLoaded = false;
    this.productService.GetAllProducts(this.productParams).subscribe((data: any) => {
      this.products = data.body;
      this.metaData = JSON.parse(data.headers.get('pagination'));
      this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something went wrong.`)
    });
  }

  onPageChange(pageNumber: number = 1) {
    this.productParams.pageNumber = pageNumber;
    this.query();
  }

  editItem(product: IProduct) {
    this.router.navigate(['/user/products/form'], {
      state: {
        options: {
          product
        }
      }
    });
  }

  deleteItem(product: IProduct) {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) {
      return;
    }
    this.productService.DeleteProduct(product).subscribe(() => {
      this.products.splice(this.products.indexOf(product), 1);
      this.notice.productNotice(`Product ${product.name} was deleted`, product);
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something went wrong`);
    });
  }

  search() {
    this.productParams.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.onPageChange();
  }

  minCost() {
    this.productParams.minCost = (<HTMLInputElement>(document.getElementById('minCost-input'))).valueAsNumber;
    this.onPageChange();
  }

  maxCost() {
    this.productParams.maxCost = (<HTMLInputElement>(document.getElementById('maxCost-input'))).valueAsNumber;
    this.onPageChange();
  }

  changeCategory(category: string) {
    this.productParams.categories = category;
    this.onPageChange();
  }

  changeCurrency() {
    this.productParams.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.onPageChange();
  }

  addProductToCart(product: IProduct) {
    this.cartApiService.AddProductToCart(product).subscribe((data: any) => {
      this.notice.productNotice(`Product ${product.name} added in your cart`, product);
    }, () => {
      this.notice.productNotice(`Product ${product.name} is in your cart`, product);
    });
  }
}
