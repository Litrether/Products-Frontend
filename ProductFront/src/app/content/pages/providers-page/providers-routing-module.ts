import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersPageComponent } from './providers-page.component';

const routes: Routes = [{ path: '', component: ProvidersPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProvidersRoutingModule { }