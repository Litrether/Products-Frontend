import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { RoleGuard } from "src/app/core/guards/role.guard";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductsPageComponent } from "./products-page.component";

const routes: Routes = [
    {
        path: "",
        component: ProductsPageComponent,
        children: [
            {
                path: "form", component: ProductFormComponent,
                canActivate: [RoleGuard]
            },
        ],
    },
    {
        path: "**",
        redirectTo: "",
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ProductsPageRoutingModule { }