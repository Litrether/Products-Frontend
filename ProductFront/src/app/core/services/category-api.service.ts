import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { ICategory } from "../interfaces/categories-interfaces";

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
    public pathBase: string = `${connectionString}/categories`;

    constructor(private http: HttpClient) { }

    public GetAllCategories(params: any): Observable<any> {
        return this.http.get<any>(`${this.pathBase}`, { params: params, observe: 'response' });
    }

    public GetCategoryById(id: Number, params: any): Observable<ICategory> {
        return this.http.get<ICategory>(`${this.pathBase}/${id}`, { params: params });
    }

    public AddCategory(category: ICategory): Observable<ICategory> {
        return this.http.post<ICategory>(`${this.pathBase}`, category);
    }

    public UpdateCategory(category: ICategory): Observable<ICategory> {
        this.http.put<ICategory>(`${this.pathBase}/${category.id}`, { name: category.name }).subscribe((data: any) =>
            console.log(data))
        return this.http.put<ICategory>(`${this.pathBase}/${category.id}`, { name: category.name })
    }

    public DeleteCategory(id: Number): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}