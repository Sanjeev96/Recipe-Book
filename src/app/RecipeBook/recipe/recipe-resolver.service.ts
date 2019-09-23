import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DataStorageService } from 'src/app/Shared/data-storage.service';
import { RecipeService } from '../recipe.service';

@Injectable()
export class RecipeResolverSerivce implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: DataStorageService,
          private reicpeServce: RecipeService
          ) {}

    resolve (route: ActivatedRouteSnapshot, rState: RouterStateSnapshot ) {
        const recipes = this.reicpeServce.getRecipes();

        if (recipes.length === 0) {
        return this.dataStorageService.fetchRecipes();
        }  else {
            return recipes;
        }
        // resolve runs everytime the route get loaded if data is not available then get Request triggered
    }
}

//  intermediate code, which can be executed when a link has been clicked and before a component is loaded
// Purpose is to check that data is available
// Code that runs before a route loads to ensure data route depends on is there.
