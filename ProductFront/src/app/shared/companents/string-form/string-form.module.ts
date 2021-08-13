import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringFormComponent } from './string-form.component';



@NgModule({
  declarations: [
    StringFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    StringFormComponent
  ]
})
export class StringFormModule { }
