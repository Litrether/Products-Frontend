import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { CategoryApiService } from 'src/app/core/services/category-api.service';

@Component({
  selector: 'app-manage-categories-table',
  templateUrl: './manage-categories-table.component.html',
  styleUrls: ['./manage-categories-table.component.css']
})
export class ManageCategoriesTableComponent implements OnInit {
  categories: ICategory[] = [];
  pagination: IPagination;

  isLoad: boolean = false;

  editId: number = -1;
  public params: ICommonParams = {
    pageNumber: 1,
  }

  constructor(private router: Router,
    private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.query();
  }

  query(): any {
    this.categoryService.GetAllCategories(this.params).subscribe((resp: any) => {
      this.categories = resp.body;
      this.isLoad = true;
    })
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.query();
  }

  deleteItem(category: ICategory) {
    if (!confirm(`Are you sure want to delete ${category.name}?`)) {
      return;
    }
    this.isLoad = false;
    this.categoryService.DeleteCategory(category).subscribe(() => {
      this.query();
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
        name: (<HTMLInputElement>(document.getElementById('editName'))).value
      }
      this.isLoad = false;
      this.categoryService.UpdateCategory(category).subscribe((data: any) => {
        this.query();
      });
    }
    this.editId = -1;
  }
}
