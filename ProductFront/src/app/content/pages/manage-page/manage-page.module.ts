import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '../../layout/loading/loading.module';
import { ManageCategoriesTableComponent } from './manage-categories-table/manage-categories-table.component';
import { ManagePageComponent } from './manage-page.component';
import { ManageProviderTableComponent } from './manage-provider-table/manage-provider-table.component';
import { ManagePageRoutingModule } from './manage-routing-module';
import { CategoriesFormComponent } from './manage-categories-table/categories-form/categories-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManagePageComponent,
    ManageCategoriesTableComponent,
    ManageProviderTableComponent,
    CategoriesFormComponent,
  ],
  imports: [
    CommonModule,
    ManagePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
  ],
  exports: [
    ManagePageComponent
  ],
  providers: []
})
export class ManagePageModule { }
