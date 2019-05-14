import { Injectable, EventEmitter } from '@angular/core';
import { Ingredients } from '../Shared/ingredients';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public ingredients: Ingredients[] = [
    new Ingredients('milk', 1),
    new Ingredients('rice bag', 1)
  ];

  public IngredChange = new Subject<Ingredients[]>();
  startedEditing = new Subject<Number>(); //subject listened to in the edit component for any selected item id
  constructor() { }

  getIngred(i: number) {
    return this.ingredients[i];
  }

  updateIngred(i: number, newIngred: Ingredients) { // gets index of existing ingredient
    this.ingredients[i] = newIngred;
    this.IngredChange.next(this.ingredients.slice());
  }

  deleteIngred(i: number) {
    this.ingredients.splice(i, 1); // removed item from array(shopping-list)
    this.IngredChange.next(this.ingredients.slice()); // passes a copy of updated array(shopping-list)
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getAddedIngredients(Ingred: Ingredients) {
    this.ingredients.push(Ingred);
    this.IngredChange.next(this.ingredients.slice());
  }


  addRecipeIngredients(ingredients: Ingredients[]) {
    // tslint:disable-next-line:max-line-length
    this.ingredients.push(...ingredients); // "..." is es6 spread operator which turns and array of elements into a list - USED FOR ADDING INGREDIENTS FROM A RECIPE
    // tslint:disable-next-line:max-line-length
    this.IngredChange.next(this.ingredients.slice()); // emit a copy of ingredients to infrom that list has changed  - USED FOR UPDATING INGREDIENT(S) FROM SHOPPING-LIST
  }

}

