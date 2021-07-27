import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './content/layout/footer/footer.component';
import { HeaderComponent } from './content/layout/header/header.component';
import { HomePageComponent } from './content/pages/home-page/home-page.component';
import { LoginPageComponent } from './content/pages/login-page/login-page.component';
import { CategoriesPageComponent } from './content/pages/categories-page/categories-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      HomePageComponent,
      LoginPageComponent,
      FooterComponent,
      CategoriesPageComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule,
      HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }