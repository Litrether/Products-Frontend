import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./content/pages/home-page/home-page.component";
import { LoginPageComponent } from "./content/pages/login-page/login-page.component";
import { PagesComponent } from "./content/pages/pages.component";

const routes: Routes = [
    {
        path: "",
        component: LoginPageComponent
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }