import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../Shared/recipe.model';
import { Ingredients } from '../Shared/ingredients';
import { ShoppingListService } from '../ShoppingList/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private shoppingService: ShoppingListService) {}

  public recipeChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Cheese Toast',
  //     'Grate cheese toast bread one side more than other, cover cheese on least toasted side,
  //  place in grill for 10 minutes on 150 degrees',
  //     'https://cmt.azureedge.net/media/sizzler-cheese-toast-201610190232197054193phr8k.jpg',
  //     [
  //       new Ingredients('bread', 2),
  //       new Ingredients('onions', 1),
  //       new Ingredients('cheese (grams)', 150)
  //     ]
  //   ),
  //   new Recipe(
  //     'Spicy Beans',
  //     'Tin of beans, dice onions and fry till crispy, add beans and sliced chill',
  //     'http://images.media-allrecipes.com/userphotos/960x960/4526591.jpg',
  //     [
  //       new Ingredients('Tin of Beans', 1),
  //       new Ingredients('Onion', 1),
  //       new Ingredients('chillies', 1)
  //     ]
  //   )
  // ];


  // public recipeSelected = new EventEmitter<Recipe>();
  public recipeSelected = new Subject<Recipe>();
  // used instead of event emitter Subject can be consumed by more than one subscriber (mutlicasting)

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // return this.recipes;(list) dirrect reference meaning exact copy.. chaging this
    // array anywhere esle would change it in the service..need to make a copy and use that
    return this.recipes.slice(); // slice is used to make a new array, (copy)
  }

  getRecipe(index: number) {
    return this.recipes[index]; // return with index of recipe
  }

  getSelectedRecipe() {
    return this.recipeSelected;
  }

  AddIngredToList(ingredients: Ingredients[]) {
    this.shoppingService.addRecipeIngredients(ingredients);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice()); // used to emit values from edit mode to update recipes
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice()); // used to emit values from edit mode to add recipes
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1); // remove selected item in list via index
    this.recipeChanged.next(this.recipes.slice()); // pass in updated list of items in list after removal code triggered
  }
}
