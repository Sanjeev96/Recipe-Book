import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { RecipeService } from 'src/app/RecipeBook/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData { // good practice to define the types of data that you get externally
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // ? means optional
   }

@Injectable({providedIn: 'root'}) // can add file here or in appmodule like other files and services
export class AuthenticationService {

    user = new BehaviorSubject<User>(null);
    private tokenExpDateTimer: any;

    constructor (private http: HttpClient, private route: Router) {}

        SendSignUp(email: string, password: string) {
           return this.http.post<AuthResponseData>(
               'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQt6uCFPbnkAzNsc0tThkavqNJYGyYRPI'
            , {
                email: email,
                password: password,
                returnSecureToken: true
              }
            ).pipe(catchError(this.errorHandler),
            tap(resData => {
                this.handleAuth(
                    resData.email, resData.localId, resData.idToken, +resData.expiresIn); // '+' infront like ParseInt AND parseFloat
            }),
            );
        }

        Login(email: string, password: string) {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQt6uCFPbnkAzNsc0tThkavqNJYGyYRPI',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                  }
                ).pipe(catchError(this.errorHandler),
                tap(resData => {
                    this.handleAuth(
                        resData.email, resData.localId, resData.idToken, +resData.expiresIn); // '+' infront like ParseInt AND parseFloat
                }),
                );
        }

        autoLogin() {
           const userData: {
             email: string,
             id: string,
             _token: string, // private so it cant be accessed from here
             _tokenEXPdate: string;
                } = JSON.parse(localStorage.getItem('userKey')); // convert back from a string to object
           if (!userData) {
               return;
           }
           const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenEXPdate));
           if (loadedUser.token) {
              this.user.next(loadedUser); // This is our logged in user based on token expiry- see user model 'get token'
              const expDuration = new Date(userData._tokenEXPdate).getTime() - new Date().getTime();
              this.autoLogout(expDuration); // tokenEXP for firebase is 1 hr
           }
        }

        Logout() {
            this.user.next(null);
            this.route.navigate(['/auth']);
            localStorage.removeItem('userKey'); // remove user details in localStorage
            if (this.tokenExpDateTimer) { // if true-ish
                clearTimeout(this.tokenExpDateTimer);
            } else {
                this.tokenExpDateTimer = null;
            }
        }


        // ************************************************************************************************************** //
                                            // METHODS BELOW USED BY OTHER METHODS //

       private autoLogout(expDuration: number) {
           this.tokenExpDateTimer =
             setTimeout(() => {
                this.Logout();
            }, expDuration);
        }

        // method to handle sign in, for login and from successful registration
        private handleAuth(email: string, userId: string, token: string, expIn: number) {

                const expDate = new Date( new Date().getTime() + expIn * 1000);
                const user = new User(email, userId, token, expDate);
                    this.user.next(user); // emit currenlty logged in user;
                    this.autoLogout(expIn * 1000 );
                    localStorage.setItem('userKey', JSON.stringify(user));
        }

        private errorHandler(errorRes: HttpErrorResponse) { // error handled as a method as this logic is used twice, register and login

            let errorMessage = '';
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                        errorMessage = 'Email already exists!';
                break;
                case 'OPERATION_NOT_ALLOWED':
                        errorMessage = 'Password sign in disabled';
                break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = 'Blocked requests from this device due to unusal activity';
                break;
                case 'EMAIL_NOT_FOUND':
                        errorMessage = 'Email not found';
                break;
                case 'INVALID_PASSWORD':
                        errorMessage = 'password invalid';
                break;
                case 'USER_DISABLED':
                        errorMessage = 'User account disabled';
                break;
            }
            return throwError(errorMessage);
            }
        }

