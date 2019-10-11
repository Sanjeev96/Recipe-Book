import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListComponent } from './ShoppingList/shopping-list/shopping-list.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent },

  // { path: 'error', component: PageNotFoundComponent },
  // { path: '**', redirectTo: '/error' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
