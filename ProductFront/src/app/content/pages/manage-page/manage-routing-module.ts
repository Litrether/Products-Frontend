import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { ManagePageComponent } from "./manage-page.component";

const routes: Routes = [
    { path: "", component: ManagePageComponent, }
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ManagePageRoutingModule { }