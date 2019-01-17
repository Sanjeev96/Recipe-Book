import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

public recipeStorage:Recipe;

  constructor() { }

  ngOnInit() {
  }

}
