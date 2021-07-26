import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, FoundCategory } from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})
export class CategoryService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/";
    constructor(private http: HttpClient) {}

    public GetAllCategories():Observable<FoundCategory[]>{
        return this.http.get<FoundCategory[]>('${this.pathBase}category');
    }

    public GetCategoryById(id: number):Observable<Category>{
        return this.http.get<Category>('${this.pathBase}category/${id}');
    }

    public AddCategory(category: Category):Observable<Category>{
        return this.http.post<Category>('${this.pathBase}category', category);
    }

    public UpdateCategory(category: Category):Observable<Category>{
        return this.http.put<Category>('${this.pathBase}category/${category.id}', category);
    }

    public DeleteCategory(id: number):Observable<any>{
        return this.http.delete<any>('${this.pathBase}category/${id}');
    }
}