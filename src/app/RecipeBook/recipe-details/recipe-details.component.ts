import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    }); // stores id
  }

  OnAddIngredToList() {
    if (this.recipe.ingredients !== null) {
      this.recipeService.AddIngredToList(this.recipe.ingredients);
      alert('Success: Added to shopping-list');
    } else {
      alert('ERROR: no Ingredients to add to list');
    }
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate([''], {relativeTo: this.activeRoute});
  }
}
