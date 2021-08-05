import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { ManageCategoriesTableComponent } from "./manage-categories-table/manage-categories-table.component";
import { ManagePageComponent } from "./manage-page.component";

const routes: Routes = [
    {
        path: "",
        component: ManagePageComponent,
        children: [
            { path: "categories", component: ManageCategoriesTableComponent },
        ],
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
