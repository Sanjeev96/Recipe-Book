import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  OnAddIngredToList() {
    if (this.recipe.ingredients !== null) {
    this.recipeService.AddIngredToList(this.recipe.ingredients);
    alert('Success: Added to shopping-list')
  }else {
    alert('ERROR: no Ingredients to add to list')
  }
    
  }

}
