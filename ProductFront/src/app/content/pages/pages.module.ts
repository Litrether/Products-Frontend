import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing-module';
import { PagesComponent } from './pages.component';
import { AccountPageComponent } from './account-page/account-page.component';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    PagesRoutingModule
  ],
  providers: []
})
export class PagesModule { }
