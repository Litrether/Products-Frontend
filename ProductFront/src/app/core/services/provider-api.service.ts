import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProvider } from "../interfaces/providers-interfaces";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { ICommonParams } from "../interfaces/params-interfaces";
import { getUrl } from "../functions/getUrl";

@Injectable({ providedIn: 'root' })
export class ProviderApiService {
    public pathBase: string = `${connectionString}/providers`;

    constructor(private http: HttpClient) { }

    public GetAllProviders(params: ICommonParams): Observable<any> {
        return this.http.get<any>(getUrl(this.pathBase, params), { observe: 'response' });
    }

    public GetProviderById(id: Number): Observable<IProvider> {
        return this.http.get<IProvider>(`${this.pathBase}/${id}`);
    }

    public AddProvider(provider: IProvider): Observable<IProvider> {
        return this.http.post<IProvider>(`${this.pathBase}`, provider);
    }

    public UpdateProvider(provider: IProvider): Observable<IProvider> {
        return this.http.put<IProvider>(`${this.pathBase}/${provider.id}`, { name: provider.name })
    }

    public DeleteProvider(provider: IProvider): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/${provider.id}`);
    }
}