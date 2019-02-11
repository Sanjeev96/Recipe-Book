import { Component, OnInit, OnChanges } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { Ingredients } from 'src/app/Shared/ingredients';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit , OnChanges {

  ingredients: Ingredients[];

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();

    this.shoppingService.IngredChange
      .subscribe((Ingred: Ingredients[]) => {
        this.ingredients = Ingred;
      });
  }

  ngOnChanges() {

  }
}
