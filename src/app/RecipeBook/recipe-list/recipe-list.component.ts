import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  recipeServiceSub: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeServiceSub = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute});

  }

  ngOnDestroy() {
    this.recipeServiceSub.unsubscribe();
  }
}
