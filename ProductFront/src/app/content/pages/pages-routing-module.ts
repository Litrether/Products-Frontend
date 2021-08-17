import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { RoleGuard } from "src/app/core/guards/role.guard";
import { AccountPageComponent } from "./account-page/account-page.component";
import { AccountPageModule } from "./account-page/account-page.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";
import { ProductsPageModule } from "./products-page/products-page.module";
import { SignupPageComponent } from "./signup-page/signup-page.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "products", loadChildren: () => ProductsPageModule },
            { path: "account", component: AccountPageComponent },
            { path: "signup", component: SignupPageComponent },
            {
                path: "manage",
                loadChildren: () => import("./manage-page/manage-page.module").then(p => p.ManagePageModule),
                canActivate: [RoleGuard]
            },
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
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class PagesRoutingModule { }
