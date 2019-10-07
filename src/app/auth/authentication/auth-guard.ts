import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private route: Router ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Promise<boolean> | Observable<boolean | UrlTree> {
      return this.authService.user.
        pipe(
            map( user => {
                const isAuth = !!user; // SEE COMMENT BELOW
                if (isAuth) { // if it true cause by this stage is a boolean value
                    return true;
                }
                return this.route.createUrlTree(['/auth']);
            }));
    }
}

/**
 * Double '!!' purpose
 * if an object or value is true-ish (in this case user object is not null then convert to boolean so it can be true)
 * if an object or value is false-ish (in this case user object is null then convert to boolean so it can be false)
 */
