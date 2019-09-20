import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../RecipeBook/recipe.service';
import { map, tap, catchError } from 'rxjs/operators';
import { Recipe } from './recipe.model';

@Injectable()
export class DataStorageService {

constructor(private http: HttpClient, private recipeService: RecipeService) {}

    saveRecipes( /* rather than passing values as params from component, get data via the recipes service, this is another aproach */) {
       const recipes =  this.recipeService.getRecipes();
        // PUT  request used for sending mutiple sets of data i.e not one user but 5 user details, put replaces rather than adds
       return this.http.put('https://recipebookdb-c6817.firebaseio.com/recipes.json', recipes)
       .subscribe(postRecipes => {
        console.log(postRecipes);
       });
    }

    fetchRecipes() {
      this.http.get<Recipe[]>('https://recipebookdb-c6817.firebaseio.com/recipes.json')
      .pipe(
          map(recipes => {
            return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                //    |copy existing data of ingred|   |if trueish|    |set to data retrieved| ELSE |emtpy array|
                }
            );
      }))
        .subscribe(recipes => {
            console.log('fetch data = ', recipes);
            this.recipeService.setRecipes(recipes); // value in recipe service set to db values passed via method param
        }
        );
    }
}


// '.map() is a js array function which allows the user to transform the elements in an array.