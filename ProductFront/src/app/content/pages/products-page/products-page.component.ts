import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/account/account.service';
import { IProduct, IFoundProduct } from 'src/app/core/interfaces/products-interfaces';
import { ProductApiService } from 'src/app/core/services/api-services/product-api.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products$: Observable<IFoundProduct[]>;
  products: IFoundProduct[];
  totalAmount: number;
  currCurrency: string = 'USD';

  public params = {
    searchTerm: '',
    fields: '',
    currency: 'USD',
    categories: '',
    providers: '',
    minCost: null,
    maxCost: null,
    pageNumber: null,
    pageSize: null,
    orderBy: ''
  }

  constructor(private router: Router,
    private productService: ProductApiService,
    public accountService: AccountService) { 
    }

  ngOnInit(): void {
      this.productService.GetAllProducts(this.params).subscribe((data: any) =>{
        this.totalAmount = data.totalAmount;
        this.products = data.products;
      });
    }

  addItem() {
    const log = this.router.navigate(['/user', 'productDetail'])
  }

  search(){
    this.params.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.productService.GetAllProducts(this.params).subscribe((data: any) =>{
      this.totalAmount = data.totalAmount;
      this.products = data.products;
    });
    console.log(this.totalAmount);
  }

  changeCategory(category:string){
    this.params.categories = category;
    this.productService.GetAllProducts(this.params).subscribe((data: any) =>{
      this.totalAmount = data.totalAmount;
      this.products = data.products;
    });
  }

  changeCurrency(){
    this.params.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.productService.GetAllProducts(this.params).subscribe((data: any) =>{
      this.totalAmount = data.totalAmount;
      this.products = data.products;
    });
  }

  deleteItem(product: IProduct){
    if(!confirm('Are you sure want to delete ${product.name}?')){
      return;
    }
    //this.productService.DeleteProduct(product.id).subscribe(() => {
      //this.products$ = this.productService.GetAllProducts();
    //})
  }

}
