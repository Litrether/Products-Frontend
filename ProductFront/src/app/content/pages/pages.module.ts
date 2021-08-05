import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing-module';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { DialogProductFormComponent } from './products-page/dialog-product-form/dialog-product-form.component';

@NgModule({
  declarations: [
    PagesComponent,
    DialogProductFormComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports: [
    PagesComponent
  ],
  providers: []
})
export class PagesModule { }
