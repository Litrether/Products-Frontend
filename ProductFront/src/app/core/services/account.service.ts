import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../interfaces/categories-interfaces";

@Injectable({providedIn: 'root'})
export class CategoryService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/account";

    constructor(private http: HttpClient) {
    }

    public CreateAccount(category: Category):Observable<Category>{
        return this.http.post<Category>(`${this.pathBase}`, category);
    }

    public Authentication(category: Category):Observable<Category>{
        return this.http.put<Category>(`${this.pathBase}/${category.id}`, category);
    }

    public DeleteAccount(id: any):Observable<any>{
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}