import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode = false;
  public RecipeForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.onInitForm();
    });
  }

  public onInitForm() {
    // used fill in existing data regarding recipe into edit fields if editmode === true
    let dishName = '';
    let recipeImagePath = '';
    let dishDescription = '';
    let recipeIngreds = new FormArray([]);

    if (this.editMode === true) {
      const recipe = this.recipeService.getRecipe(this.id);
      dishName = recipe.name;
      recipeImagePath = recipe.imagePath;
      dishDescription = recipe.desc;

      if (recipe['ingredients']) {
        for (let ingred of recipe.ingredients) {
          recipeIngreds.push(
            new FormGroup({ // this form group is pushed onto recipeIngred array[]
              ingredient: new FormControl(ingred.name),
              amount: new FormControl(ingred.amount)
            })
          );
        }
      }
    }

      this.RecipeForm = new FormGroup({
        dish: new FormControl(dishName),
        imagePath: new FormControl(recipeImagePath),
        description: new FormControl(dishDescription),
       recipeIngredients: recipeIngreds // setting recipe ingredient array to html
      });
    }


  getControls() {
    return (<FormArray>this.RecipeForm.get('recipeIngredients')).controls;
  }

  onSubmit() {
    console.log(this.RecipeForm);
  }
}
