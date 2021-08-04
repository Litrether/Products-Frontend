import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IFoundProvider, IProvider } from "../../interfaces/providers-interfaces";

@Injectable({ providedIn: 'root' })
export class ProviderApiService {
    public pathBase: string = "https://localhost:5001/api/providers";
    //public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/providers";
    constructor(private http: HttpClient) { }

    public GetAllProviders(params: any): Observable<IFoundProvider[]> {
        return this.http.get<IFoundProvider[]>(`${this.pathBase}`, { params: params });
    }

    public GetProviderById(id: Number, params: any): Observable<IProvider> {
        return this.http.get<IProvider>(`${this.pathBase}/${id}`, { params: params });
    }

    public AddProvider(provider: IProvider): Observable<IProvider> {
        return this.http.post<IProvider>(`${this.pathBase}`, provider);
    }

    public UpdateProvider(provider: IProvider): Observable<IProvider> {
        return this.http.put<IProvider>(`${this.pathBase}/${provider.id}`, provider)
    }

    public DeleteProvider(id: Number): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${id}`);
    }
}