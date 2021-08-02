import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct, IFoundProduct } from 'src/app/core/interfaces/products-interfaces';
import { ProductApiService } from 'src/app/core/services/api-services/product-api.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products$: Observable<IFoundProduct[]>;
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
    private productService: ProductApiService) { 
    }

  ngOnInit(): void {
      this.products$ = this.productService.GetAllProducts(this.params);
  }

  addItem() {
    const log = this.router.navigate(['/user', 'productdetail'])
  }

  search(){
    this.params.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.products$ = this.productService.GetAllProducts(this.params);
  }

  ChooseCategory(category:string){
    this.params.categories = category;
      this.products$ = this.productService.GetAllProducts(this.params);
  }

  ChangeCurrency(){
    this.params.currency = (<HTMLInputElement>(document.getElementById('currency-select'))).value;
    this.products$ = this.productService.GetAllProducts(this.params);
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
