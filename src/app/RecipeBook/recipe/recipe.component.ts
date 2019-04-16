import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  public recipeStorage: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // this.recipeService.getSelectedRecipe().
    //   subscribe((recipe: Recipe) => {
    //   this.recipeStorage = recipe;
    //   console.log('the recipe', this.recipeStorage);
    //   });
  }

}
