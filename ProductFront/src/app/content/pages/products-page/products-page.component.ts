import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, IFoundProduct } from 'src/app/core/interfaces/products-interfaces';
import { ProductApiService } from 'src/app/core/services/api-services/product-api.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: IFoundProduct[] = [];

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
    private productService: ProductApiService) { }

  ngOnInit(): void {
      this.productService.GetAllProducts(this.params).subscribe((data: IFoundProduct[]) => this.products=data);
  }

  addItem() {
    const log = this.router.navigate(['/user', 'productdetail'])
  }

  search(){
    this.params.searchTerm = (<HTMLInputElement>(document.getElementById('input-search'))).value;
    this.productService.GetAllProducts(this.params).subscribe((data: IFoundProduct[]) => this.products=data);
  }

  ChangeCurrency(){
    this.params.currency = (<HTMLInputElement>(document.getElementById('currencySelect'))).value;
    this.productService.GetAllProducts(this.params).subscribe((data: IFoundProduct[]) => this.products=data);
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
