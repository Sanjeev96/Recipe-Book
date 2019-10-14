import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },

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
