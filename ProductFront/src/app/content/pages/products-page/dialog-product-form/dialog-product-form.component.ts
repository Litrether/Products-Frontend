import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/core/interfaces/categories-interfaces';
import { IProduct } from 'src/app/core/interfaces/products-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { CategoryApiService } from 'src/app/core/services/api-services/category-api.service';
import { ProductApiService } from 'src/app/core/services/api-services/product-api.service';
import { ProviderApiService } from 'src/app/core/services/api-services/provider-api.service';

@Component({
  selector: 'app-dialog-product-form',
  templateUrl: './dialog-product-form.component.html',
  styleUrls: ['./dialog-product-form.component.css']
})
export class DialogProductFormComponent implements OnInit {

  public form!: FormGroup;
  submitted: boolean = false;
  message: string;

  categories: ICategory[];
  providers: IProvider[];
  product: IProduct;

  isEditMode: boolean = false;

  public params = {
    searchTerm: '',
    pageSize: 50,
    pageNumber: 1,
    orderBy: 'name'
  }

  constructor(private productsService: ProductApiService,
    private categoryService: CategoryApiService,
    private providerService: ProviderApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const options = history.state.options;
    this.product = options && options.product;

    console.log(this.product);

    this.categoryService.GetAllCategories(this.params).subscribe((data: any) =>
      this.categories = data.body);

    this.providerService.GetAllProviders(this.params).subscribe((data: any) =>
      this.providers = data.body);

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      cost: ['', Validators.required],
      providerId: [''],
      categoryId: [''],
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
  }
}
