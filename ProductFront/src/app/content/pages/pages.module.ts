import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing-module';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { ManagePageModule } from './manage-page/manage-page.module';
import { ProductsPageModule } from './products-page/products-page.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ManagePageModule,
    ProductsPageModule
  ],
  exports: [
    PagesComponent
  ],
  providers: []
})
export class PagesModule { }
