import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogProductFormComponent } from "./dialog-product-form/dialog-product-form.component";
import { ProductsPageComponent } from "./products-page.component";
import { ProductsPageRoutingModule } from "./products-routing-module";


@NgModule({
  declarations: [
    ProductsPageComponent,
    DialogProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsPageRoutingModule,
  ],
  exports: [
    ProductsPageComponent
  ],
  providers: []
})
export class ProductsPageModule { }
