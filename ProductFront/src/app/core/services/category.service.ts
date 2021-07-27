import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, FoundCategory } from "../interfaces/categories-interfaces";

@Injectable({providedIn: 'root'})
export class CategoryService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/categories";

    constructor(private http: HttpClient) {
    }

    public GetAllCategories(params: any):Observable<FoundCategory[]>{
        return this.http.get<FoundCategory[]>(`${this.pathBase}`, { params: params });
    }

    public GetCategoryById(id:Number, params:any):Observable<Category>{
        return this.http.get<Category>(`${this.pathBase}/${id}`, { params: params });
    }

    public AddCategory(category: Category):Observable<Category>{
        return this.http.post<Category>(`${this.pathBase}`, category);
    }

    public UpdateCategory(category: Category):Observable<Category>{
        return this.http.put<Category>(`${this.pathBase}/${category.id}`, category);
    }

    public DeleteCategory(id: Number):Observable<any>{
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}