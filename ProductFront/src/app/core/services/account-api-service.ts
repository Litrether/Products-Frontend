import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { connectionString } from "src/app/shared/constants/connection.constants";
import { IAccountData, IChangePassword } from "../interfaces/accounts-interfaces";

@Injectable({ providedIn: 'root' })
export class AccountApiService {
    public pathBase: string = `${connectionString}/account`;

    constructor(private http: HttpClient) {
    }

    public GetAccountData(): Observable<IAccountData> {
        return this.http.get<IAccountData>(`${this.pathBase}`);
    }

    public ChangePassword(passwords: IChangePassword) {
        return this.http.put<IChangePassword>(`${this.pathBase}/password`, passwords);
    }
}