import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "../../interfaces/products-interfaces";

@Injectable({ providedIn: 'root' })
export class CartApiService {
    public pathBase: string = "https://litretherproducts.azurewebsites.net/api/cart";

    constructor(private http: HttpClient) {
    }

    public GetCartProducts() {
        return this.http.get<IProduct[]>(`${this.pathBase}`);
    }

    public CreateCart(productId: number) {
        return this.http.post(`${this.pathBase}/${productId}`, null).subscribe((data: any) => { console.log(data) });
    }
}