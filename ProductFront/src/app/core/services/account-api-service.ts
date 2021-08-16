import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { IAccountData, IAuthAccount, IChangePassword, IRegAccount } from "../interfaces/accounts-interfaces";

@Injectable({ providedIn: 'root' })
export class AccountApiService {
    public pathBase: string = `${connectionString}/account`;

    constructor(private http: HttpClient) {
    }

    public CreateAccount(account: IRegAccount): Observable<any> {
        return this.http.post<any>(`${this.pathBase}`, account, { observe: 'response' });
    }

    public GetAccountData(): Observable<IAccountData> {
        return this.http.get<any>(`${this.pathBase}`);
    }

    public ChangePassword(passwords: IChangePassword): Observable<any> {
        return this.http.put<any>(`${this.pathBase}/password`, passwords);
    }

    public DeleteAccount(account: IAuthAccount): Observable<any> {
        return this.http.delete<any>(`${this.pathBase}/delete`, { body: account });
    }
}