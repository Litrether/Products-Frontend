import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { getUrl } from "src/app/shared/functions/getUrl";
import { ICategory } from "../interfaces/categories-interfaces";
import { ICommonParams } from "../interfaces/params-interfaces";

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
    public pathBase: string = `${connectionString}/categories`;

    constructor(private http: HttpClient) { }

    public GetAllCategories(params: ICommonParams): Observable<any> {
        return this.http.get<any>(getUrl(this.pathBase, params), { observe: 'response' });
    }

    public GetCategoryById(id: Number): Observable<ICategory> {
        return this.http.get<ICategory>(`${this.pathBase}/${id}`);
    }

    public AddCategory(category: ICategory): Observable<ICategory> {
        return this.http.post<ICategory>(`${this.pathBase}`, category);
    }

    public UpdateCategory(category: ICategory): Observable<ICategory> {
        return this.http.put<ICategory>(`${this.pathBase}/${category.id}`, { name: category.name })
    }

    public DeleteCategory(category: ICategory): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${category.id}`);
    }
}