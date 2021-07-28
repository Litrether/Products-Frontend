import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { IAuthAccount, IAuthResponse } from "../interfaces/accounts-interfaces";
import { tap, catchError } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/account";
    constructor(private http: HttpClient) {
    }

    get token(): string | null {
        const expiresDate = new Date(localStorage.getItem('fb-token-exp') || new Date());
        if(new Date() > expiresDate){
            this.logout();
            return '';
        }

        return localStorage.getItem('fb-token');
    }

    login(authAccount: IAuthAccount): Observable<any>{
        return this.http.post(`${this.pathBase}/login`, authAccount)
        .pipe(
            tap(() => this.setToken),
            catchError(this.handleError.bind(this))
        );
    }

    logout(){
        this.setToken(null);
    }

    isAuthenticated(): boolean{
        return !!this.token;
    }

    handleError(error: HttpErrorResponse){
        const {message} = error.error.error;

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Wrong email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Wrong password');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Nonexistent email');
                break;
            default:
                this.error$.next('ok');
        }

        console.log(message);
        
        return throwError(error);                                   
    }
    
    private setToken(response: IAuthResponse | null){
        if(response){
            const expiresDate = new Date(new Date().getTime() + 60*60*1000);
            localStorage.setItem('fb-token', response.token);
            localStorage.setItem('fb-token-exp', expiresDate.toString());
        } else {
            localStorage.clear();
        }
    }
}