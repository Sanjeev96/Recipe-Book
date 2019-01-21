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

  public IngredChange= new EventEmitter<Ingredients[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getAddedIngredients(Ingred: Ingredients) {
    this.ingredients.push(Ingred);
    this.IngredChange.emit(this.ingredients.slice());
  }

}

