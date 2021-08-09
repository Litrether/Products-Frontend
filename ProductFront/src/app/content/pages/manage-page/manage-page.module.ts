import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '../../layout/loading/loading.module';
import { ManageCategoriesTableComponent } from './manage-categories-table/manage-categories-table.component';
import { ManagePageComponent } from './manage-page.component';
import { ManageProviderTableComponent } from './manage-provider-table/manage-provider-table.component';
import { ManagePageRoutingModule } from './manage-routing-module';

@NgModule({
  declarations: [
    ManagePageComponent,
    ManageCategoriesTableComponent,
    ManageProviderTableComponent,
  ],
  imports: [
    CommonModule,
    ManagePageRoutingModule,
    LoadingModule,
  ],
  exports: [
    ManagePageComponent
  ],
  providers: []
})
export class ManagePageModule { }
