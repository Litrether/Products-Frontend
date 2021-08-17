import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-manage-categories-table',
  templateUrl: './manage-categories-table.component.html',
  styleUrls: ['./manage-categories-table.component.css']
})
export class ManageCategoriesTableComponent implements OnInit {
  categories: ICategory[] = [];
  pagination: IPagination;

  isLoad: boolean = false;
  createForm: boolean = false;
  editForm: boolean = false;
  editCategory: ICategory;

  public params: ICommonParams = {
    pageNumber: 1,
  }

  constructor(private router: Router,
    public authService: AuthService,
    private notice: NotificationService,
    private categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.query();
  }

  query(): any {
    this.isLoad = false;
    this.categoryService.GetAllCategories(this.params).subscribe((resp: any) => {
      this.categories = resp.body;
      this.isLoad = true;
    })
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.query();
  }

  addItem(name: string) {
    this.createForm = false;
    let newCategory: ICategory = {
      name: name
    }
    if (newCategory) {
      this.categoryService.AddCategory(newCategory).subscribe((category: ICategory) => {
        this.categories.push(category);
        this.notice.textNotice(`Category ${newCategory.name} successfully created.`)
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice(`Something want wrong! Maybe name ${newCategory.name} is taken.`);
      })
    }
  }

  editItem(category: ICategory) {
    if (this.editCategory == null) {
      this.editCategory = Object.assign({}, category);
      this.editForm = true;
    }
  }

  submitEdit(newName: string) {
    this.editForm = false;

    if (newName) {
      this.editCategory.name = newName;
      this.categoryService.UpdateCategory(this.editCategory).subscribe((data: any) => {
        this.notice.textNotice(`Category ${this.editCategory?.name} successfully updated.`)
        this.query();
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice(`Something want wrong! Maybe name ${this.editCategory?.name} is taken.`);
      })
    }
  }

  deleteItem(category: ICategory) {
    if (!confirm(`Are you sure want to delete ${category.name}?`)) {
      return;
    }
    this.categoryService.DeleteCategory(category).subscribe(() => {
      this.notice.textNotice(`Category ${this.editCategory?.name} successfully deleted.`)
      this.query();
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something want wrong!`);
    })
  }
}
