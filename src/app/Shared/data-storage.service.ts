import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../RecipeBook/recipe.service';
import { map, tap, catchError } from 'rxjs/operators';

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
        return this.http.get('https://recipebookdb-c6817.firebaseio.com/recipes.json')
        .subscribe(recipes => console.log('fetch data = ', recipes)
        );
    }
}
