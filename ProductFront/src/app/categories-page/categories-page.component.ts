import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, FoundCategory, FoundProvider } from 'src/app/core/interfaces/interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProviderService } from 'src/app/core/services/provider.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {

  categories: FoundCategory[] = [];

  constructor(private router: Router,
    private categoryService: CategoryService,
    ) {
      this.categoryService.GetAllCategories().subscribe((data: FoundCategory[]) => this.categories=data);
    }
    
  ngOnInit(): void {  }

  addItem() {
    const log = this.router.navigate(['/admin', 'categorydetail'])
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
