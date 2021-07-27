import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesPageComponent } from "src/app/categories-page/categories-page.component";
import { ProvidersPageComponent } from "src/app/providers-page/providers-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "home", component: HomePageComponent},
            { path: "login", component: LoginPageComponent},
            { path: "categories", component: CategoriesPageComponent},
            { path: "providers", component: ProvidersPageComponent},
        ],
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule  { }
