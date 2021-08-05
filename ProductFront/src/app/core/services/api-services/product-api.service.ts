import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../../interfaces/products-interfaces";

@Injectable({ providedIn: 'root' })
export class ProductApiService {
    public pathBase: string = "https://litretherproducts.azurewebsites.net/api/products";

    constructor(private http: HttpClient) { }

    public GetAllProducts(params: any): Observable<any> {
        return this.http.get<any>(`${this.pathBase}`, { params: params, observe: 'response' });
    }

    public GetProductById(id: Number, params: any): Observable<IProduct> {
        return this.http.get<IProduct>(`${this.pathBase}/${id}`, { params: params });
    }

    public AddProduct(product: IProduct, params: any): Observable<IProduct> {
        return this.http.post<IProduct>(`${this.pathBase}`, product);
    }

    public UpdateProduct(product: IProduct): Observable<IProduct> {
        return this.http.put<IProduct>(`${this.pathBase}/${product.id}`, product);
    }

    public DeleteProduct(id: Number): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}