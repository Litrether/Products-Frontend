import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './content/pages/home-page/home-page.component';
import { LoginPageComponent } from './content/pages/login-page/login-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterseptor } from './core/account/auth-interseptor';
import { SignupPageComponent } from './content/pages/signup-page/signup-page.component';
import { HeaderModule } from './content/layout/header/header.module';
import { AuthGuard } from './core/guards/auth.guard';
import { PaginationComponent } from './content/layout/pagination/pagination.component';
import { AuthService } from './core/account/auth-service';
import { LoadingModule } from './content/layout/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    LoadingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }