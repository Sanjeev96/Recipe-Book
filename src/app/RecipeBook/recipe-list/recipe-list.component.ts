import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute});

  }
}
