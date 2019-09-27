import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { RecipeService } from 'src/app/RecipeBook/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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

    constructor (
        private dataStorage: DataStorageService,
       private recipeService: RecipeService,
       private http: HttpClient
        ) {}

        SendSignUp(email: string, password: string) {
           return this.http.post<AuthResponseData>(
               'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQt6uCFPbnkAzNsc0tThkavqNJYGyYRPI'
            , {
                email: email,
                password: password,
                returnSecureToken: true
              }
            )
            .pipe(catchError(errorRes =>  {
                    let errorMessage = 'Unkown Error';
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                                errorMessage = 'Email already exists!';
                        break;
                      }
                      return throwError(errorMessage);
                }));
        }

        Login(email: string, password: string) {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQt6uCFPbnkAzNsc0tThkavqNJYGyYRPI',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                  });
        }

}
