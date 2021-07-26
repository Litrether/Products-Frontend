import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Provider, FoundProvider } from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})
export class ProviderService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/";
    constructor(private http: HttpClient) {}

    public GetAllProviders():Observable<FoundProvider[]>{
        return this.http.get<FoundProvider[]>('${this.pathBase}provider');
    }

    public GetProviderById(id: number):Observable<Provider>{
        return this.http.get<Provider>('${this.pathBase}provider/${id}');
    }

    public AddProvider(provider: Provider):Observable<Provider>{
        return this.http.post<Provider>('${this.pathBase}provider', provider);
    }

    public UpdateProvider(provider: Provider):Observable<Provider>{
        return this.http.put<Provider>('${this.pathBase}provider/${provider.id}', provider);
    }

    public DeleteProvider(id: number):Observable<any>{
        return this.http.delete<any>('${this.pathBase}provider/${id}');
    }
}