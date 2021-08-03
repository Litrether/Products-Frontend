import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountService } from "./account.service";

@Injectable()
export class AuthInterseptor implements HttpInterceptor {

    constructor(private accountService: AccountService,
        private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.accountService.isAuthenticated()){
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.accountService.token}`)
            });
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('Interseptor error');
                if(error.status === 401) {
                    this.accountService.logout();
                    this.router.navigate(['/admin', 'login'], {
                        queryParams: {
                            authFailed: true
                        }
                    });
                }
                return throwError(error);
            }));
    }
}