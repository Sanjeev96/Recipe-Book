import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { Ingredients } from 'src/app/Shared/ingredients';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnChanges, OnDestroy {
  ingredients: Ingredients[];
  slSubscription: Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();

    this.slSubscription = this.shoppingService.IngredChange.subscribe(
      (Ingred: Ingredients[]) => {
        this.ingredients = Ingred;
      }
    );
  }

  ngOnChanges() {}

  onEditItem(i: number) {
console.log('index of selected item', i);
this.shoppingService.startedEditing.next(i);

  }

  ngOnDestroy() {
    this.slSubscription.unsubscribe();
  }
}
