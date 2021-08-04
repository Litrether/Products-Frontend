import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory, IFoundCategory } from "../../interfaces/categories-interfaces";

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
    public pathBase: string = "https://litretherproducts.azurewebsites.net/api/categories";

    constructor(private http: HttpClient) {
    }

    public GetAllCategories(params: any): Observable<IFoundCategory[]> {
        return this.http.get<IFoundCategory[]>(`${this.pathBase}`, { params: params });
    }

    public GetCategoryById(id: Number, params: any): Observable<ICategory> {
        return this.http.get<ICategory>(`${this.pathBase}/${id}`, { params: params });
    }

    public AddCategory(category: ICategory): Observable<ICategory> {
        return this.http.post<ICategory>(`${this.pathBase}`, category);
    }

    public UpdateCategory(category: ICategory): Observable<ICategory> {
        return this.http.put<ICategory>(`${this.pathBase}/${category.id}`, category);
    }

    public DeleteCategory(id: Number): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}