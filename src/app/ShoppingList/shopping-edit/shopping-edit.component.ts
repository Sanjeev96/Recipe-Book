import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/ingredients';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  @Output() emitIngredients = new EventEmitter<Ingredients>();

  constructor() {

  }

  ngOnInit() {

  }
  addIngredient() {
    const ingredientName = this.nameInput.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;

    const newIngredObject = new Ingredients(ingredientName, ingredientAmount);

    this.emitIngredients.emit(newIngredObject); // object is place inside Output()
    // console.log(newIngredObject);
  }

  clearAddFields() {
    this.nameInput.nativeElement.value = null;
    this.amountInput.nativeElement.value = null;
  }
}
