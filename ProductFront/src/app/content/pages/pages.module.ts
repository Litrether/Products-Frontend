import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing-module';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  exports: [
    PagesComponent
  ],
  providers: []
})
export class PagesModule { }
