import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();
  public recipes: Recipe[] = [
    new Recipe(
      'Cheese Toast',
      'Grate cheese toast bread one side more than other, cover cheese on least toasted side, place in grill for 10 minutes on 150 degrees',
      'https://cmt.azureedge.net/media/sizzler-cheese-toast-201610190232197054193phr8k.jpg'),
    new Recipe(
      'Spicy Beans',
      'Tin of beans, dice onions and fry till crispy, add beans and sliced chill',
      'http://images.media-allrecipes.com/userphotos/960x960/4526591.jpg')
  ];



  constructor() { }

  ngOnInit() {
  }

  OnSelectedRecipe(recipe: any) {
    this.recipeSelected.emit(recipe);
    console.log(recipe)

  }
}
