import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { AuthService } from 'src/app/core/account/auth-service';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams, IProductParams } from 'src/app/core/interfaces/params-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';
import { ProductApiService } from 'src/app/core/services/product-api.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products: IProduct[];
  categories: ICategory[];
  currCurrency: string = 'USD';
  pagination: IPagination;

  public productParams: IProductParams = {
    pageNumber: 1,
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
    this.query();
  }

  query(): void {
    this.isLoad = false;
    const result = zip(
      this.productService.GetAllProducts(this.productParams),
      this.categoryService.GetAllCategories(this.categoryParams));

    result.subscribe(([products, categories]: any) => {
      this.products = products.body;
      this.categories = categories.body;
      this.pagination = JSON.parse(products.headers.get('pagination'));
      this.isLoad = true;
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
      this.notice.productNotice(`Product ${product.name} was deleted`, product);
      this.query();
    });
  }

  search() {
    this.productParams.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.productParams.pageNumber = 1;
    this.query();
  }

  changeCategory(category: string) {
    this.productParams.categories = category;
    this.productParams.pageNumber = 1;
    this.query();
  }

  changeCurrency() {
    this.productParams.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.productParams.pageNumber = 1;
    this.query();
  }

  addProductToCart(product: IProduct) {
    this.cartApiService.AddProductToCart(product).subscribe((data: any) => {
      this.notice.productNotice(`Product ${product.name} added in your cart`, product);
    }, () => {
      this.notice.productNotice(`Product ${product.name} is in your cart`, product);
    });
  }

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
