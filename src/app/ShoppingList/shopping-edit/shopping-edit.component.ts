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
  editmode = false; //used to switch between add btn  or update btn if an existing item is selected to edit
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
      // startEditing has Index (i) passed into it.
      (i: number) => {
        // this value can be called anything all it contains is whatever value the sub holds i.e
        // 'this.shoppingService.startedEditing.subscribe'
        this.editItemIndex = i;
        this.editmode = true; // used for button to be Add or update if item from list selected
        this.editedItem = this.shoppingService.getIngred(i);
        this.shopEditForm.setValue({
          itemName: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit() {
    const value = this.shopEditForm.value;
    const newIngredObject = new Ingredients(value.itemName, value.amount);
    if (this.editmode === true) {
      this.shoppingService.updateIngred(this.editItemIndex, newIngredObject);
    } else {
      this.shoppingService.getAddedIngredients(newIngredObject);
    }
    this.shopEditForm.reset();
  }

  onDelete() {
    this.onClearAddFields();
    this.shoppingService.deleteIngred(this.editItemIndex);
  }

  onClearAddFields() {
    this.editmode = false;
    this.shopEditForm.reset(); // shorter used to reset for, use method below say if you wanted to clear just itemName onClick
    // this.shopEditForm = new FormGroup({
    //   itemName: new FormControl(null, Validators.required),
    //   amount: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern('^[1-9]+[0-9]*$')
    //   ])
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
