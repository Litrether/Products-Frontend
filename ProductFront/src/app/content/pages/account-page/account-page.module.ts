import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '../../layout/loading/loading.module';
import { AccountPageComponent } from './account-page.component';

@NgModule({
  declarations: [
    AccountPageComponent,
  ],
  imports: [
    CommonModule,
    LoadingModule
  ],
  exports: [
    AccountPageComponent
  ],
  providers: []
})
export class AccountPageModule { }
