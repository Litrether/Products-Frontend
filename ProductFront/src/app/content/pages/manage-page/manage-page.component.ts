import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageCategoriesTableComponent } from './manage-categories-table/manage-categories-table.component';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {

  currentPurpose: string = 'Categories';

  constructor() { }

  ngOnInit(): void {
  }

}
