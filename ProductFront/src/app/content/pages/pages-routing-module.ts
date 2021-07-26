import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            { path: "", redirectTo: "home", pathMatch: "full"},
            { path: "login", component: LoginPageComponent},
            { path: "home", component: HomePageComponent},
        ],
    },
    {
        path: "**",
        redirectTo: "home"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PagesRoutingModule  { }
