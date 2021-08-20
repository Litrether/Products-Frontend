import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '../../layout/loading/loading.module';
import { ManageCategoriesTableComponent } from './manage-categories-table/manage-categories-table.component';
import { ManagePageComponent } from './manage-page.component';
import { ManageProviderTableComponent } from './manage-provider-table/manage-provider-table.component';
import { ManagePageRoutingModule } from './manage-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringFormModule } from 'src/app/shared/companents/string-form/string-form.module';
import { PaginationModule } from '../../layout/pagination/pagination.module';

@NgModule({
  declarations: [
    ManagePageComponent,
    ManageCategoriesTableComponent,
    ManageProviderTableComponent,
  ],
  imports: [
    CommonModule,
    ManagePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    StringFormModule,
    PaginationModule,
  ],
  exports: [
    ManagePageComponent
  ],
  providers: []
})
export class ManagePageModule { }
