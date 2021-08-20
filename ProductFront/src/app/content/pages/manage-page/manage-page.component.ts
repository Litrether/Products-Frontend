import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/account/auth-service';
import { PaginationComponent } from '../../layout/pagination/pagination.component';
import { ManageCategoriesTableComponent } from './manage-categories-table/manage-categories-table.component';
import { ManageProviderTableComponent } from './manage-provider-table/manage-provider-table.component';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {
  @ViewChild(ManageCategoriesTableComponent) cat: ManageCategoriesTableComponent;
  @ViewChild(ManageProviderTableComponent) prov: ManageProviderTableComponent;
  @ViewChild(PaginationComponent) pag: PaginationComponent;

  currentPurpose: string = 'Categories';
  createForm: boolean = false;

  constructor(public authService: AuthService) {
    document.body.style.backgroundImage = "url('assets/img/manage-bg.jpg')";
  }

  ngOnInit() { }

  sendQuery(currentPage: number) {
    this.currentPurpose == `Categories` ? this.cat.query(currentPage) : this.prov.query(currentPage)
  }
}