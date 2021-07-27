import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, FoundCategory } from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})
export class CategoryService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/";
    constructor(private http: HttpClient) {}

    public GetAllCategories():Observable<FoundCategory[]>{
        return this.http.get<FoundCategory[]>(`${this.pathBase}categories`);
    }

    public GetCategoryById(id:any):Observable<Category>{
        return this.http.get<Category>(`${this.pathBase}categories/${id}`);
    }

    public AddCategory(category: Category):Observable<Category>{
        return this.http.post<Category>(`${this.pathBase}categories`, category);
    }

    public UpdateCategory(category: Category):Observable<Category>{
        return this.http.put<Category>(`${this.pathBase}categories/${category.id}`, category);
    }

    public DeleteCategory(id: any):Observable<any>{
        return this.http.delete<any>(`${this.pathBase}categories/${id}`);
    }
}