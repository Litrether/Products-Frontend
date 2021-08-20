import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(PaginationComponent)
  pag: PaginationComponent

  products: IProduct[];
  categories: ICategory[];
  currCurrency: string = 'USD';
  pagination: IPagination;

  public productParams: IProductParams = {
    pageNumber: 0,
  }

  public categoryParams: ICommonParams = {
    pageNumber: 1,
    pageSize: 50,
  }

  isLoad: boolean = false;

  constructor(private router: Router,
    private productService: ProductApiService,
    private categoryService: CategoryApiService,
    private notice: NotificationService,
    public authService: AuthService,
    public cartApiService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/products-bg.jpg')";
  }

  ngOnInit(): void {
    this.categoryService.GetAllCategories(this.categoryParams).subscribe((data: any) =>
      this.categories = data.body)

    setTimeout(() => this.query());
  }

  query(pageNumber: number = 1, reset?: boolean): void {
    if (reset)
      this.pag.reset();

    this.productParams.pageNumber = pageNumber;
    this.pag.isActive = this.isLoad = false;

    this.productService.GetAllProducts(this.productParams).subscribe((data: any) => {
      this.products = data.body;
      this.pag.MetaData.TotalPages = JSON.parse(data.headers.get('pagination')).TotalPages;
      this.pag.isActive = this.isLoad = true;
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something went wrong.`)
    });
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
    this.query(undefined, true);
  }

  minCost() {
    this.productParams.minCost = (<HTMLInputElement>(document.getElementById('minCost-input'))).valueAsNumber;
    this.query(undefined, true);
  }

  maxCost() {
    this.productParams.maxCost = (<HTMLInputElement>(document.getElementById('maxCost-input'))).valueAsNumber;
    this.query(undefined, true);
  }

  changeCategory(category: string) {
    this.productParams.categories = category;
    this.query(undefined, true);
  }

  changeCurrency() {
    this.productParams.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.query(undefined, true);
  }

  addProductToCart(product: IProduct) {
    this.cartApiService.AddProductToCart(product).subscribe((data: any) => {
      this.notice.productNotice(`Product ${product.name} added in your cart`, product);
    }, () => {
      this.notice.productNotice(`Product ${product.name} is in your cart`, product);
    });
  }
}
