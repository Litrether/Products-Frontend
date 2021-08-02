import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./content/pages/home-page/home-page.component";
import { LoginPageComponent } from "./content/pages/login-page/login-page.component";
import { SignupPageComponent } from "./content/pages/signup-page/signup-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "login", component: LoginPageComponent },
    { path: "signup", component: SignupPageComponent },
    { path: "user", loadChildren: () => import("./content/pages/pages.module").then(p => p.PagesModule) },
    { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }