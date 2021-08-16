import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../../layout/loading/loading.module';
import { AccountPageComponent } from './account-page.component';
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
  ],
  exports: [
    AccountPageComponent
  ],
  providers: []
})
export class AccountPageModule { }
