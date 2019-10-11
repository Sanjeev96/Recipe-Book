import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemsComponent } from './recipe-items/recipe-items.component';
import { RecipeStartPageComponent } from './recipe-start-page/recipe-start-page.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeRoutingModule } from './recipe-routing.module';

@NgModule({
    declarations: [
     RecipeListComponent,
    RecipeItemsComponent,
    RecipeStartPageComponent,
    RecipeEditComponent,
    RecipeDetailsComponent,
    RecipeComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RecipeRoutingModule
    ],
    exports: [
        RecipeListComponent,
        RecipeItemsComponent,
        RecipeStartPageComponent,
        RecipeEditComponent,
        RecipeDetailsComponent,
        RecipeComponent,
    ],
    providers: [],
})
export class RecipeModule {}
