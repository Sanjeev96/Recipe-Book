import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/authentication/auth-guard';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        IngredientsComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ShoppingListComponent,
                canActivate: [AuthGuard]
               }
        ]),
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
        IngredientsComponent,
        RouterModule
    ],
    providers: [],
})
export class ShoppingListModule {}
