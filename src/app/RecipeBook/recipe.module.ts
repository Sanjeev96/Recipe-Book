import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemsComponent } from './recipe-items/recipe-items.component';
import { RecipeStartPageComponent } from './recipe-start-page/recipe-start-page.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { DropdownDirective } from '../Shared/dropdown.directive';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
    declarations: [
     RecipeListComponent,
    RecipeItemsComponent,
    RecipeStartPageComponent,
    RecipeEditComponent,
    RecipeDetailsComponent,
    RecipeComponent,
    DropdownDirective,

    ],
    imports: [
        CommonModule,
        SharedModule,
        RecipeRoutingModule
    ],
    exports: [
        RecipeListComponent,
        RecipeItemsComponent,
        RecipeStartPageComponent,
        RecipeEditComponent,
        RecipeDetailsComponent,
        RecipeComponent,
        DropdownDirective,
    ],
    providers: [],
})
export class RecipeModule {}
