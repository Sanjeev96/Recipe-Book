import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipe.model';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.scss']
})
export class RecipeItemsComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() selectedRecipe = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onItemClick() {
    this.selectedRecipe.emit();
    // console.log(this.selectedRecipe)
  }

}
