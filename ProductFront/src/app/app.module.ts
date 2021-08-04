import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './content/pages/home-page/home-page.component';
import { LoginPageComponent } from './content/pages/login-page/login-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriesPageComponent } from './content/pages/categories-page/categories-page.component';
import { ProvidersPageComponent } from './content/pages/providers-page/providers-page.component';
import { ProductsPageComponent } from './content/pages/products-page/products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterseptor } from './core/account/auth.interseptor';
import { SignupPageComponent } from './content/pages/signup-page/signup-page.component';
import { HeaderModule } from './content/layout/header/header.module';
import { FooterModule } from './content/layout/footer/footer.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AccountService } from './core/account/account.service';
import { LoadingComponent } from './content/layout/loading/loading.component';
import { PaginationComponent } from './content/layout/pagination/pagination.component';
import { ProductPageAdminPanelComponent } from './content/pages/products-page/product-page-admin-panel/product-page-admin-panel.component';
import { AccountPageComponent } from './content/pages/account-page/account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountPageComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    CategoriesPageComponent,
    ProvidersPageComponent,
    ProductsPageComponent,
    LoadingComponent,
    PaginationComponent,
    ProductPageAdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule
  ],
  providers: [
    AuthGuard,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }