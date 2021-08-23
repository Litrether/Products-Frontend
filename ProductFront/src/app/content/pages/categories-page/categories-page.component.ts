import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  isLoad: boolean = false;
  metaData: IPagination = {
    CurrentPage: 1,
    TotalPages: 1,
  }

  createForm: boolean = false;
  editForm: boolean = false;
  editCategory: ICategory | null;

  categories: ICategory[] = [];
  public params: ICommonParams = {
    pageNumber: 1,
  }

  constructor(private router: Router,
    public authService: AuthService,
    private notice: NotificationService,
    private categoryService: CategoryApiService) {
    document.body.style.backgroundImage = "url('assets/img/manage-bg.jpg')";
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.isLoad = false;
    this.categoryService.GetAllCategories(this.params).subscribe((data: any) => {
      this.categories = data.body;
      this.isLoad = true;
      this.metaData = JSON.parse(data.headers.get('pagination'));
    })
  }

  onPageChange(pageNumber: number = 1) {
    this.metaData.CurrentPage = pageNumber;
    this.query();
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.onPageChange();
  }

  addItem(name: string) {
    this.createForm = false;
    let newCategory: ICategory = {
      name: name
    }
    if (newCategory) {
      this.categoryService.AddCategory(newCategory).subscribe((category: ICategory) => {
        this.query();
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

    if (newName && this.editCategory) {
      this.editCategory.name = newName;
      this.categoryService.UpdateCategory(this.editCategory).subscribe((data: any) => {
        this.notice.textNotice(`Category ${this.editCategory?.name} successfully updated.`)
        this.onPageChange();
        this.editCategory = null;
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice(`Something want wrong! Maybe name ${this.editCategory?.name} is taken.`);
        this.editCategory = null;
      })
    }
  }

  deleteItem(category: ICategory) {
    if (!confirm(`Are you sure want to delete ${category.name}?`)) {
      return;
    }
    this.categoryService.DeleteCategory(category).subscribe(() => {
      this.notice.textNotice(`Category ${this.editCategory?.name} successfully deleted.`);
      this.categories.splice(this.categories.indexOf(category), 1);
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something want wrong!`);
    })
  }

}
