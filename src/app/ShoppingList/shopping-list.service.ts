import { Injectable, EventEmitter } from '@angular/core';
import { Ingredients } from '../Shared/ingredients';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public ingredients: Ingredients[] = [
    new Ingredients('milk', 1),
    new Ingredients('rice bag', 1)
  ];

  public IngredChange = new EventEmitter<Ingredients[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getAddedIngredients(Ingred: Ingredients) {
    this.ingredients.push(Ingred);
    this.IngredChange.emit(this.ingredients.slice());
  }


  addRecipeIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients); // "..." is es6 spread operator which turns and array of elements into a list of elements and al
    this.IngredChange.emit(this.ingredients.slice()); // emit a copy of ingredients to infrom that list has changed
  }

}
