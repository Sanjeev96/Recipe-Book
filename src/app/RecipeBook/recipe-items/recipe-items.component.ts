import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/Shared/recipe.model';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.scss']
})
export class RecipeItemsComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  constructor(
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
  }

}
