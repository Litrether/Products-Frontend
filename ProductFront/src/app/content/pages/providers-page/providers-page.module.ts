import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringFormModule } from 'src/app/shared/components/string-form/string-form.module';
import { PaginationModule } from '../../layout/pagination/pagination.module';
import { LoadingModule } from '../../layout/loading/loading.module';
import { ProvidersPageComponent } from './providers-page.component';
import { ProvidersRoutingModule } from './providers-routing-module';



@NgModule({
  declarations: [
    ProvidersPageComponent
  ],
  imports: [
    CommonModule,
    StringFormModule,
    PaginationModule,
    LoadingModule,
    ProvidersRoutingModule,
  ],
  exports: [
    ProvidersPageComponent
  ]
})
export class ProvidersPageModule { }
