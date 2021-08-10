import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { getUrl } from "../functions/getUrl";
import { IProduct, IProductParams } from "../interfaces/products-interfaces";

@Injectable({ providedIn: 'root' })
export class ProductApiService {
    public pathBase: string = `${connectionString}/products?`;

    constructor(private http: HttpClient) { }

    public GetAllProducts(params: any): Observable<any> {
        console.log(getUrl(this.pathBase, params));

        return this.http.get<any>(getUrl(this.pathBase, params), { observe: 'response' });
    }

    public GetProductById(id: Number, params: any): Observable<any> {
        return this.http.get<any>(`${getUrl(this.pathBase, params)}/${id}`);
    }

    public AddProduct(product: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(`${this.pathBase}`, product);
    }

    public UpdateProduct(product: IProduct): Observable<IProduct> {
        return this.http.put<IProduct>(`${this.pathBase}/${product.id}`, product);
    }

    public DeleteProduct(id?: Number): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}