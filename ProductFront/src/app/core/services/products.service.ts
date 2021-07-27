import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoundProduct, Product } from "../interfaces/products-interfaces";

@Injectable({providedIn: 'root'})
export class ProductsService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/products";

    constructor(private http: HttpClient) {
    }

    public GetAllProducts():Observable<FoundProduct[]>{
        return this.http.get<FoundProduct[]>(`${this.pathBase}`);
    }

    public GetProductById(id:number):Observable<Product>{
        return this.http.get<Product>(`${this.pathBase}/${id}`);
    }

    public AddProduct(product: Product):Observable<Product>{
        return this.http.post<Product>(`${this.pathBase}`, product);
    }

    public UpdateProduct(product: Product):Observable<Product>{
        return this.http.put<Product>(`${this.pathBase}/${product.id}`, product);
    }

    public DeleteProduct(id: number):Observable<any>{
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}