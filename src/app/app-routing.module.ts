import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './RecipeBook/recipe/recipe.component';
import { ShoppingListComponent } from './ShoppingList/shopping-list/shopping-list.component';

const routes: Routes = [
  // { path: '', redirectTo: '/list', pathMatch: 'full' },
  // { path: 'recipes', component: RecipeComponent },
  // { path: 'list', component: ShoppingListComponent }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routingcomponents = [ RecipeComponent, ShoppingListComponent]