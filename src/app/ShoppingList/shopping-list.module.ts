import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        IngredientsComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        ShoppingListRoutingModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
        IngredientsComponent,
    ],
    providers: [],
})
export class ShoppingListModule {}
