import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringFormModule } from 'src/app/shared/companents/string-form/string-form.module';
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
    StringFormModule
  ],
  exports: [
    AccountPageComponent
  ],
  providers: []
})
export class AccountPageModule { }
