import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { getUrl } from "src/app/shared/functions/getUrl";
import { IProductParams } from "../interfaces/params-interfaces";
import { IProduct } from "../interfaces/products-interfaces";

@Injectable({ providedIn: 'root' })
export class CartApiService {
    public pathBase: string = `${connectionString}/cart`;

    constructor(private http: HttpClient) {
    }

    public GetCartProducts(params: IProductParams): Observable<any> {
        return this.http.get<any>(getUrl(this.pathBase, params), { observe: 'response' });
    }

    public AddProductToCart(product: IProduct): Observable<any> {
        return this.http.post(`${this.pathBase}/${product.id}`, null);
    }

    public DeleteProductFromCart(product: IProduct): Observable<any> {
        return this.http.delete(`${this.pathBase}/${product.id}`);
    }
}