import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProvider } from "../interfaces/providers-interfaces";
import { connectionString } from "src/app/shared/constants/connection.constants";

@Injectable({ providedIn: 'root' })
export class ProviderApiService {
    public pathBase: string = `${connectionString}/providers`;

    constructor(private http: HttpClient) { }

    public GetAllProviders(params: any): Observable<any> {
        return this.http.get<any>(`${this.pathBase}`, { params: params, observe: 'response' });
    }

    public GetProviderById(id: Number, params: any): Observable<IProvider> {
        return this.http.get<IProvider>(`${this.pathBase}/${id}`, { params: params });
    }

    public AddProvider(provider: IProvider): Observable<IProvider> {
        return this.http.post<IProvider>(`${this.pathBase}`, provider);
    }

    public UpdateProvider(provider: IProvider): Observable<IProvider> {
        return this.http.put<IProvider>(`${this.pathBase}/${provider.id}`, { name: provider.name })
    }

    public DeleteProvider(id: Number): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}