import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DataStorageService } from 'src/app/Shared/data-storage.service';

@Injectable()
export class RecipeResolverSerivce implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService ) {}

    resolve (route: ActivatedRouteSnapshot, rState: RouterStateSnapshot ) {
        return this.dataStorageService.fetchRecipes(); // resolve runs everytime the route get loaded
    }
}

//  intermediate code, which can be executed when a link has been clicked and before a component is loaded
// Purpose is to check that data is available
// Code that runs before a route loads to ensure data route depends on is there.
