import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { CategoriesPageComponent } from "./categories-page/categories-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";
import { ProductsPageComponent } from "./products-page/products-page.component";
import { ProvidersPageComponent } from "./providers-page/providers-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "categories", component: CategoriesPageComponent },
            { path: "providers", component: ProvidersPageComponent },
            { path: "products", component: ProductsPageComponent },
            { path: "signup", component: SignupPageComponent },
            { path: "login", component: LoginPageComponent },
            { path: "home",  component: HomePageComponent },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "products",
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class PagesRoutingModule  { }
