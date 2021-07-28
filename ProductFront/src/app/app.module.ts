import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './content/layout/footer/footer.component';
import { HeaderComponent } from './content/layout/header/header.component';
import { HomePageComponent } from './content/pages/home-page/home-page.component';
import { LoginPageComponent } from './content/pages/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriesPageComponent } from './content/pages/categories-page/categories-page.component';
import { ProvidersPageComponent } from './content/pages/providers-page/providers-page.component';
import { ProductsPageComponent } from './content/pages/products-page/products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      HomePageComponent,
      LoginPageComponent,
      CategoriesPageComponent,
      ProvidersPageComponent,
      ProductsPageComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule

    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }