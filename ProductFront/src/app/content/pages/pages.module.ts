import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing-module';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../layout/loading/loading.module';
import { StringFormModule } from 'src/app/shared/components/string-form/string-form.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LoadingModule,
    StringFormModule,
  ],
  exports: [
    PagesComponent
  ],
  providers: []
})
export class PagesModule { }
