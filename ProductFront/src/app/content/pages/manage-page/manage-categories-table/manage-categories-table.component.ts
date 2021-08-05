import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { CategoryApiService } from 'src/app/core/services/api-services/category-api.service';

@Component({
  selector: 'app-manage-categories-table',
  templateUrl: './manage-categories-table.component.html',
  styleUrls: ['./manage-categories-table.component.css']
})
export class ManageCategoriesTableComponent implements OnInit {
  categories: ICategory[] = [];
  pagination: IPagination;

  editId: number = -1;
  public params = {
    searchTerm: '',
    pageSize: 10,
    pageNumber: 1,
    orderBy: ''
  }

  constructor(private router: Router,
    private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.categoryService.GetAllCategories(this.params).subscribe((resp: any) => {
      this.categories = resp.body;
    })
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.ngOnInit();
  }

  deleteItem(category: ICategory) {
    if (!confirm(`Are you sure want to delete ${category.name}?`)) {
      return;
    }
    this.categoryService.DeleteCategory(category.id).subscribe(() => {
      this.ngOnInit();
    })
  }

  editItem(category: ICategory) {
    if (this.editId == -1) {
      this.editId = category.id;
    }
  }

  submitEdit(submit: boolean) {
    if (submit == true) {
      var category: ICategory = {
        id: this.editId,
        name: this.params.searchTerm = (<HTMLInputElement>(document.getElementById('editName'))).value
      }
      this.categoryService.UpdateCategory(category).subscribe((data: any) =>
        this.ngOnInit()
      );
    }
    this.editId = -1;
  }

}
