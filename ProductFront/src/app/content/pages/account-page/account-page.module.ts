import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringFormModule } from 'src/app/shared/components/string-form/string-form.module';
import { LoadingModule } from '../../layout/loading/loading.module';
import { PaginationModule } from '../../layout/pagination/pagination.module';
import { AccountPageComponent } from './account-page.component';
import { AccountRoutingModule } from './account-routing-module';
import { ChangePassFormComponent } from './change-pass-form/change-pass-form.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    ChangePassFormComponent,
  ],
  imports: [
    CommonModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    StringFormModule,
    PaginationModule,
  ],
  exports: [
    AccountPageComponent,
  ],
  providers: []
})
export class AccountPageModule { }
