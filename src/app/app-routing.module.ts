import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/authentication.module').then(
      m => m.AuthenticationModule
    )
  },
  {
    path: 'recipe-book',
    loadChildren: () => import('./RecipeBook/recipe.module').then(
      m => m.RecipeModule
    )
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./ShoppingList/shopping-list.module').then(
      m => m.ShoppingListModule
    )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


/**
 * loadChildren is part of lazyloading
 * lazyloading: loading modules when they are needed/used not at runtime
 * benifits: reducing the amount of time the app runs by reducing the traffic
 */