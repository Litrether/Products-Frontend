import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './content/layout/footer/footer.component';
import { HeaderComponent } from './content/layout/header/header.component';
import { HomePageComponent } from './content/pages/home-page/home-page.component';
import { LoginPageComponent } from './content/pages/login-page/login-page.component';

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      LoginPageComponent,
      HomePageComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule
    ],
    providers: [],
  })
  export class AppModule { }