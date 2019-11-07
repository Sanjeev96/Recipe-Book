import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/authentication.module').then(
      m => m.AuthenticationModule
    ),
    data: { preload: true }
  },
  {
    path: 'recipe-book',
    loadChildren: () => import('./RecipeBook/recipe.module').then(
      m => m.RecipeModule
    ),
    data: { preload: true }
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./ShoppingList/shopping-list.module').then(
      m => m.ShoppingListModule
    ),
    data: { preload: true }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { preloadingStrategy: PreloadAllModules}
      ),
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
