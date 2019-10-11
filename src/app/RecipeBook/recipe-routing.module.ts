import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeStartPageComponent } from './recipe-start-page/recipe-start-page.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResolverSerivce } from './recipe/recipe-resolver.service';
import { AuthGuard } from '../auth/authentication/auth-guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const recipeRoutes: Routes = [
    {
        path: 'recipe-book',
        component: RecipeComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: RecipeStartPageComponent },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipeDetailsComponent,
          resolve: [RecipeResolverSerivce] // whenever route is loaded (refresh page for instance <check resolver comment>
          },
          { path: ':id/edit', component: RecipeEditComponent,
            resolve: [RecipeResolverSerivce] // SAME as above comment
          },
        ],
      },
      { path: '**', component: PageNotFoundComponent }

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [RouterModule],
    providers: [],
})
export class RecipeRoutingModule {}
