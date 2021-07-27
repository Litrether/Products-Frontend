import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoundProduct, Product } from 'src/app/core/interfaces/products-interfaces';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: FoundProduct[] = [];

  constructor(private router: Router,
    private  productService: ProductsService) { 
    }

  ngOnInit(): void {
      this.productService.GetAllProducts().subscribe((data: FoundProduct[]) => this.products=data);
  }

  addItem() {
    const log = this.router.navigate(['/admin', 'productdetail'])
  }

  deleteItem(product: Product){
    if(!confirm('Are you sure want to delete ${product.name}?')){
      return;
    }
    //this.productService.DeleteProduct(product.id).subscribe(() => {
      //this.products$ = this.productService.GetAllProducts();
    //})
  }

}
