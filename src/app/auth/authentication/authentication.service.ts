import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { RecipeService } from 'src/app/RecipeBook/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData { // good practice to define the types of data that you get externally
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
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
            });
        }

        SendLoginDetails() {}

}
