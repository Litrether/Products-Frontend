import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringFormModule } from 'src/app/shared/components/string-form/string-form.module';
import { CategoriesPageComponent } from './categories-page.component';
import { LoadingModule } from '../../layout/loading/loading.module';
import { PaginationModule } from '../../layout/pagination/pagination.module';
import { CategoriesRoutingModule } from './categories-routing-module';



@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    StringFormModule,
    PaginationModule,
    LoadingModule,
    CategoriesRoutingModule,
  ],
  exports: [
    CategoriesPageComponent
  ]
})
export class CategoriesPageModule { }
