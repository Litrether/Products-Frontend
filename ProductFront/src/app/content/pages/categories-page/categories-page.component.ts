import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory, IFoundCategory } from 'src/app/core/interfaces/categories-interfaces';
import { CategoryApiService } from 'src/app/core/services/api-services/category-api.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {

  public searcher: FormControl = new FormControl;

  categories: IFoundCategory[] = [];
  category: ICategory = {
    name: ''
  }
  id: number = 0;

  public params = {
    searchTerm: '',
    pageSize: null,
    pageNumber: null,
    orderBy: ''
  }

  constructor(private router: Router,
    private categoryService: CategoryApiService) { 
    }
    
    ngOnInit(): void { 
      this.categoryService.GetAllCategories(this.params).subscribe((data: IFoundCategory[]) => this.categories=data);
    }

    addItem() {
      const log = this.router.navigate(['/admin', 'categorydetail'])
    }

    search(){
      this.params.searchTerm = (<HTMLInputElement>(document.getElementById('input-search'))).value;
      this.categoryService.GetAllCategories(this.params).subscribe((data: IFoundCategory[]) => this.categories=data);
    }

    getId(){
      this.id = (<HTMLInputElement>(document.getElementById('input-id'))).valueAsNumber;
      this.categoryService.GetCategoryById(this.id, this.params).subscribe((data: ICategory) => this.category=data);
    }

  deleteItem(category: ICategory){
    if(!confirm('Are you sure want to delete ${category.name}?')){
      return;
    }
    //this.categoryService.DeleteCategory(category.id).subscribe(() => {
      //this.categories$ = this.categoryService.GetAllCategories();
    //})
  }
}
