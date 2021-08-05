import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/account/account.service';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { CartApiService } from 'src/app/core/services/api-services/cart-api.service';
import { ProductApiService } from 'src/app/core/services/api-services/product-api.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products: IProduct[];
  currCurrency: string = 'USD';
  pagination: IPagination;

  public params = {
    searchTerm: '',
    fields: '',
    currency: 'USD',
    categories: '',
    providers: '',
    minCost: null,
    maxCost: null,
    pageNumber: 1,
    pageSize: null,
    orderBy: ''
  }

  constructor(private router: Router,
    private productService: ProductApiService,
    public accountService: AccountService,
    public cartApiService: CartApiService) {
    document.body.style.backgroundImage = "url('assets/img/products-bg.jpg')";
  }

  ngOnInit(): void {
    this.productService.GetAllProducts(this.params).subscribe((resp: any) => {
      this.pagination = JSON.parse(resp.headers.get('pagination'));
      this.products = resp.body;
    })
  }

  DeleteItem(product: IProduct) {
    if (!confirm(`Are you sure you want to delete ${product.name} ?`)) {
      return;
    }
    this.productService.DeleteProduct(product.id).subscribe(() => {
      this.ngOnInit();
    });
  }


  addItem() {
    const log = this.router.navigate(['/user', 'productDetail'])
  }

  search() {
    this.params.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.params.pageNumber = 1;
    this.ngOnInit();
  }

  changeCategory(category: string) {
    this.params.categories = category;
    this.params.pageNumber = 1;
    this.ngOnInit();
  }

  changeCurrency() {
    this.params.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.params.pageNumber = 1;
    this.ngOnInit();
  }

  leftPage() {
    if (this.params.pageNumber > 1) {
      this.params.pageNumber--;
      this.ngOnInit();
    }
  }

  rightPage() {
    if (this.params.pageNumber < this.pagination.TotalPages) {
      this.params.pageNumber++;
      this.ngOnInit();
    }
  }
}
