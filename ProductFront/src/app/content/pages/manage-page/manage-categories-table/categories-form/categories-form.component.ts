import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  public form: FormGroup;
  submitted: boolean = false;
  message: string;

  category: ICategory;

  isEditMode: boolean = false;

  public params: ICommonParams = {
    pageNumber: 1,
  }

  constructor(
    private categoryService: CategoryApiService,
    private notice: NotificationService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    let category: ICategory = {
      id: 0,
      name: this.form.value.name,
    }

    if (this.isEditMode) {
      category.id = this.category.id;
      this.categoryService.UpdateCategory(category).subscribe(() => {
        this.form.reset();
        this.submitted = false;
        this.notice.textNotice(`Category ${category.name} was updated`)
      }, () => {
        this.submitted = false;
        this.isEditMode = false;
        this.notice.textNotice(`Error in updating category ${category.name}`)
      });
    } else {
      this.categoryService.AddCategory(category).subscribe(() => {
        this.form.reset();
        this.submitted = false;
        this.notice.textNotice(`Category ${category.name} was created`)
      }, () => {
        this.submitted = false;
        this.notice.textNotice(`Error in creating category ${category.name}`)
      });
    }
  }

}
