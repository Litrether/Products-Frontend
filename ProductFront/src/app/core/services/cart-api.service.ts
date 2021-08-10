import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { getUrl } from "../functions/getUrl";
import { IProduct, IProductParams } from "../interfaces/products-interfaces";

@Injectable({ providedIn: 'root' })
export class CartApiService {
    public pathBase: string = `${connectionString}/cart`;

    constructor(private http: HttpClient) {
    }

    public GetCartProducts(params: IProductParams): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(getUrl(this.pathBase, params));
    }

    public AddProductToCart(productId?: number): Observable<any> {
        return this.http.post(`${this.pathBase}/${productId}`, null);
    }

    public DeleteProductFromCart(productId?: number) {
        return this.http.delete(`${this.pathBase}/${productId}`);
    }
}