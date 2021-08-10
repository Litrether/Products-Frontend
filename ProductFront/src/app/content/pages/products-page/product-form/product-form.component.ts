import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { CategoryApiService } from 'src/app/core/services/category-api.service';
import { ProductApiService } from 'src/app/core/services/product-api.service';
import { ProviderApiService } from 'src/app/core/services/provider-api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public form: FormGroup;
  submitted: boolean = false;
  message: string;

  categories: ICategory[];
  providers: IProvider[];
  product: IProduct;

  isEditMode: boolean = false;
  isLoad: boolean = false;

  public params = {
    searchTerm: '',
    pageSize: 50,
    pageNumber: 1,
    orderBy: 'name'
  }

  constructor(private router: Router,
    private productsService: ProductApiService,
    private categoryService: CategoryApiService,
    private providerService: ProviderApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const result = zip(
      this.categoryService.GetAllCategories(this.params),
      this.providerService.GetAllProviders(this.params));

    result.subscribe(([categories, providers]: any) => {
      this.categories = categories.body;
      this.providers = providers.body;
      this.isLoad = true;
    });

    const options = history.state.options;
    this.product = options && options.product;

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      cost: ['', Validators.required],
      providerId: ['-1'],
      categoryId: ['-1'],
    });

    if (this.product) {
      this.form.get("name")?.setValue(this.product.name);
      this.form.get("description")?.setValue(this.product.description);
      this.form.get("cost")?.setValue(this.product.cost);
      this.form.get("providerId")?.setValue(this.product.providerId);
      this.form.get("categoryId")?.setValue(this.product.categoryId);
      this.isEditMode = true;
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    let product: IProduct = {
      name: this.form.value.name,
      description: this.form.value.description,
      cost: this.form.value.cost,
      imageUrl: 'https://i.pinimg.com/originals/49/6c/a0/496ca0854f493248fb57b0d0b6753777.jpg',
      categoryId: this.form.value.categoryId,
      providerId: this.form.value.providerId,
    }

    if (this.isEditMode) {
      product.id = this.product.id;
      this, this.productsService.UpdateProduct(product).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/user', 'products']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
        this.isEditMode = false;
      });
    } else {
      this.productsService.AddProduct(product).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/user', 'products']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      });
    }
  }
}
