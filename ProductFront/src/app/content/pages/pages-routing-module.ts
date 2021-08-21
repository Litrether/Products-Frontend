import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guards/admin.guard";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AccountPageModule } from "./account-page/account-page.module";
import { CategoriesPageModule } from "./categories-page/categories-page.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";
import { ProductsPageModule } from "./products-page/products-page.module";
import { ProvidersPageModule } from "./providers-page/providers-page.module";
import { SignupPageComponent } from "./signup-page/signup-page.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "account", loadChildren: () => AccountPageModule },
            { path: "products", loadChildren: () => ProductsPageModule },
            { path: "categories", loadChildren: () => CategoriesPageModule, canActivate: [AdminGuard] },
            { path: "providers", loadChildren: () => ProvidersPageModule, canActivate: [AdminGuard] },
            { path: "home", component: HomePageComponent },
            { path: "signup", component: SignupPageComponent },
            { path: "login", component: LoginPageComponent },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "products",
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class PagesRoutingModule { }
