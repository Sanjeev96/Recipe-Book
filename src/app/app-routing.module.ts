import { RecipeEditComponent } from './RecipeBook/recipe-edit/recipe-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeComponent } from './RecipeBook/recipe/recipe.component';
import { ShoppingListComponent } from './ShoppingList/shopping-list/shopping-list.component';
import { RecipeStartPageComponent } from './RecipeBook/recipe-start-page/recipe-start-page.component';
import { RecipeDetailsComponent } from './RecipeBook/recipe-details/recipe-details.component';
import { RecipeResolverSerivce } from './RecipeBook/recipe/recipe-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },

  {
    path: 'recipe-book',
    component: RecipeComponent,
    children: [
      { path: '', component: RecipeStartPageComponent },
      { path: 'new', component: RecipeEditComponent },
      // tslint:disable-next-line: max-line-length
      { path: ':id', component: RecipeDetailsComponent, resolve: [RecipeResolverSerivce] }, // whenever route is loaded (refresh page for instance <check resolver comment>
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverSerivce] }

    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
