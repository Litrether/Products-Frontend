import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AccountPageComponent } from "./account-page/account-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";
import { ProductsPageComponent } from "./products-page/products-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "products", component: ProductsPageComponent },
            { path: "account", component: AccountPageComponent },
            { path: "signup", component: SignupPageComponent },
            { path: "manage", loadChildren: () => import("./manage-page/manage-page.module").then(p => p.ManagePageModule) },
            { path: "login", component: LoginPageComponent },
            { path: "home", component: HomePageComponent },
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
export class PagesRoutingModule { }
