import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, FoundCategory } from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})
export class CategoryService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/categories";
    constructor(private http: HttpClient) {}

    public GetAllCategories():Observable<FoundCategory[]>{
        return this.http.get<FoundCategory[]>(`${this.pathBase}`);
    }

    public GetCategoryById(id:any):Observable<Category>{
        return this.http.get<Category>(`${this.pathBase}/${id}`);
    }

    public AddCategory(category: Category):Observable<Category>{
        return this.http.post<Category>(`${this.pathBase}`, category);
    }

    public UpdateCategory(category: Category):Observable<Category>{
        return this.http.put<Category>(`${this.pathBase}/${category.id}`, category);
    }

    public DeleteCategory(id: any):Observable<any>{
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}