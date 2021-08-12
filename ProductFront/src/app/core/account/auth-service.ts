import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { IAuthAccount, IAuthResponse, IRegAccount } from "../interfaces/accounts-interfaces";
import { tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { NotificationService } from "../services/notification-service";
import { connectionString } from "src/app/shared/constants/connection.constants";

@Injectable({ providedIn: 'root' })
export class AuthService {

    public error$: Subject<string> = new Subject<string>();
    public pathBase: string = `${connectionString}/account`;

    constructor(
        private notice: NotificationService,
        private http: HttpClient,
        private router: Router) { }

    get token(): string | null {
        const expiresDate = new Date(String(localStorage.getItem('fb-token-exp')));
        if (new Date() > expiresDate) {
            this.notice.textNotice('Session time ended. Please login again.')
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    isClient(): boolean {
        if (localStorage.getItem('fb-isClient') == "true")
            return true;
        return false;
    }

    login(authAccount: IAuthAccount): Observable<any> {
        return this.http.post(`${this.pathBase}/login`, authAccount)
            .pipe(
                tap((response: any) => this.setToken(response))
            );
    }

    logout() {
        this.setToken(null);
        this.router.navigate(['']);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private setToken(response: IAuthResponse | null) {
        if (response) {
            const expiresDate = new Date(new Date().getTime() + 60 * 60 * 1000);
            localStorage.setItem('fb-token', response.token);
            localStorage.setItem('fb-token-exp', expiresDate.toString());
            if (response.roles.indexOf('Manager') == -1 && response.roles.indexOf('Administrator') == -1)
                localStorage.setItem('fb-isClient', "true");
        } else {
            localStorage.clear();
        }
    }
}