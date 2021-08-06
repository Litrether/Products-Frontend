import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { ManageCategoriesTableComponent } from "./manage-categories-table/manage-categories-table.component";
import { ManagePageComponent } from "./manage-page.component";
import { ManageProviderTableComponent } from "./manage-provider-table/manage-provider-table.component";

const routes: Routes = [
    {
        path: "",
        component: ManagePageComponent,
        children: [
            { path: "categories", component: ManageCategoriesTableComponent },
            { path: "providers", component: ManageProviderTableComponent },
        ],
    },
    {
        path: "**",
        redirectTo: "categories",
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ManagePageRoutingModule { }