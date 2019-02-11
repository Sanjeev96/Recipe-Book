import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.scss']
})
export class RecipeItemsComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onItemClick() {
    this.recipeService.getSelectedRecipe().emit(this.recipe);
  }

}
