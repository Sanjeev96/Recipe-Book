import { AuthenticationService } from '../authentication/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
              exhaustMap(user => {
                  if (user) {
                const modReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modReq);
            } else {
                return next.handle(req);
            }
    }));
    }
}
// take() rxjs operator, take 1 value from obserable <user> then auto unsubscribe rather than doing .unsubscribe()
// exhaustMap() rxjs operator, waits for the previous observable to complete
