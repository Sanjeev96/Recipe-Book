import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { Ingredients } from 'src/app/Shared/ingredients';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredients[] = [
    new Ingredients('milk', 1),
    new Ingredients('rice bag', 1)
  ];

  constructor() { }

  ngOnInit() {


  }
  //makes type paramater the model and then push object into array
  onIngredientAdded(Ingred: Ingredients) {
    this.ingredients.push(Ingred);
  }

} 
