import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { RecipeService } from 'src/app/RecipeBook/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


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


    constructor (private http: HttpClient) {}

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

        // method to handle sign in, for login and from successful registration
        private handleAuth(email: string, userId: string, token: string, expIn: number) {

                const expDate = new Date( new Date().getTime() + expIn * 1000);
                const user = new User(email, userId, token, expDate);
                    this.user.next(user); // emit currenlty logged in user;
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

