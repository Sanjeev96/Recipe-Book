import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Ingredients } from 'src/app/Shared/ingredients';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  shopEditForm: FormGroup;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.shopEditForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('[1-9]*$')])
    });
  }
  onSubmit() {
    console.log(this.shopEditForm);

    const value = this.shopEditForm.value;
    const newIngredObject = new Ingredients(value.itemName, value.amount);
    if (value.itemName !== null && value.amount !== null) {
      this.shoppingService.getAddedIngredients(newIngredObject);
    } else {

    }
  }

  clearAddFields() {}
}
