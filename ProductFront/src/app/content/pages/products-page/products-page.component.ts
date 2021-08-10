import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { AuthService } from 'src/app/core/account/auth-service';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
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

  public prodParams = {
    searchTerm: '',
    fields: '',
    currency: 'USD',
    categories: '',
    providers: '',
    minCost: null,
    maxCost: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: ''
  }

  public catParams = {
    searchTerm: '',
    pageNumber: 1,
    pageSize: 50,
    orderBy: 'name'
  }

  isLoad: boolean = false;

  constructor(private router: Router,
    private productService: ProductApiService,
    private categoryService: CategoryApiService,
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
      this.productService.GetAllProducts(this.prodParams),
      this.categoryService.GetAllCategories(this.catParams));

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
    this.productService.DeleteProduct(product?.id).subscribe(() => {
      this.query();
    });
  }

  search() {
    this.prodParams.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.prodParams.pageNumber = 1;
    this.query();
  }

  changeCategory(category: string) {
    this.prodParams.categories = category;
    this.prodParams.pageNumber = 1;
    this.query();
  }

  changeCurrency() {
    this.prodParams.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.prodParams.pageNumber = 1;
    this.query();
  }

  leftPage() {
    if (this.prodParams.pageNumber > 1) {
      this.prodParams.pageNumber--;
      this.query();
    }
  }

  rightPage() {
    if (this.prodParams.pageNumber < this.pagination.TotalPages) {
      this.prodParams.pageNumber++;
      this.query();
    }
  }
}
