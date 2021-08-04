import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { CategoryApiService } from 'src/app/core/services/api-services/category-api.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {

  public searcher: FormControl = new FormControl;

  categories: ICategory[] = [];
  category: ICategory;
  editParams:any = {
    editNow: false,
    categoryId: -1
  }

  public params = {
    searchTerm: '',
    pageSize: 10,
    pageNumber: 1,
    orderBy: ''
  }

  constructor(private router: Router,
    private categoryService: CategoryApiService) { 
    }
    
    ngOnInit(): void { 
      this.categoryService.GetAllCategories(this.params).subscribe(
        (data: ICategory[]) => this.categories=data);
    }

    addItem() {
      const log = this.router.navigate(['/admin', 'categorydetail'])
    }

    search() {
      this.params.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
      this.params.pageNumber = 1;
      this.ngOnInit();
    }

  deleteItem(category: ICategory){
    if(!confirm(`Are you sure want to delete ${category.name}?`)){
      return;
    }
    this.categoryService.DeleteCategory(category.id).subscribe(() => {
      this.ngOnInit();
    })
  }

  beginEdit(category: ICategory){
    if(this.editParams.editNow == false){
      this.editParams.categoryId = category.id;
      this.editParams.editNow = true;
    }
  }

  endEdit(){
    if(this.editParams.editNow == true){
      let category: ICategory = {
        id: this.editParams.categoryId,
        name: (<HTMLInputElement>(document.getElementById('edit-input'))).value
      }
      this.categoryService.UpdateCategory(category);
      this.editParams.categoryId = -1;
      this.editParams.editNow = false;
    }
    this.ngOnInit();
  }
}
