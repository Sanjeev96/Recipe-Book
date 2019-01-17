import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './ShoppingList/shopping-list/shopping-list.component';
import { IngredientsComponent } from './ShoppingList/ingredients/ingredients.component';
import { ShoppingEditComponent } from './ShoppingList/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './RecipeBook/recipe-list/recipe-list.component';
import { RecipeItemsComponent } from './RecipeBook/recipe-items/recipe-items.component';
import { RecipeDetailsComponent } from './RecipeBook/recipe-details/recipe-details.component';
import { RecipeComponent } from './RecipeBook/recipe/recipe.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './Shared/dropdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    IngredientsComponent,
    RecipeListComponent,
    RecipeItemsComponent,
    RecipeDetailsComponent,
    RecipeComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
