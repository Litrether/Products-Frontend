import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, FoundCategory } from 'src/app/core/interfaces/categories-interfaces';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {

  public searcher: FormControl = new FormControl;

  categories: FoundCategory[] = [];
  category: Category = {
    name: ''
}
  id: number = 0;

  private params = {
    searchTerm: '',
    orderBy: ''
  }

  constructor(private router: Router,
    private categoryService: CategoryService) { 
    }
    
    ngOnInit(): void { 
      this.searcher = new FormControl('');
      this.searcher = new FormControl(['']);
      this.categoryService.GetAllCategories(this.params).subscribe((data: FoundCategory[]) => this.categories=data);
    }

    addItem() {
      const log = this.router.navigate(['/admin', 'categorydetail'])
    }

    search(){
      this.params.searchTerm = (<HTMLInputElement>(document.getElementById('input-search'))).value;
      this.categoryService.GetAllCategories(this.params).subscribe((data: FoundCategory[]) => this.categories=data);
    }

    getId(){
      this.id = (<HTMLInputElement>(document.getElementById('input-id'))).valueAsNumber;
      this.categoryService.GetCategoryById(this.id, this.params).subscribe((data: Category) => this.category=data);
    }

  deleteItem(category: Category){
    if(!confirm('Are you sure want to delete ${category.name}?')){
      return;
    }
    //this.categoryService.DeleteCategory(category.id).subscribe(() => {
      //this.categories$ = this.categoryService.GetAllCategories();
    //})
  }
}
