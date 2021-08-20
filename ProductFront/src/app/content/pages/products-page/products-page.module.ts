import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingModule } from "../../layout/loading/loading.module";
import { PaginationModule } from "../../layout/pagination/pagination.module";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductsPageComponent } from "./products-page.component";
import { ProductsPageRoutingModule } from "./products-routing-module";


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsPageRoutingModule,
    LoadingModule,
    PaginationModule,
  ],
  exports: [
    ProductsPageComponent
  ],
  providers: []
})
export class ProductsPageModule { }
