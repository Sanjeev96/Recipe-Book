import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../RecipeBook/recipe.service';
import { map, tap, catchError, exhaustMap, take } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { AuthenticationService } from '../auth/authentication/authentication.service';

@Injectable()
export class DataStorageService {

constructor(private http: HttpClient,
  private recipeService: RecipeService,
  private authService: AuthenticationService) {}

    saveRecipes( /* rather than passing values as params from component, get data via the recipes service, this is another aproach */) {
       const recipes =  this.recipeService.getRecipes();
        // PUT  request used for sending mutiple sets of data i.e not one user but 5 user details, put replaces rather than adds
       return this.http.put('https://recipebookdb-c6817.firebaseio.com/recipes.json', recipes)
       .subscribe(postRecipes => {
        console.log(postRecipes);
       });
    }

    fetchRecipes() {
     return this.authService.user.pipe(
        take(1),
          exhaustMap(user => {
            return this.http.get<Recipe[]>('https://recipebookdb-c6817.firebaseio.com/recipes.json', 
              {
                params: new HttpParams().set('auth', user.token)
              }
        );
      }),
         map(recipes => {
           return recipes.map(recipe => {
             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            //    |copy existing data of ingred|   |if trueish|    |set to data retrieved| ELSE |emtpy array|
            });
       }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes); // value in recipe service set to db values passed via method param
    }));
    }
}


// '.map() is a js array function which allows the user to transform the elements in an array.
// tap() rxjs operator, allows user to run some code without changing structure of response
// exhaustMap() rxjs operator, waits for the previous observable to complete
