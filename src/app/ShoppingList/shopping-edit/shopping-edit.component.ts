import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/Shared/ingredients';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingService: ShoppingListService) {

  }

  ngOnInit() {

  }
  addIngredient() {
    const ingredientName = this.nameInput.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;

    const newIngredObject = new Ingredients(ingredientName, ingredientAmount);
    this.shoppingService.getAddedIngredients(newIngredObject);

  }

  clearAddFields() {
    this.nameInput.nativeElement.value = null;
    this.amountInput.nativeElement.value = null;
  }
}
