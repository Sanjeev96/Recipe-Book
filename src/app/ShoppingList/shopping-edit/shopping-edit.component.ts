import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Ingredients } from 'src/app/Shared/ingredients';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shopEditForm: FormGroup;
  subscription: Subscription; // used for destroying a subscription
  editmode = false;
  editItemIndex: number;
  editedItem: Ingredients;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.shopEditForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ]) //0 downwards doesnt work
    });
    // subscription triggers when item is selected for editing.
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (i: number) => {
        this.editItemIndex = i;
        this.editmode = true;
        this.editedItem = this.shoppingService.getIngred(i);
        this.shopEditForm.setValue({
          itemName: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
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

  ngOnDestroy() {}
}
