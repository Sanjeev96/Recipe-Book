import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from 'src/app/Shared/recipe.model';

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
    private router: Router,
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
      dishDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingred of recipe.ingredients) {
          recipeIngreds.push(
            new FormGroup({
              // this form group is pushed onto recipeIngred array[]
              name: new FormControl(ingred.name, Validators.required),
              amount: new FormControl(ingred.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.RecipeForm = new FormGroup({
      name: new FormControl(dishName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(dishDescription, Validators.required),
      ingredients: recipeIngreds // setting recipe ingredient array to html
    });
  }

  onAddIngredient() {
    (<FormArray>this.RecipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.RecipeForm.get('ingredients')).removeAt(index); //removeAt part of reactive forms syntax
  }

  getControls() {
    return (<FormArray>this.RecipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.RecipeForm.value);
    } else {
        this.recipeService.addRecipe(this.RecipeForm.value);
    }
    this.CancelEdit();
  }

  CancelEdit() {
    this.router.navigate([''], { relativeTo: this.activeRoute });
  }
}
